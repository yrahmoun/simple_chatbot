import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-form">
      <label>Username:</label>
      <input type="text" onChange={(e) => {setUsername(e.value)}}></input>
      <label>Password:</label>
      <input type="password" onChange={(e) => {setPassword(e.value)}}></input>
      <button>Login</button>
    </div>
  );
}

export default Login;
