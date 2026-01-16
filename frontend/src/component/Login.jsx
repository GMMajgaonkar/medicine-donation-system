import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from 'react-toastify'


const Login = () => {
    const Navigate = useNavigate()

    const [login, setlogin] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/users/login", login, { withCredentials: true })
            console.log(res.data)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user))
          // res.cookie("token",  res.data.token)
  


            toast.success("Login Succesfully", {
                position: "top-right",
                transition: Bounce,
                autoClose: 2000
            })

            setTimeout(() => {
                Navigate("/")
            }, 2000);
        } catch (error) {
           toast.error("email or password incorrect", {
                position: "top-right",
                transition: Bounce,
                autoClose: 2000
            })
        }
    }
    return (
        <>
        <ToastContainer/>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={login.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={login.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don’t have an account?{" "}
                    <span
                        className="text-indigo-600 cursor-pointer"
                        onClick={() => Navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
   </> );
};

export default Login;

