import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dash";
import ToastElem from "./template/ToastElem";
import GlobalProvider from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastElem />
    </GlobalProvider>
  );
}

export default App;
