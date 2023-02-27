import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from "react-use-cart";

import './App.css';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Checkout from './Component/Checkout.js';
import Cart from './Component/Cart';
import Products from './Component/Products';
import MyAccount from './Component/MyAccount';
import Footer from './Component/Footer';
import Admin from './Component/Admin';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState(allProducts);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://grokart.onrender.com/products");
      const json = await response.json();
       
      setAllProducts(json);
      setFilter(json);
      setLoading(false);
    };

    getProducts();
  }, []);

  const filterProduct = (cat) => {
    const updatedList = allProducts.filter((x) => x.category_id === cat);
    setFilter(updatedList)
  }


  return (
    <BrowserRouter>
      <CartProvider>
          <Routes>
                <Route exact path='/' element={
                <>
                   <Navbar/>
                    <Home 
                        allProducts={allProducts} setAllProducts={setAllProducts}
                        filter={filter} setFilter={setFilter}
                        loading={loading} setLoading={setLoading}
                        filterProduct={filterProduct}
                    />
                    <Products 
                        allProducts={allProducts} setAllProducts={setAllProducts}
                        filter={filter} setFilter={setFilter}
                        loading={loading} setLoading={setLoading}
                        filterProduct={filterProduct}
                    />
                    <Footer/>
                    
                </>
                
                } 
                />              
                <Route path="/cart" element={<><Navbar/><Cart/></>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/checkout" element={<><Navbar/><Checkout/></>}/>
                <Route path="/my-account" element={<><Navbar/><MyAccount/></>}/>      
                <Route path="/admin" element={<Admin allProducts={allProducts}/>}/>
          </Routes>
      </CartProvider>
    </BrowserRouter>
   
  );
}

export default App;