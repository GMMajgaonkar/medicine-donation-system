import express from "express"
import { addmedine, delete_medicine, getall, getbyid, getbymedicineid, update_medicine } from "../controller/medicineController.js"
import userAuth from "../middleware/Auth.js"
import { singleUpload } from "../middleware/multer.js"

export const medicinerouter = express.Router()
medicinerouter.post("/addmedicine", userAuth, singleUpload, addmedine)
medicinerouter.put("/update_medicine/:id",userAuth,singleUpload,update_medicine)
medicinerouter.delete("/delete_medicine/:id",userAuth,delete_medicine)
medicinerouter.get("/getall",getall)
medicinerouter.get("/getbyid",userAuth,getbyid)
medicinerouter.get("/getbymedicineid/:id",userAuth,getbymedicineid)