import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form_Login from './component/form_login';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form_Signup from './component/form_signup';
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Form_Login />} />
          <Route path='/signup' element={<Form_Signup />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
