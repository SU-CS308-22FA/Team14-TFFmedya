import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import OTPBox from './OTPBox'
//import { UserProvider } from './utils/UserContext'


//import { UserContext } from './utils/UserContext'
//import { loginUser, setAxiosAuthToken, setToken, getCurrentUser, unsetCurrentUser } from './services/auth';

export default function ForgotPassword()  {
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

        fetch('http://127.0.0.1:8000/userforgotpassword', {
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

                    Navigate("/otppage", { state: data })
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
    
        <div className="auth-form-container">
            <h2>Şifremi Unuttum</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>

                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Lütfen mailinizi giriniz" id="email" name="email" required/>
                
                {errorMessage === '' ? null :
                    <span style={{
                      fontWeight: 'bold',
                      color: 'red', 
                      
                    }}>{errorMessage}<br/></span> }
                <button type="submit" >Kod Gönder</button>
                
            </form>

            
        </div>
        
        
       
       

        
    )
   
}