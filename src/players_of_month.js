import React, { useState } from 'react'
import "./players_of_month.css"
import Select from "react-select"
import { base_url } from './constants';
import {useQuery} from "react-query"
import { ReactSession } from 'react-client-session'


var choices = {}

async function GetPOTM(){
    

   let response = await fetch(base_url+'/poll/getpotm', {
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

const PlayersOfMonth = () => {

   const [loading, setLoading] = useState(false);

  

   
    const {data, status} = useQuery(["POTM"], GetPOTM)


   
    
  

    const [errorMessage, setErrorMessage] = useState('')
    let GKoptions = [
         
    ]
    let LBoptions = [
      
    ]
    let RBoptions = [
       
     ]
     let CB1options = [
       
     ]
     let CB2options = [
      
     ]
     let DM1options = [
       
     ]
     let DM2options = [
       
     ]
     let LWoptions = [
       
     ]
     let RWoptions = [
       
     ]
     let CAMoptions = [
      
     ]
     let CFoptions = [
       
     ]
   



   if(status === "success")
   {
    GKoptions = [
       {value: "GK1" ,label : data["GK"][0]},
       {value: "GK2" ,label : data["GK"][1]},
       {value: "GK3" ,label : data["GK"][2]} 
      ]
      LBoptions = [
       {value: "LB1" ,label : data["LB"][0]},
       {value: "LB2" ,label : data["LB"][1]},
       {value: "LB3" ,label : data["LB"][2]} 
      ]
     RBoptions = [
        {value: "RB1" ,label :data["RB"][0]},
        {value: "RB2" ,label : data["RB"][1]},
        {value: "RB3" ,label :data["RB"][2]} 
     ]
      CB1options = [
        {value: "CB1" ,label : data["CB1"][0]},
        {value: "CB2" ,label : data["CB1"][1]},
        {value: "CB3" ,label : data["CB1"][2]} 
     ]
      CB2options = [
        {value: "CB4" ,label : data["CB2"][0]},
        {value: "CB5" ,label : data["CB2"][1]},
        {value: "CB6" ,label : data["CB2"][2]} 
     ]
      DM1options = [
        {value: "DM1" ,label : data["DM1"][0]},
        {value: "DM2" ,label : data["DM1"][1]},
        {value: "DM3" ,label : data["DM1"][2]} 
     ]
      DM2options = [
        {value: "DM4" ,label : data["DM2"][0]},
        {value: "DM5" ,label : data["DM2"][1]},
        {value: "DM6" ,label : data["DM2"][2]} 
     ]
      LWoptions = [
        {value: "LW1" ,label : data["LW"][0]},
        {value: "LW2" ,label : data["LW"][1]},
        {value: "LW3" ,label : data["LW"][2]} 
     ]
      RWoptions = [
        {value: "RW1" ,label :  data["RW"][0]},
        {value: "RW2" ,label :  data["RW"][1]},
        {value: "RW3" ,label :  data["RW"][2]} 
     ]
      CAMoptions = [
        {value: "CAM1" ,label :  data["CAM"][0]},
        {value: "CAM2" ,label : data["CAM"][1]},
        {value: "CAM3" ,label :  data["CAM"][2]} 
     ]
      CFoptions = [
        {value: "CF1" ,label : data["CF"][0]},
        {value: "CF2" ,label :data["CF"][1]},
        {value: "CF3" ,label :data["CF"][2]} 
     ]
   }

    const handleChange = (selectedOption,position) => {  
      choices[position] = selectedOption                    
      console.log("handleChange", selectedOption, position)
   }


   async function handleClick(){
   if(Object.keys(choices).length === 11)  {

      setLoading(true)
      for (const [key, value] of Object.entries(choices)) {
         

         await fetch(base_url+'/poll/update', {
            method: 'POST',
            body: JSON.stringify({
               // Add parameters here
               'question' : key,
               'choice' : value.label,
               'username' : ReactSession.get("username")
             }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
                // Handle data
             .catch((err) => {
                console.log(err.message);
             })
          
         
      };
   
      setLoading(false)
   }
   else
   {
  
      setErrorMessage("11 tane oyuncu seçmeniz gerekiyor.")
   }

   
 }
    return (
      
        <div>
           <br></br> 
          <h1>Ayın 11'i Adaylarınızı Seçiniz</h1>
          <br></br>
          <div>
          { status==="loading" && <div>Loading data</div>}
                    { status==="error" && <div>Error fetching</div>}
                    {
                        status=== "success" &&(
            <div className="pitch">
               {/* Goalkeeper */}
               
               <div className="player" style={{ top: "20px", left: "43%" }}>GK</div>
               <div className='playerNames' style={{ top: "120px", left: "43%" }} > <Select options={GKoptions} onChange={(selectedOption )=> handleChange(selectedOption, "GK")}/> </div>
            
         
               {/* Defense */}
               <div className="player" style={{ top: "200px", left: "20px" }}>RB</div>
               <div className='playerNames' style={{ top: "300px", left: "20px" }} > <Select options={RBoptions} onChange={(selectedOption )=> handleChange(selectedOption, "RB")}/> </div>
               <div className="player" style={{ top: "170px", left: "30%" }}>CB</div>
               <div className='playerNames' style={{ top: "270px", left: "30%" }} > <Select options={CB1options} onChange={(selectedOption )=> handleChange(selectedOption, "CB1")}/> </div>
               <div className="player" style={{ top: "170px", left: "56%" }}>CB</div>
               <div className='playerNames' style={{ top: "270px", left: "56%" }} > <Select options={CB2options} onChange={(selectedOption )=> handleChange(selectedOption, "CB2")}/> </div>
               <div className="player" style={{ top: "200px", right: "20px" }}>LB</div>
               <div className='playerNames' style={{ top: "300px", right: "20px" }} > <Select options={LBoptions} onChange={(selectedOption )=> handleChange(selectedOption, "LB")}/> </div>
            
               {/* Midfield */}
               <div className="player" style={{ top: "340px", left: "30%" }}>DM</div>
               <div className='playerNames' style={{ top: "440px", left: "30%" }} > <Select options={DM1options} onChange={(selectedOption )=> handleChange(selectedOption, "DM1")}/> </div>
               <div className="player" style={{ top: "340px", right: "30%" }}>DM</div>
               <div className='playerNames' style={{ top: "440px", right: "30%" }} > <Select options={DM2options} onChange={(selectedOption )=> handleChange(selectedOption, "DM2")}/> </div>
               {/* Attack */}
               <div className="player" style={{ top: "550px", left: "3%" }}>RW</div>
               <div className='playerNames' style={{ top: "650px", left: "3%" }} > <Select options={RWoptions} onChange={(selectedOption )=> handleChange(selectedOption, "RW")}/> </div>
               <div className="player" style={{ top: "500px", left: "43%" }}>CAM</div>
               <div className='playerNames' style={{ top: "600px", left: "43%" }} > <Select options={CAMoptions} onChange={(selectedOption )=> handleChange(selectedOption, "CAM")}/> </div>
               <div className="player" style={{ top: "550px", right: "3%" }}>LW</div>
               <div className='playerNames' style={{ top: "650px", right: "3%" }} > <Select options={LWoptions} onChange={(selectedOption )=> handleChange(selectedOption, "LW")}/> </div>
               {/* Forward */}
               <div className="player" style={{ top: "700px", left: "43%" }}>CF</div>
               <div className='playerNames' style={{ top: "800px", left : "43%" }} > <Select options={CFoptions} onChange={(selectedOption )=> handleChange(selectedOption, "CF")}/> </div>
               
            </div>
         )}          
         </div>  
          <br></br>
          {errorMessage === '' ? null :
                    <span style={{
                      fontWeight: 'bold',
                      color: 'red', 
                      
                    }}>{errorMessage}<br/></span> }
          
          <button onClick={handleClick}>{loading ? <>Yükleniyor..</> : <>Oyuncuları Seçiniz</>}</button>   {/* bunun için form oluşturmalıyım handlesubmit falan olacak */}
        </div>
        
      );
    };

  
  export default PlayersOfMonth;