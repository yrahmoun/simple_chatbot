import { useLocation } from "react-router-dom";
import "../css/Navbar.css";
import Logout from "./Logout";
import { Menu, X } from "lucide-react";
import { useBotContext } from "../context/BotContext";

function Navbar() {
  const { pathname } = useLocation();
  const { showSideBar, setShowSideBar } = useBotContext();

  return (
    <div className="navbar">
      {pathname != "/Login" && (
        <div
          className="menu-toggle"
          onClick={() => {
            setShowSideBar(!showSideBar);
          }}
        >
          {showSideBar ? (
            <X size={30} color="#fff" />
          ) : (
            <Menu size={30} color="#fff" />
          )}
        </div>
      )}
      <div className="title">
        <img src="/bot.svg"></img>
        <h1>Simple Bot</h1>
      </div>
      <div className="navbar-logout">{pathname !== "/Login" && <Logout />}</div>
    </div>
  );
}

export default Navbar;
