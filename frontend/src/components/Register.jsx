import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const submitHandler = async () => {
    if (!username || !email || !password) {
      setErrorMessage("Please fill all the fields.");
      return;
    }
    try {
      await fetch(`${backend_url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
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
      <label>Email:</label>
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button onClick={submitHandler}>Register</button>
    </div>
  );
}

export default Register;
