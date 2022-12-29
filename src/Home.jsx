//import Navbar from "./Navbar"
import {base_url} from "./constants"
import { ReactSession } from 'react-client-session'


async function handleSubmit() {
    console.log("buradayız melih")
    
    
    await fetch(base_url+'/standings/update', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })


          // Handle data
      .catch((err) => {
          console.log(err.message);
      })    
    window.location.href = "/standings"   
  } 



export default function Home () {
    return (
        <div>

            <h2>home</h2>

            { ReactSession.get("is_moderator") === true &&
            <div>

                <button  onClick={handleSubmit}>Refresh Standings</button>


            </div>
            }

        </div>
    )   
}