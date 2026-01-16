import express from "express";
import cors from "cors"
import User from "./model/UserModel.js"
import DBConnection from "./config/DbConnection.js"
import { router } from "./routes/user.js";
import { medicinerouter } from "./routes/medicine.js";
import cookieParser from "cookie-parser";
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()); 
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.get("/",(req,res)=>{
    return res.status(200).json({
        message : "welcome"
})
})

app.listen(8080,()=>{
    
    console.log("server is running on 8080")
})





app.use("/users", router)
app.use("/medicine",medicinerouter)

DBConnection();

