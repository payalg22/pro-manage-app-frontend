import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  Dashboard,
  Settings,
  Analytics,
  SharedTask,
  NotFound,
} from "./pages/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/sharedtask/:id" element={<SharedTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
