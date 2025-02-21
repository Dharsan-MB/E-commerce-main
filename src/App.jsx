import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Vegetables from './components/Vegetables'
import Fruits from './components/Fruits'
import Groceries from './components/Groceries'
import Cart from './components/Cart'
import { CartProvider } from './components/CartContext'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          
          <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
            <Routes>
              <Route path="/" element={<RegisterPage />} /> {/* Set LoginPage as the default route */}
              <Route path="/home" element={<Home />} />
              <Route path="/vegetables" element={<Vegetables />} />
              <Route path="/fruits" element={<Fruits />} />
              <Route path="/groceries" element={<Groceries />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} /> {/* Added RegisterPage route */}
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App