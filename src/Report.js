
import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import React from 'react'
import { ReactSession } from 'react-client-session'
import {base_url} from "./constants"
import { useNavigate  } from 'react-router-dom'

export default function Report () {
 
    //const [value, setValue] = React.useState('');
    const [value, setValue] = React.useState('user');
    const [title, setTitle] = useState('')
    const [report_text, setReportText] = useState('')
    //const [errorMessage, setErrorMessage] = useState('')
    const Navigate = useNavigate()
    const handleChange = (event) => {

    setValue(event.target.value);

    };

    const handleGo = (e) => {

      e.preventDefault();
      Navigate("/report_result");
    }
    const handleBans = (e) => {

      e.preventDefault();
      Navigate("/report_bans");
    }
    console.log("TTT:",title)
    const options = [

        { label: 'Users', value: 'user' },
        
        { label: 'Bugs', value: 'bugs' },
        
        { label: 'TFFMedya', value: 'TFFMedya' },
        
        ];

        const handleSubmit = (e) => {

            e.preventDefault();
            var t = title;
          
            fetch(base_url+'/report/report', {
              method: 'POST',
              body: JSON.stringify({
                // Add parameters here
                'type' : value,
                'title' : title,
                'report_text' : report_text,
                'username' : ReactSession.get("username")
                
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
               .then((response) => response.json())
               .then((data) => {
                  console.log("datam",data);
                  if (data === "Successful") {
  
                    alert("Submitted your report successfully")
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
            console.log("T", title)
            console.log("R", report_text)
            console.log("U", ReactSession.get("username"))
    
      }
    

 
    
    return (
            <form role="form" onSubmit={handleSubmit}>

            <div>
              { ReactSession.get("is_moderator") === true &&
                <div>
                    
                    <button onClick={(e) => handleGo(e)}>Go to Reports</button>
                    <button onClick={(e) => handleBans(e)}>Go to Bans</button>
                    <br></br>

                </div>
                }
              
              <label value={value} onChange={handleChange} style={{ fontSize: 25, fontWeight: 50 }}>
                <br></br>
                Your reason of reporting
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
            <input type="text" onChange={e => setTitle(e.target.value)} className="form-control" style={{width: '300px'}}id="title" name="title" placeholder="Title" required />
            </div>
            <div className="form-group" > 
            <textarea className="form-control" onChange={e => setReportText(e.target.value)} type="textarea" id="subject" placeholder="Subject" maxlength="200" style={{width: '300px'}} width="400" columns="40" rows="10"></textarea>
            </div>
            </div>
            <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Submit</button>
            </form>
         
          );
         
         
        /*{ 
        <div>
        <h2 style={{color: "purple"}}>Welcome to the reporting page of TFFMedya</h2>
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <Listbox.Button>{selectedPerson.name}</Listbox.Button>
        <Listbox.Options>
          {people.map((person) => (
            <Listbox.Option
              key={person.id}
              value={person}
              disabled={person.unavailable}
            >
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
        <div className="form-group">
        <input type="text" /*onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
        </div>
        <div className="form-group">
        <textarea className="form-control" /*onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
        </div>
          </div>}*/


        
     
}