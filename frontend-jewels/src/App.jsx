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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account/login" element={<Account />} />
          <Route path="/account/register" element={<Register />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminHome />} />
        </Routes>
        <Footer />
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
