import { createContext, useContext, useState } from "react";

const botContext = createContext();

export const BotProvider = ({ children }) => {
  const [botModel, setBotModel] = useState("llama3-70b-8192");
  const [showClear, setShowClear] = useState(false);
  const [messages, setMessages] = useState([]);

  return (
    <botContext.Provider
      value={{
        botModel,
        setBotModel,
        showClear,
        setShowClear,
        messages,
        setMessages,
      }}
    >
      {children}
    </botContext.Provider>
  );
};

export const useBotContext = () => useContext(botContext);
