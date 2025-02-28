import { useBotContext } from "../context/BotContext";
import { handleUnauthorized } from "../utilities/handleUnauthorized";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/ClearChat.css";

function ClearChat() {
  const { setShowClear, setMessages } = useBotContext();
  const [error, setError] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const clearChatHistory = async () => {
    setError("");
    const response = await fetch(`${backend_url}/clear-chat`, {
      method: "GEt",
      credentials: "include",
    });
    const data = await response.json();
    if (handleUnauthorized(data, navigate)) return;
    if (data.error) {
      setError(data.error);
      return;
    }
    setMessages([]);
    setShowClear(false);
  };

  return (
    <div className="clear-history">
      {error && <p className="error-message"></p>}
      <p>are you sure you want to clear the chat ?</p>
      <div className="clear-option">
        <button
          onClick={() => {
            setShowClear(false);
          }}
        >
          Close
        </button>
        <button onClick={clearChatHistory}>Clear</button>
      </div>
    </div>
  );
}

export default ClearChat;
