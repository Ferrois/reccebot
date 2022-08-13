import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import GlobalProvider from "./context/GlobalContext";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={false}
      />
    </GlobalProvider>
  );
}

export default App;
