import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const submitHandler = async () => {
    if (!username || !password) {
      setErrorMessage("please fill all the fields.");
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      {errorMessage && <p>{errorMessage}</p>}
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
