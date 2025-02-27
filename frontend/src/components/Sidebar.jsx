import { useEffect } from "react";
import { handleUnauthorized } from "../utilities/handleUnauthorized";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getModels = async () => {
      const response = await fetch(`${backend_url}/fetch-models`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (handleUnauthorized(data, navigate)) return;
      console.log(data);
    };
    getModels();
  }, []);
  return <div></div>;
}

export default Sidebar;
