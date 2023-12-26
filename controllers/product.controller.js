const dbConfig = require('../config/db');
const sql = require('mssql');
const router = require('express').Router();

router.get("/all", async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().execute("usp_list_product");

        const products = result.recordset;

        return res.json({ products });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

router.post("/new", async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Create a connection pool and connect
        const pool = new sql.ConnectionPool(dbConfig);
        await pool.connect();

        // Create a request object
        const request = pool.request();

        // Execute the stored procedure
        const result = await request
            .input("p_name", sql.NVarChar(100), name)
            .input("p_description", sql.NVarChar(1000), description)
            .input("p_price", sql.Int, price)
            .execute("usp_ins_product");

        const newProductId = result.returnValue;

        return res.json({ message: "Product inserted successfully", newProductId });
    } catch (error) {
        return res.json({ error: error.message });
    }
});


module.exports = router