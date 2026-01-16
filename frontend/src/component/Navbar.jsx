import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("name");
    navigate("/Alogin");
  };

  return (
    <>
      {/* GUEST NAVBAR */}
      {!token && !name && (
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end gap-6 font-medium">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/Alogin">Admin</Link>
          </div>
        </nav>
      )}

      {/* USER NAVBAR */}
      {token && !name && (
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end gap-6 font-medium">
            <Link to="/">Home</Link>
            <Link to="/addmedicine">Add</Link>
            <Link to="/getbyid">Application</Link>
            <button onClick={handleUserLogout}>Logout</button>
          </div>
        </nav>
      )}

      {/* ADMIN NAVBAR */}
      {name === "admin" && (
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end gap-6 font-medium">
            <Link to="/">Home</Link>
            <Link to="/Application">Application</Link>
            <button onClick={handleAdminLogout}>Logout</button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
