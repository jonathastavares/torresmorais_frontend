import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from './components/Cart';
import Item from './components/Item';
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/checkout" element={<Cart />} />
            <Route path="/item/:id" element={<Item />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>
);
