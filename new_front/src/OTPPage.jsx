import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import OTPBox from './OTPBox'
//import { UserProvider } from './utils/UserContext'


//import { UserContext } from './utils/UserContext'
//import { loginUser, setAxiosAuthToken, setToken, getCurrentUser, unsetCurrentUser } from './services/auth';

export default function OTPPage()  {
    const [errorMessage, setErrorMessage] = useState('')
    const Navigate = useNavigate()
    
    //const [user, setUser] =useState("Select User");
   // const handleData = (data) => { setUser(data) } ; console.log(user);

    
    
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    
    const handleSubmit = (e) => {

        e.preventDefault();
        //console.log(email );
        //console.log(pass);

        fetch('http://127.0.0.1:8000/userlogin', {
            method: 'POST',
            body: JSON.stringify({
              // Add parameters here
              'Email' : email,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                if (data !== "There is no user with this email.") {
                    //Login successful

                    Navigate("/profile", { state: data })
                }
                else {
                   
                    setErrorMessage("Mail veya şifre bilginiz hatalı!")

                }
        
             })
             .catch((err) => {
                console.log(err.message);
             })

    }
    return (
    
       <OTPBox/>
       
       

        
    )
   
}