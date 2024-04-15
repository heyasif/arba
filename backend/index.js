const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db")
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")

const cors=require("cors");
dotenv.config()
connectDB()
const app =express();

app.use(cors({
  origin:"*"
}))
app.use(express.json());
const PORT  = process.env.PORT || 8080;

app.use(`/user`, userRoutes)
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);



app.listen(PORT, console.log(`server is running on port ${PORT}`));