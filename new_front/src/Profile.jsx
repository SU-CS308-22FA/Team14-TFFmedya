import React, { useState } from "react";
import {Link, useLocation} from "react-router-dom";
//import { ReactSession } from "redux-react-session"
import UserContext from "./utils/UserContext";
import { useContext } from "react";
import Login from "./Login";
import Register from "./Register";


export default function Profile (){


    const melih = useLocation().state;
    console.log(melih);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass_repeat, setPass_repeat] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(surname);
        console.log(username);
        console.log(email);
        console.log(pass);
        console.log(pass_repeat);
        
        //window.location.href = "/login";

    }
    

    const handleDeletion = (e) => {
        e.preventDefault();
    

        fetch('http://127.0.0.1:8000/api/auth/register/', {
            method: 'POST',
            body: JSON.stringify({
                // Add parameters here
                'email' : email,
                'password' : pass,
                'firstname' : name,
                'lastname' : surname,
                'username' : username
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
                .then((response) => response.json())
                .then((data) => {
                console.log(data);
                // Handle data
                
                })
            
                .catch((err) => {
                console.log(err.message);
                })

        //window.location.href = "/login";

    }   

    return (
        
        
          
        <div className="auth-form-container">
            <h2>Profiliniz</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">İsim</label>
            <input value={name} onChange={(e) => setName(e.target.value)}type="name" placeholder="İsim" id="name" name="name" />
            <label htmlFor="surname">Soyisim</label>
            <input value={surname} onChange={(e) => setSurname(e.target.value)}type="surname" placeholder="Soyisim" id="surname" name="surname" />
            <label htmlFor="username">Kullanıcı İsmi</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="Kullanıcı Adı" id="username" name="username"/>
            <label htmlFor="password">Şifre</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" >Düzenle</button>
            
        </form>
        <p></p>
        <button type="submit" /*onClick={handleDeletion()}*/ >Profilimi sil</button>
            
        
    </div>
   
    )
}

