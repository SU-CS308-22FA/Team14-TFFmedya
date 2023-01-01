//import React, { useState } from "react";
//import logo from './logo.svg';
import './App.css';
import {LeafPoll, Result } from 'react-leaf-polls'

import { UserProvider } from "./utils/UserContext";
import { useState } from 'react';

//import Navbar from "./Navbar";
import { QueryClient, QueryClientProvider } from 'react-query';
import Login  from "./Login";
import Register from "./Register";
import Home from "./Home";
import { Route , Routes  } from "react-router-dom";
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Fixture from './Fixture';
import Profile from './Profile';
import PollPage from './Poll_Page';
import PollCreate from './Poll_Create';
import PollResults from './PollResults';
import Review from './ReviewPage';
import ForgotPassword from './Forgotpassword';
import OTPPage from './OTPPage';
import ChangePassword from './ChangePassword';
import Stats from './Stats'
import Report from './Report'

import { ReactSession } from 'react-client-session';
import Logout from './Logout';
import GuessingContestPage from './GuessingContest';
import ContestCreate from './Contest_Create';
import Board from './Leaderboard';
import ReportResults from './ReportResults';
import ReportTypes from './ReportTypes';
import Report_Bans from './Report_Bans';


const queryClient = new QueryClient()

function App() {
  ReactSession.setStoreType("localStorage");

 
  return(
 
      <>
      <QueryClientProvider client = {queryClient}>
        {ReactSession.get("username") !== undefined ? <Navbar /> : <Navbar2 /> }
  
        <Fixture />
        <div className="App">
          <Routes>
            
            <Route path="/" element={<Home />} />   
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} />  
            <Route path="/profile" element={<Profile />} />
            <Route path="/poll" element={<PollPage />} /> 
            <Route path="/poll_create" element={<PollCreate />} /> 
            <Route path="/pollresults" element={<PollResults />} /> 
            <Route path="/contest" element={<GuessingContestPage />} /> 
            <Route path="/contest_create" element={<ContestCreate />} /> 
            <Route path="/forgotpassword" element={<ForgotPassword />} /> 
            <Route path="/otppage" element={<OTPPage/>} /> 
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/matchreview" element={<Review />} />
            <Route path="/leaderboard" element={<Board />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/report_result" element={<ReportResults />} />
            <Route path="/reporttypes" element={<ReportTypes />} />
            <Route path="/report_bans" element={<Report_Bans />} />
          </Routes>
          
        </div>  
      </QueryClientProvider>
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
