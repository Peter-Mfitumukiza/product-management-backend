const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('express').Router();
const dbService = require("../services/dbService");
const paramUtil = require("../utils/paramUtil");
const { getUserByEmail } = require("../services/authService");

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await getUserByEmail(email);
        // If we find a user with the provided email
        if (result.rowsAffected > 0) return res.status(400).json({ message: "Email already used!" })

        const hashedPassword = await bcrypt.hash(password, 10);

        let pList = paramUtil.Parse({
            "in@p_email": email,
            "in@p_password": hashedPassword
        });

        dbService.common_db_call("usp_ins_user", pList, (err, result) => {
            if (err) {
                console.log("data service error: " + err.message);
                return res.status(500).send("data service error 1: " + err.message);
            }
            return res.status(201).json({ message: "User registered successfully" })
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await getUserByEmail(email);
        // If we find a user with the provided email
        if (result.rowsAffected < 1)
            return res.status(400).json({ message: "Email does not exist! Sign up first" });

        const user = result.recordset[0];

        const samePass = await bcrypt.compare(password, user.password);
        if (samePass) {
            const token = jwt.sign({ email: user.email }, process.env.SECRET);
            return res.json({ message: "Login successful!", token });
        } else {
            return res.status(400).json({ error: "Wrong Password!" });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router;