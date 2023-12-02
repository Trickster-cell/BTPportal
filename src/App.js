import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Auth from "./pages/Auth";
import ImageUpload from "./pages/ImageUpload";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent(props) {
  const location = useLocation();

  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/Img" element={<ImageUpload />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
