import { useLocation } from "react-router-dom";
import "../css/Navbar.css";
import Logout from "./Logout";

function Navbar() {
  const { pathname } = useLocation();
  return (
    <div className="navbar">
      <div className="title">
        <img src="/bot.svg"></img>
        <h1>Simple Bot</h1>
      </div>
      {pathname !== "/Login" && <Logout />}
    </div>
  );
}

export default Navbar;
