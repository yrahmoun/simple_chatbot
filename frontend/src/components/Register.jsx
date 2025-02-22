import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-form">
      <label>Username:</label>
      <input type="text" onChange={(e) => {setUsername(e.value)}}></input>
      <label>Email:</label>
      <input type="text" onChange={(e) => {setEmail(e.value)}}></input>
      <label>Password:</label>
      <input type="password" onChange={(e) => {setPassword(e.value)}}></input>
      <button>Register</button>
    </div>
  );
}

export default Register;
