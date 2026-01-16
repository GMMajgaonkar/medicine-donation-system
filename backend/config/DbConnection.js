import mongoose from "mongoose";

const DBConnection = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/medicine')
        console.log("DB Connected ")
    } catch (error) {
        console.log("DB Connection failed :",  error)
    }
}

export default DBConnection;