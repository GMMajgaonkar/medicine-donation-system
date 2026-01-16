import axios from "axios";
import React, { useState } from "react";

export const Addmedicine=()=>{
  

 const [medicine, setmedicine] = useState({
    Medicine_name: "",
    email: "",
    phone: "",
    expiry: "",
    quantity: "",
    file:null,
  });

  const handleChange = (e) => {
    setmedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const filehandler=(e)=>{
    setmedicine({...medicine,file:e.target.files[0]})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Medicine_name", medicine.Medicine_name);
    formData.append("email", medicine.email);
    formData.append("phone", medicine.phone);
    formData.append("expiry", medicine.expiry);
    formData.append("quantity", medicine.quantity);
    formData.append("file", medicine.file);

    try {

const res = await axios.post(
  "http://localhost:8080/medicine/addmedicine",
  formData,{
    withCredentials: true, // 🔥 REQUIRED
     headers: { "Content-Type": "multipart/form-data" }
  }
  
);
      
      console.log(res.data);
      
    } catch (error) {
      console.log(error.response?.data);
    }
  };

    
  return (
    <div>
      {/* CSS inside JSX */}
      <style>
        {`
          .page {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #667eea, #764ba2);
            font-family: "Segoe UI", sans-serif;
          }

          .formCard {
            background: #ffffff;
            width: 100%;
            max-width: 420px;
            padding: 32px;
            border-radius: 18px;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.18);
          }

          .formTitle {
            text-align: center;
            margin-bottom: 22px;
            color: #333;
          }

          .formGroup {
            margin-bottom: 16px;
          }

          .formLabel {
            display: block;
            margin-bottom: 6px;
            font-size: 14px;
            font-weight: 600;
            color: #444;
          }

          .formInput {
            width: 100%;
            padding: 12px 14px;
            border-radius: 10px;
            border: 1px solid #ddd;
            font-size: 14px;
            transition: 0.3s ease;
          }

          .formInput:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          }

          .fileInput {
            padding: 8px;
            background: #f7f7f7;
          }

          .submitBtn {
            width: 100%;
            margin-top: 20px;
            padding: 12px;
            border-radius: 14px;
            border: none;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.25s ease;
          }

          .submitBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 28px rgba(102, 126, 234, 0.45);
          }
        `}
      </style>



      {/* JSX */}
      <div className="page">
      <form className="formCard" onSubmit={handleSubmit}>
        <h2 className="formTitle">Medicine Details</h2>

        <input
          className="formInput"
          name="email"
          placeholder="Email"
          value={medicine.email}
          onChange={handleChange}
        />

        <input
          className="formInput"
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={medicine.quantity}
          onChange={handleChange}
        />

        <input
          className="formInput"
          name="phone"
          type="number"
          placeholder="Phone"
          value={medicine.phone}
          onChange={handleChange}
        />

        <input
          className="formInput"
          name="Medicine_name"
          placeholder="Medicine name"
          value={medicine.Medicine_name}
          onChange={handleChange}
        />

        <input
          className="formInput"
          name="expiry"
          type="date"
          value={medicine.expiry}
          onChange={handleChange}
        />

       <input
          className="formInput"
          name="file"
          type="file"
          accept="image/*"
          onChange={filehandler}
        />

        

        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
    </div>
  )}
