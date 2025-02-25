import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotInput from "../components/ChatbotInput";
import Logout from "../components/Logout";

function Homepage() {
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const verifyToken = async () => {
      const response = await fetch(`${backend_url}/verify`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        localStorage.removeItem("username");
        navigate("/Login");
      }
    };
    verifyToken();
  }, [navigate]);

  if (!localStorage.getItem("username")) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <Logout />
      <p>welcome in {localStorage.getItem("username")}</p>
      <ChatbotInput />
    </div>
  );
}

export default Homepage;
