import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Application = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/medicine/getall",
          { withCredentials: true }
        );
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
    <table border="1">
      <thead>
        <tr>
          <th>Email_ID</th>
          <th>Phone</th>
          <th>Expiry_Date</th>
          <th>Quantity</th>
          <th>Image</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((items) => (
          <tr key={items.id}>
            <td>{items.email}</td>
            <td>{items.phone}</td>
            <td>{items.expiry}</td>
            <td>{items.quantity}</td>
            <td> <img
                    src={`http://localhost:8080/uploads/${items.file}`}
                    alt="medicine"
                    width="80"
                  /></td>
            <td>{items.status}</td>
           <td className="flex justify-between">
                  <button
                    className="text-blue-600"
                    onClick={() => handeldelete(items._id)}
                  >
                    Delete
                  </button>

                  <Link to={`/Status/${items._id}`}>
                    <button className="text-red-600">
                      Update
                    </button>
                  </Link>
                </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
