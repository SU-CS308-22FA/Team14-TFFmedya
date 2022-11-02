import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { UserProvider } from './utils/UserContext'


//import { UserContext } from './utils/UserContext'
//import { loginUser, setAxiosAuthToken, setToken, getCurrentUser, unsetCurrentUser } from './services/auth';

export default function Login()  {
    
    const Navigate = useNavigate()
    const melih = "malmelih"
    //const [user, setUser] =useState("Select User");
   // const handleData = (data) => { setUser(data) } ; console.log(user);

    
    
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
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
        console.log(email );
        console.log(pass);
        Navigate("/profile", { state: melih })

        
       

        /*fetch('http://127.0.0.1:8000/api/auth/login/', {
            method: 'POST',
            body: JSON.stringify({
              // Add parameters here
              'email' : email,
              'password' : pass
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                
                <UserProvider
                value={
                user={user}}
                handleChangeUser={setUser}
                handleData={handleData}
                >
                </UserProvider>
               
                Navigate("/profile", { state: data })
                // Handle data
             })
             .catch((err) => {
                console.log(err.message);
             })
             */
    }



    
    
    
    return (
       
      
      
        <div className="auth-form-container">
            <h2>Giriş</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>

                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Lütfen mailinizi giriniz" id="email" name="email" required/>
                <label htmlFor="password">Şifre</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required/>
                <button type="submit" >Giriş</button>
                
            </form>

            <Link to= "/register"><button className = "link-btn" >Hesabınız yok mu? Üye olun.</button></Link>
        </div>
       
       

        
    )
   
}