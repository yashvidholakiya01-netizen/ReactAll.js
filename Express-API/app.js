require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express()
const db = require("./config/db")
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/web/v1/user.route")
const adminRouter = require("./routes/web/v1/admin.route")
const productRouter = require("./routes/web/v1/product.route")
const orderRouter = require("./routes/web/v1/order.route")
const wishlistRouter = require("./routes/web/v1/wishlist.route")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set(db())
//cors origin --> allow only
//htpps:localhost:3002 =--> req --> accept --> give response
//htpps:localhost:3005 =--> req --> accept --> give don't response
app.use(cors({origin:"http://localhost:3002", credentials:true}));

PORT = process.env.PORT
// temp roue --> in backend we don't create a home route, after testing
app.get("/", (req,res) => {
    res.status(401).json({message: "Access Denined!"})
})
app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/product", productRouter)
app.use("/order",orderRouter)
app.use("/wishlist",wishlistRouter)

app.listen(PORT,() => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})