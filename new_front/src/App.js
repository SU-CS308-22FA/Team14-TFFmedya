//import React, { useState } from "react";
//import logo from './logo.svg';
import './App.css';
import { UserProvider } from "./utils/UserContext";
import { useState } from 'react';

//import Navbar from "./Navbar";
import Login  from "./Login";
import Register from "./Register";
import Home from "./Home";
import { Route , Routes  } from "react-router-dom";
import Navbar from './Navbar';
import Profile from './Profile';


function App() {



 
  return(
 
      <>
      <Navbar />
      <div className="App">
        <Routes>
          
          <Route path="/" element={<Home />} />   
          <Route path="/login" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/profile" element={<Profile />} />  
          
        </Routes>
        

      </div>  
      
      </>
    
    
    
  )
  
  /*
  const [currentForm, setCurrentForm] = useState('login');
  

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }*/
  /*
  return (
    
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />

      }
      
      
    </div>
      
     <>
     
     <div className="container">
     {component}
     </div>
     
     </>
  );*/
}

export default App;
