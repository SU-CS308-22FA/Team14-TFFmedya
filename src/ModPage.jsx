import {base_url} from "./constants"
import { ReactSession } from 'react-client-session'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";



export default function ModPage () {

    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate()
    async function handleSubmit() {
    setLoading(true);

    await fetch(base_url+'/standings/update', {
        method: 'POST',
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })


            // Handle data
        .catch((err) => {
            console.log(err.message);
            setLoading(false);
        })    
    setLoading(false)    
    window.location.href = "/standings"   
    } 

    function handleClick(){

        window.location.href = "/createcontent"
    }
    


    return(
        <div>
            { ReactSession.get("is_moderator") === true &&
            <div>

                <button style = { {marginTop :"50px" }} onClick={handleSubmit}>{loading ? <>Loading..</> : <>Refresh Standings</>}</button>
                <br></br>
                <button style = { {marginTop :"50px" }} onClick={handleClick}>Create Content</button>

            </div> 
            }
        </div>
    )
}