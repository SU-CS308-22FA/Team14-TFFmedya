import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {ReactSession} from 'react-client-session'
import logo from "./images/logo.png"

export default function Navbar(){
   
    return(
        
    <nav className="nav">
        
        <ul> 
            <CustomLink to = "/" > <img src= {logo}  style={{
            height: "50px",
            width : "60px"
                }}
            /> </ CustomLink>
            <CustomLink to="/profile">Profile</CustomLink>
            <CustomLink to="/poll">Polls</CustomLink>
            <CustomLink to="/pollresults">Poll Results</CustomLink>
            <CustomLink to="/contest">Contests</CustomLink>
            <CustomLink to="/leaderboard">Leaderboard</CustomLink>
            <CustomLink to="/standings">Standings</CustomLink>
            {ReactSession.get("is_moderator") === true &&(
                <CustomLink to="/modpage" >Moderator Page</CustomLink>
            )}       
            <CustomLink to="/logout">Logout</CustomLink>
            
            
        
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