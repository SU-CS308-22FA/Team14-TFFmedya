import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
//import { UserProvider } from './utils/UserContext'


//import { UserContext } from './utils/UserContext'
//import { loginUser, setAxiosAuthToken, setToken, getCurrentUser, unsetCurrentUser } from './services/auth';

export default function Login()  {
    const [errorMessage, setErrorMessage] = useState('')
    const Navigate = useNavigate()
    
    //const [user, setUser] =useState("Select User");
   // const handleData = (data) => { setUser(data) } ; console.log(user);

    
    
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    //melih
    //const {isAuth, setisAuth} = useContext(UserContext);
    
    // let history = useHistory();

    /*const handleSubmit = (e)=> {
        e.preventDefault();
        loginUser(email, pass)
        .then(response =>{
            const auth_token = response;
            setAxiosAuthToken(auth_token);
            setToken(auth_token);
            getCurrentUser();
            setisAuth(true);
            <Navigate to= "/" />
            //window.location.href = "/";

        })
        .catch(error => {
            unsetCurrentUser();
            window.alert("Login Error " + error);
        });
    };
    */
    
    const handleSubmit = (e) => {

        e.preventDefault();
        //console.log(email );
        //console.log(pass);





        fetch('http://127.0.0.1:8000/userlogin', {
            method: 'POST',
            body: JSON.stringify({
              // Add parameters here
              'Email' : email,
              'Password' : pass
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
                /*
                if response.body= {

                    Navigate("/profile", { state: data })
                }
                */



                // Handle data
             })
             .catch((err) => {
                console.log(err.message);
             })

    }



    
    
    
    return (
       
      
      
        <div className="auth-form-container">
            <h2>Giriş</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>

                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Lütfen mailinizi giriniz" id="email" name="email" required/>
                <label htmlFor="password">Şifre</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required/>

                {errorMessage === '' ? null :
                    <span style={{
                      fontWeight: 'bold',
                      color: 'red', 
                      
                    }}>{errorMessage}<br/></span> }
                
                <button type="submit" >Giriş</button>
                
            </form>

            <Link to= "/register"><button className = "link-btn" >Hesabınız yok mu? Üye olun.</button></Link>
        </div>
       
       

        
    )
   
}