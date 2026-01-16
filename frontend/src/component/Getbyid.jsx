import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Getbyid = () => {
  const [data, setData] = useState([]);

  // 🔹 Fetch medicines
  const fetchMedicine = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/medicine/getbyid",
        { withCredentials: true }
      );
      setData(res.data);
      console.log(res.data[0]?.email)
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // 🔹 Load data on page load
  useEffect(() => {
    fetchMedicine();
  }, []);

  // 🔹 Delete medicine
  const handeldelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/medicine/delete_medicine/${id}`,
        { withCredentials: true }
      );

      // 🔥 Update UI immediately (NO refresh)
      setData(prevData =>
        prevData.filter(item => item._id !== id)
      );

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="table-container">
      <h2>Medicine Data</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Expiry</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>{item.Medicine_name}</td>
                <td>{item.quantity}</td>
                <td>{item.expiry}</td>
                <td>
                  <img
                    src={`http://localhost:8080/uploads/${item.file}`}
                    alt="medicine"
                    width="80"
                  />
                </td>
                <td>{item.status}</td>
                <td >
                  <div className="flex justify-between">
                  <button
                    className="text-blue-600"
                    onClick={() => handeldelete(item._id)}
                  >
                    Delete
                  </button>

                  <Link to={`/update/${item._id}`}>
                    <button className="text-red-600">
                      Update
                    </button>
                  </Link>
                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
