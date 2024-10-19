// src/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [brands, setBrands] = useState([]);
  const [userName, setUserName] = useState("User"); // Replace with actual user name after login
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://fmcg.perisync.work/api/brand?skip=1&limit=10",
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(response.data);
        setUserName(response.data.user.name);
        setBrands(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("geolocation");
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome, {userName}</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {brands.map((brand, index) => (
          <li key={index}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
