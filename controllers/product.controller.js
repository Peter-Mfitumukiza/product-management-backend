const dbService = require("../services/dbService");
const paramUtil = require("../utils/paramUtil");
const router = require('express').Router();

router.get("/all", async (req, res) => {
    try {
        dbService.common_db_call("usp_list_product", [], (err, result) => {
            if (err) {
                console.log("data service error: " + err.message);
                res.status(500).send("data service error: " + err.message)
            }
            const products = result.recordset;
            res.json({ products });
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post("/new", async (req, res) => {
    try {
        let pList = paramUtil.Parse(req.body);

        dbService.common_db_call("usp_ins_product", pList, (err, result) => {
            if (err) {
                console.log("data service error: " + err.message);
                res.status(500).send("data service error: " + err.message)
            }

            return res.json({ message: "Product Inserted Successfully"});
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router