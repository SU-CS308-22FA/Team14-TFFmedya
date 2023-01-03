import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {ReactSession} from 'react-client-session'
import logo from "./images/logo.png"

export default function Navbar(){
   
    return(
        
    <nav className="nav">
        
        <ul> 
            <CustomLink to = "/" > <img src={logo}  style={{
            height: "50px",
            width : "60px"
               }}
            /> </ CustomLink>
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/register">Register</CustomLink>
            <CustomLink to="/standings">Standings</CustomLink>



        </ul>
    </nav>
    )
} 

function CustomLink({to,children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true   })

    return(
            <li className={isActive ? "active" : ""}>
                <Link to={to} {...props}>{children}</Link>
            </li>
            )
}