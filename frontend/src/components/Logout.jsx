import { useNavigate } from "react-router-dom";

function Logout() {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(`${backend_url}/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        localStorage.removeItem("username");
        navigate("/Login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="logout">
      <h2 onClick={logout}>Logout</h2>
    </div>
  );
}

export default Logout;
