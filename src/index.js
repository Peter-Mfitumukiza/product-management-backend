require("dotenv").config()
const express = require("express") 
const cors = require("cors")

// const UserRouter = require("./controller/UserController")
const productRoutes = require("./controllers/product.controller")

const app = express();

app.use(cors())
app.use(express.json()) 

app.get("/", (req, res) => {
    res.send("Welcome to product management API!")
})

// app.use("/user", UserRouter)
app.use("/product", productRoutes)

const PORT = process.env.PORT || 4001

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));