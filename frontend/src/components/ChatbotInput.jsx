import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ChatbotInput.css";
import { handleUnauthorized } from "../utilities/handleUnauthorized";
import { useBotContext } from "../context/BotContext";
import { ArrowBigUp } from "lucide-react";

function ChatbotInput() {
  const [prompt, setPrompt] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const chatBoxRef = useRef(null);
  const { botModel, messages, setMessages } = useBotContext();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`${backend_url}/fetch-messages`, {
        method: "GEt",
        credentials: "include",
      });
      const data = await response.json();
      if (handleUnauthorized(data, navigate)) return;
      setMessages(data);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const getResponse = async () => {
    if (!prompt.trim() || responseLoading) {
      return;
    }
    setResponseLoading(true);
    setPrompt("");
    let userMessage = {
      role: "user",
      content: prompt,
    };
    setMessages((prev) => [...prev, userMessage]);
    try {
      const response = await fetch(`${backend_url}/chatbot-reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ prompt, botModel }),
      });
      const data = await response.json();
      if (handleUnauthorized(data, navigate)) return;
      let botMessage = {
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setResponseLoading(false);
    }
  };

  return (
    <div className="chatPage-container">
      <div className="prompt-container">
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.role === "user" ? "user-message" : "bot-message"}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="user-input">
          <textarea
            className="input-field"
            type="text"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            placeholder="Type your message here..."
          />
          <button onClick={getResponse}>send</button>
          <div className="send-button" onClick={getResponse}>
            <ArrowBigUp size={24} color="#fff" fill="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatbotInput;
