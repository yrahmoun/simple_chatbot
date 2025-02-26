import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!username || !password) {
      setErrorMessage("Please fill all the fields.");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.error) {
        setErrorMessage(data.error);
        return;
      }
      localStorage.setItem("username", data.username);
      navigate("/");
    } catch (error) {
      setErrorMessage("Failed to login. Please try again.");
    }
  };

  return (
    <div className="login-form">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button onClick={submitHandler}>Login</button>
    </div>
  );
}

export default Login;
