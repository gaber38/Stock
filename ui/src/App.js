import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ChangePassword from './components/auth/ChangePasswod';
import Products from './components/products';
import StockExchangeList from './components/stockExchange/StockExchangeList';
import StockExchangeCreate from './components/stockExchange/StockExchangeCreate';
import StockExchangeUpdate from './components/stockExchange/StockExchangeUpdate';
import StockExchangeDelete from './components/stockExchange/StockExchangeDelete';
import AttachStock from './components/stockExchange/AttachStock';
import DetachStock from './components/stockExchange/DetachStock';
import StockList from './components/stock/StockListComponent';
import StockDelete from './components/stock/StockDeleteComponent';
import StockCreate from './components/stock/StockCreationComponent';
import StockUpdate from './components/stock/StockUpdateComponent';
import Navbar  from './components/Navbar';
import Logout from './components/auth/Logout';


function App() {
    return (
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
            {/* Auth */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/changepassword" element={<ChangePassword />} />
 
            {/* StockExchange */}
            <Route path="/stock-exchanges/:pageNumber" element={<StockExchangeList />} />
            <Route path="/create-stock-exchange" element={<StockExchangeCreate />} />
            <Route path="/update-stock-exchange/:id" element={<StockExchangeUpdate />} />
            <Route path="/delete-stock-exchange/:id" element={<StockExchangeDelete />} />
            <Route path="/add-stock/:id" element={<AttachStock />} />
            <Route path="/remove-stock/:id" element={<DetachStock />} />

            {/* Stock */}
            <Route path="/stocks/:pageNumber" element={<StockList />} />
            <Route path="/create-stock" element={<StockCreate />} />
            <Route path="/update-stock/:id" element={<StockUpdate />} />
            <Route path="/delete-stock/:id" element={<StockDelete />} />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }
  
  export default App;