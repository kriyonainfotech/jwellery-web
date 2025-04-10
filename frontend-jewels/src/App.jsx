import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Account from './Pages/MyAccount'
import Register from './Pages/Register'
import AdminHome from './Pages/AdminHome'
import AdminLogin from './AdminPanel/AdminLogin'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { About } from "./Pages/About";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AdminProtected from "./ProtectedRoutes/AdminProtected";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <AdminProtected>
                <AdminHome />
              </AdminProtected>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App
