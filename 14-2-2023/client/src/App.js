import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'
import './App.css';

import About from './component/about';
import Login from './component/acc/login';
import Register from './component/acc/register';
import Home from './component/home';
import NavBar from './component/navbar';
function App() {
  return (
    <div className="App  ">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' ><Home /></Route>
          <Route exact path='/about'><About /></Route>
          <Route exact path='/login' ><Login /></Route>
          <Route exact path='/register'><Register /></Route>
        </Switch>
      </Router>
    </div >

  );
}

export default App;
