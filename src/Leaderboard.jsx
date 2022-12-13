import React, { useState } from 'react'
import Profiles from './profiles';
//import { Leaderboard } from './database';
import './boardstyle.css';
import {base_url} from "./constants"


export default function Board() {
    const [Leaderboard, setLeaderboard] = useState([])

    function Get_Leaderboard()
    {
        fetch(base_url +'/guessingcontest/leaderboard', {
    
          method: 'POST',
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
          }).then((response) => response.json())
          .then((data) => {
             setLeaderboard(data);
           
          })
          .catch((err) => {
             console.log(err.message);
          })
         
        
    
    }
    //Get_Leaderboard();    
    
    

    
    return (
    <div className="board">
        <br/>
        <br/>
        <button type="submit" onClick={Get_Leaderboard}>View Leaderboard</button>
        <br/>
        <br/>
        <br/>
        
        <h1 className='leaderboard'>Contest Leaderboard</h1>

        

      
        <Profiles Leaderboard={Leaderboard}></Profiles>

    </div>
  )
  
}
