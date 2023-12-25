const router = require('express').Router();

router.get("/", async (req, res) => {
    try {
        return res.json({ message: "Hellooo" })
    } catch (error) {
        return res.json({ error: error.message })
    }
})

module.exports = router