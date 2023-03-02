import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import About from './component/about';
import Login from './component/auth/login';
import Register from './component/auth/register';
import Home from './component/home';
import Profile from './component/profile';
function App() {
  const auth = useSelector((state) => state.auth);
  console.log('Appjs', auth)


 

  return (
    <div className="App  ">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} ></Route>
          <Route exact path='/about' element={<About />} ></Route>
          <Route exact path={`/me/${auth.name}`} element={<Profile />} ></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div >

  );
}

export default App;
