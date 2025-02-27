import { createContext, useContext, useState } from "react";

const botContext = createContext();

export const BotProvider = ({ children }) => {
  const [botModel, setBotModel] = useState("llama3-70b-8192");

  return (
    <botContext.Provider value={{ botModel, setBotModel }}>
      {children}
    </botContext.Provider>
  );
};

export const useBotContext = () => useContext(botContext);
