import {base_url} from "./constants"
import { ReactSession } from 'react-client-session'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";



export default function ModPage () {

    const [loading, setLoading] = useState(false);
    const [loadingpotm, setLoadingPotm] = useState(false);
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

    function handleClickContent(){

        window.location.href = "/createcontent"
    }
    async function handleClickPotm(){
        setLoadingPotm(true);
        let response  = await fetch(base_url+'/poll/endpotm', {
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
        console.log(response.json())    
        setLoadingPotm(false)    
        window.location.href = "/playersofmonth"   
        
    }
    


    return(
        <div>
            { ReactSession.get("is_moderator") === true &&
            <div>

                <button style = { {marginTop :"50px" }} onClick={handleSubmit}>{loading ? <>Loading..</> : <>Refresh Standings</>}</button>
                <br></br>
                <button style = { {marginTop :"50px" }} onClick={handleClickContent}>Create Content</button>
                <br></br>
                <button style = { {marginTop :"50px" }} onClick={handleClickPotm}>{loadingpotm ? <>Loading..</> : <>End Potm</>}</button>

            </div> 
            }
        </div>
    )
}