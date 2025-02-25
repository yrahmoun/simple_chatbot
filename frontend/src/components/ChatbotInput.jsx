import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChatbotInput() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const getResponse = async () => {
    if (!prompt) {
      return;
    }
    try {
      const response = await fetch(`${backend_url}/chatbot-reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.unauthorized) {
        localStorage.removeItem("username");
        navigate("/Login");
        console.error(data.error);
        return;
      }
      setPrompt("");
      setReply(data.reply);
    } catch (error) {
      console.error(error);
      setReply("Errors getting a response. Please try again.");
    }
  };

  return (
    <div className="prompt-container">
      <input
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      ></input>
      <button onClick={getResponse}>send</button>
      {reply && <p>{reply}</p>}
    </div>
  );
}

export default ChatbotInput;
