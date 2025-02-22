import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function LogInPage() {
  const [isLogin, setIsLogin] = useState(true);
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
