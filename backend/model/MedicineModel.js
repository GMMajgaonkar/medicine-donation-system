import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    Medicine_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const MedicineModel = mongoose.model("Medicine", MedicineSchema);
export default MedicineModel;
