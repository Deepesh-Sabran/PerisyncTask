import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import Error from "./Error";
import myImg from "../asset/login_background.png";
import Logo from "../asset/logo.png";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
  };

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dashboard"); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a number and a special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://fmcg.perisync.work/api/super_admin/login",
        {
          email_id: email,
          password: password,
          type: "super_admin",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);

      if (data.success) {
        localStorage.setItem("token", data.token);

        // Fetch geolocation and store it
        navigator.geolocation.getCurrentPosition((position) => {
          localStorage.setItem(
            "geolocation",
            JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
        });

        setSuccess("Login successful!");
        navigate("/dashboard"); // Redirect to Dashboard after successful login
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="main_container">
      <div className="left_div">
        <Error>
          <img src={Logo} alt="Logo" className="logo" />
          <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <p id="left_div_para">Welcome back! Please enter your details</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <label>Email</label> <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <br />
            <label>Password</label> <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <br />
            <div id="checkBoxDiv">
              <input type="checkbox" />
              <span>Remember for 30 Days</span>
              <span id="p">Forgot password</span>
            </div>
            <button type="submit">Sign in</button>
          </form>

          <p>OR</p>
          <div>
            <button type="button">
              <FcGoogle /> Sign up with Google
            </button>

            <button type="button">
              <BsFacebook /> Sign up with Facebook
            </button>
          </div>

          <p id="p">
            Don't have an account? <span id="link">Sign up</span>
          </p>
        </Error>
      </div>

      <div className="right_div">
        <img src={myImg} alt="Background" className="background" />
      </div>
    </div>
  );
};

export default LoginPage;
