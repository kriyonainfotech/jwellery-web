import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../AdminPanel/AdminLogin'
import Admindashboard from '../AdminPanel/dashboard'
import Sidebar from '../AdminPanel/AdminSidebar.jsx'
import ViewCategory from '../AdminPanel/ViewCategory.jsx'
import ViewSubcategory from '../AdminPanel/ViewSubcategory.jsx'
import ViewProduct from '../AdminPanel/ViewProduct.jsx'
import ViewOrders from '../AdminPanel/ViewOrders.jsx'
import ViewUsers from '../AdminPanel/ViewUsers.jsx'
import AddCategory from '../AdminPanel/AddCategory.jsx'
import AddSubCategory from '../AdminPanel/AddSubcategory.jsx'
import AddProduct from '../AdminPanel/AddProduct.jsx'

const AdminHome = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/dashboard" element={<Admindashboard />} />
          <Route path="/categories" element={<ViewCategory />} />
          <Route path="/categories/:categoryId" element={<ViewSubcategory />} />
          <Route path="/products" element={<ViewProduct />} />
          <Route path="/orders" element={<ViewOrders />} />
          <Route path="/users" element={<ViewUsers />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/:categoryId/add" element={<AddSubCategory />} />
          <Route path="/products/add" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminHome
