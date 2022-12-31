import {base_url} from "./constants"
import { ReactSession } from 'react-client-session'
import {useState} from 'react'


export default function ModPage () {

    const [loading, setLoading] = useState(false);
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
    


    return(
        <div>
            { ReactSession.get("is_moderator") === true &&
            <div>

                <button style = { {marginTop :"50px" }} onClick={handleSubmit}>{loading ? <>Loading..</> : <>Refresh Standings</>}</button>
                

            </div> 
            }
        </div>
    )
}