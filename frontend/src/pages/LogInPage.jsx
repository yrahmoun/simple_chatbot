import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LogInPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="login-box">
        <div className="login-option">
          <h1
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Login
          </h1>
          <h1
            onClick={() => {
              setIsLogin(false);
            }}
          >
            Register
          </h1>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default LogInPage;
