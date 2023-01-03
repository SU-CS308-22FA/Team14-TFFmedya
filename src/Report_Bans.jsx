import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import React from 'react'
import { ReactSession } from 'react-client-session'
import {base_url} from "./constants"
import { useNavigate  } from 'react-router-dom'

export default function Report_Bans () {

    const [user, setUser] = useState('')
    const [value, setValue] = useState('küfür');

    const handleChange = (event) => {

        setValue(event.target.value);
    
        };
    

    const options = [

        { label: 'Küfür', value: 'küfür' },
        
        { label: 'Hakaret', value: 'hakaret' },
        
        { label: 'Uygunsuz', value: 'uygunsuz' },
        
        ];

        const handleSubmit = (e) => {

            e.preventDefault();
           
          
            fetch(base_url+'/ban/ban', {
              method: 'POST',
              body: JSON.stringify({
                // Add parameters here
                'username' : user,
                'ban_reason' : value,
               
                
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
               .then((response) => response.json())
               .then((data) => {
                  console.log("datam",data);
                  if (data === "Successful") {
  
                    alert("Submitted your ban successfully")
                    window.location.href = "/";
                  }
                  else {
                     
                      console.log("Could not report")
  
                  }
  
               })
               .catch((err) => {
                  console.log(err.message);
               })

            console.log("W", value)
            console.log("T", user)
      
      }

    return (
            <form role="form" onSubmit={handleSubmit}>
            <h2>bans</h2>
            <div>
              
              <label value={value} onChange={handleChange} style={{ fontSize: 25, fontWeight: 50 }}>
                <br></br>
                Your reason of banning
                <br></br>
                <br></br>
                <select style={{ height: '5vh' , width: '300px'}}>
         
                {options.map((option) => (

                    <option value={option.value}>{option.label}</option>

                ))}
         
                </select>

            
              </label>
              <br></br>
              <br></br>
              <p>We eat {value}!</p>
            
            <br></br>
            <div className="form-group">
            <input type="text" onChange={e => setUser(e.target.value)} className="form-control" style={{width: '300px'}}id="title" name="title" placeholder="Title" required />
            </div>
           
            </div>
            <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Submit</button>
            </form>
         
          );
         

}