import { useEffect, useState } from "react";
import { handleUnauthorized } from "../utilities/handleUnauthorized";
import { useNavigate } from "react-router-dom";
import { useBotContext } from "../context/BotContext";
import "../css/Sidebar.css";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Logout from "./Logout";

function Sidebar() {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const { botModel, setBotModel, showClear, setShowClear } = useBotContext();
  const [allModels, setAllModels] = useState([]);
  const [showModels, setShowModels] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getModels = async () => {
      const response = await fetch(`${backend_url}/fetch-models`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (handleUnauthorized(data, navigate)) return;
      setAllModels(data);
    };
    getModels();
  }, []);

  return (
    <>
      {showSideBar && (
        <div className="sidebar">
          <div className="model-choice">
            <p>Current model:</p>
            <h3
              onClick={() => {
                setShowModels(!showModels);
              }}
            >
              {botModel}
            </h3>
            {showModels && (
              <div className="model-list">
                <ul>
                  {allModels.map((model) => (
                    <li
                      className="model-list-item"
                      onClick={() => {
                        setBotModel(model.id);
                        setShowModels(false);
                      }}
                    >
                      <p>{model.id}</p>
                      <p>{model.owned_by}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            className="clear-button"
            onClick={() => {
              if (!showClear) setShowClear(true);
            }}
          >
            Clear history
          </button>
          <div className="show-logout">
            <Logout />
          </div>
        </div>
      )}
      <div
        className="menu-button"
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        {showSideBar ? (
          <ChevronLeft size={45} color="#fff" />
        ) : (
          <ChevronRight size={45} color="#fff" />
        )}
      </div>
    </>
  );
}

export default Sidebar;
