import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotInput from "../components/ChatbotInput";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../css/Homepage.css";

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
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="homepage">
        <Sidebar />
        <ChatbotInput />
      </div>
    </>
  );
}

export default Homepage;
