import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<LogInPage />} />
      </Routes>
    </div>
  );
}

export default App;
