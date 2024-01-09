import ShoppingList from './ShoppingList';
import Layout from './Layout';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import About from './About';


function App() {
  return (
    <Routes>
      <Route path='/' element={<ShoppingList/>} />
      <Route path='/about' element={<About/>} />
    </Routes>
    // <ShoppingList/>
  );
}

export default App;
