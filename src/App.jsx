import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import KharchaTracker from "./pages/kharcha tracker/KharchaTracker";
import MyDatePicker from "./pages/date picker/MyDatePicker";
import Chart from "./pages/charts/Chart";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/kharcha-tracker" element={<KharchaTracker />} />
          <Route path="/charts" element={<Chart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
