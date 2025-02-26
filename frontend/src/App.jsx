import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import Homepage from "./pages/Homepage";
import "./css/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<LogInPage />} />
      </Routes>
    </>
  );
}

export default App;
