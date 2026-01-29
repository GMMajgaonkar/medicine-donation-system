import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Statusupdate = () => {
    const { id } = useParams();
    const nevigate=useNavigate()

    // ✅ FIX 1: proper initial state
    const [data, setData] = useState({
        status: "",

    });

    // ✅ fetch data
    useEffect(() => {
        const handel = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/medicine/getbymedicineid/${id}`,
                    { withCredentials: true }
                );

                setData({
                    status: res.data.status || "",

                });
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        handel();
    }, [id]);

    // ✅ input change
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    // ✅ FIX 2: use FormData
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("status", data.status);



            const res = await axios.put(
                `http://localhost:8080/medicine/update_medicine/${id}`,
                formData,
                { withCredentials: true }
            );

            console.log(res.data);
            alert("status updated successfully");
            nevigate("/Application")

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <>
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


            <div className="page">
                <form className="formCard" onSubmit={handleSubmit}>
                    <h2 className="formTitle">Medicine Details</h2>

                    <select
                        className="formInput"
                        name="status"
                        value={data?.status || ""}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select
                        </option>
                        <option value="Reject">Reject</option>
                        <option value="Approve">Approve</option>
                    </select>


                    <button className="submitBtn" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
