import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/Login");
    }
  }, [navigate]);

  return (
    <div>
      <p>welcome in {localStorage.getItem("username")}</p>
    </div>
  );
}

export default Homepage;
