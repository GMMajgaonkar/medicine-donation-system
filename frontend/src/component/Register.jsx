import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { toast, ToastContainer, Bounce } from 'react-toastify'


 const Register =()=>{
    const Navigate =useNavigate()
const [user, setUser]=useState({
    name:"",
    email: "",
    password:"",
    contact:""

})
  const { name, email, password,contact} = user;

const handleChange=(e)=>{ setUser({...user,[e.target.name] : e.target.value}) }

const handleSubmit=async(e)=>{
    e.preventDefault();
  try{
    const res=await axios.post("http://localhost:8080/users/register",user)
   
     localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user))

      toast.success("Acoount Created Succesfully", {
        position: "top-right",
        transition: Bounce,
        autoClose: 2000
     })

     setTimeout(()=>{
      Navigate("/Login")
     },2000);
       
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      console.log(errorMessage);
    }
  
}


return( <>
<ToastContainer/>
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <form className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={user.email}
             onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

         <div className="mb-4">
          <label className="block text-gray-600 mb-1">Phone no</label>
          <input
            type="tel"
            placeholder="Enter nanumber"
            name="contact"
            value={user.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <span className="text-indigo-600 cursor-pointer">Login</span>
        </p>
      </form>
    </div>
  </>);
}

export default Register;