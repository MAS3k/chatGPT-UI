import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { v4 as uuidv456 } from "uuid";
import "./LoginForm.css";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100vh",
};

const paperStyle = {
  padding: "40px",
  margin: "30px",
  width: "400px",
  height: "500px",
  borderRadius: "18px",
  backgroundColor: "#76b1e3",
};

const ChatGPTLogo = () => (
  <div className="loginheading">
    <h1>
      <span>C H A T G P T </span>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
        alt="ChatGPT Logo"
        style={{ width: "30px", height: "auto" }}
      />
    </h1>
    <h3>L O G I N</h3>
  </div>
);

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");

    if (expirationTime && new Date().getTime() >= +expirationTime) {
      setLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      alert("Session has expired. Please log in again.", () => {
        navigate("/login");
      });
    }
  }, [loggedIn, navigate]);

  const handleLogin = () => {
    if (username === "abdullah" && password === "1122") {
      console.log("Login successful!");

      const token = uuidv456();
      const expirationTime = new Date().getTime() + 60000;
      setLoggedIn(true);

      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);

      navigate("/home");
    } else {
      alert("Invalid password. Please try again.");
    }
  };

  const func = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");

    if (expirationTime && new Date().getTime() >= +expirationTime) {
      setLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      alert("Session has expired. Please log in again.");
    }
  }, []);

  return (
    <div
      style={{ backgroundColor: "#000", height: "100vh", overflow: "hidden" }}
    >
      <Container style={containerStyle}>
        <div className="additionalContentStyle">
          <h2>Welcome to ChatGPT! How May I Help You</h2>
          <p>Explore the power of language with ChatGPT.</p>
          <p>Explore the journey with ChatGPT.</p>
        </div>

        <Paper elevation={10} style={paperStyle}>
          <ChatGPTLogo />

          <form>
            <hr />
            <div style={{ marginTop: "20px" }}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onKeyDown={func}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "40px" }}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onKeyDown={func}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
            </div>
            <div style={{ marginTop: "50px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>

            <Typography
              color="textSecondary"
              style={{
                marginTop: "60px",
                textAlign: "center",
                color: "whitesmoke",
              }}
            >
              {loggedIn
                ? "Logged in successfully!"
                : "© 2023 ChatGPT. All rights reserved."}
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginForm;
