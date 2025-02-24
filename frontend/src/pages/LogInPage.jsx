import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

function LogInPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="page-conatiner">
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
          register
        </h1>
      </div>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}

export default LogInPage;
