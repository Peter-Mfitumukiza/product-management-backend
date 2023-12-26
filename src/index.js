require("dotenv").config()
require("./config/db")
const express = require("express") 
const cors = require("cors")

const authRoutes = require("./controllers/auth.controller")
const productRoutes = require("./controllers/product.controller")

const app = express();

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Welcome to product management API!")
})

app.use("/auth/login", authRoutes)
app.use("/product", productRoutes)

const PORT = process.env.PORT || 4001

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

module.exports = app;