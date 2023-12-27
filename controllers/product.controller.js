const dbService = require("../services/dbService");
const paramUtil = require("../utils/paramUtil");
const router = require('express').Router();

router.get("/all", async (req, res) => {
    try {
        dbService.common_db_call("usp_list_product", [], (err, result) => {
            if (err) {
                console.log("data service error: " + err.message);
                return res.status(500).send("data service error: " + err.message)
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
                return res.status(500).send("data service error: " + err.message)
            }

            return res.json({ message: "Product Inserted Successfully" });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let pList = paramUtil.Parse({
            "in@p_id": req.params.id
        });
        dbService.common_db_call("usp_get_product", pList, (err, result) => {
            if (err) {
                console.log("data service error: " + err.message);
                return res.status(500).send("data service error: " + err.message)
            }
            const product = result.recordset;
            res.json({ product });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.put("/:id", async (req, res) => {
    try {
        let pList = paramUtil.Parse({
            "in@p_id": req.params.id,
            ...req.body
        });
        dbService.common_db_call("usp_upd_product", pList, (err, result) => {
            if (err) return res.status(500).send("data service error: " + err.message)
            // handle when product id is invalid
            if (result.rowsAffected[0] < 1) return res.status(400).json({ message: "Invalid product id" })

            return res.json({ message: "Product Updated Successfully" });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let pList = paramUtil.Parse({
            "in@p_id": req.params.id
        });
        dbService.common_db_call("usp_del_product", pList, (err, result) => {
            if (err) return res.status(500).send("data service error: " + err.message)
            // handle when product id is invalid
            if (result.rowsAffected[0] < 1) return res.status(400).json({ message: "Invalid product id" })

            return res.json({ message: "Product deleted Successfully" });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router;