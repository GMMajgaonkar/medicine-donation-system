import express from "express";
import { Login, logout, RegisterUser, updateuser } from "../controller/userController.js";

export const router = express.Router();

router.post("/register", RegisterUser)
router.post("/login",Login)
router.put("/update/:id",updateuser)
router.post("/logout",logout)