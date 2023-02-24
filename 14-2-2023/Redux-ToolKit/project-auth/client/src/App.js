import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import About from './component/about';
import Login from './component/auth/login';
import Register from './component/auth/register';
import Home from './component/home';
import Profile from './component/profile';
function App() {
  return (
    <div className="App  ">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} ></Route>
          <Route exact path='/about' element={<About />} ></Route>
          <Route exact path='/me' element={<Profile />} ></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div >

  );
}

export default App;
