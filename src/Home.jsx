//import Navbar from "./Navbar"
import { base_url } from './constants';
import ImageSlider from "./ImageSlider";
import {useQuery} from "react-query"



async function GetNews(){
    

  let response = await fetch(base_url+'/content/index', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
          // Handle data
       .catch((err) => {
          console.log(err.message);
       })
  return response.json();     
}


export default function Home () {
  const {data, status} = useQuery(["News"], GetNews)
  let slides = []
  if (status === "success")
  {
    slides = data
  }
  
  const containerStyles = {
    width: "1000px",
    height: "560px",
    margin: "0 auto",
    
  };
 


    return (
     
        <div>
          <h2 style = { {marginTop :"30px" }} > En Güncel Futbol Haberleri</h2>
            { status==="loading" && <div>Loading data</div>}
                    { status==="error" && <div>Error fetching</div>}
                    {
                        status=== "success" &&(
          
            <div> 
             
              <div style={containerStyles} >
                <ImageSlider slides={slides} />
              </div>

            </div>
            )}             
        </div>
    )   
}