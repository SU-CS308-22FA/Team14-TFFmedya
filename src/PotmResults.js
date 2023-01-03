import React from 'react'
import "./players_of_month.css"



const PotmResults =  ({ data }) =>  {


   
 
    return (
      
        <div>
           <br></br> 
          <h1>Sizlerin Seçimiyle Ayın 11'i</h1>
          <br></br>
          <div>
        
            <div className="pitch">
               {/* Goalkeeper */}
               
               <div className="player" style={{ top: "20px", left: "43%" }}>GK</div>
               <div className='playerNames' style={{ top: "120px", left: "43%" }} > {data["GK"][2]} </div>
            
         
               {/* Defense */}
               <div className="player" style={{ top: "200px", left: "20px" }}>RB</div>
               <div className='playerNames' style={{ top: "300px", left: "20px" }} >{data["RB"][2]} </div>
               <div className="player" style={{ top: "170px", left: "30%" }}>CB</div>
               <div className='playerNames' style={{ top: "270px", left: "30%" }} >{data["CB1"][2]} </div>
               <div className="player" style={{ top: "170px", left: "56%" }}>CB</div>
               <div className='playerNames' style={{ top: "270px", left: "56%" }} > {data["CB2"][2]} </div>
               <div className="player" style={{ top: "200px", right: "20px" }}>LB</div>
               <div className='playerNames' style={{ top: "300px", right: "20px" }} > {data["LB"][2]} </div>
            
               {/* Midfield */}
               <div className="player" style={{ top: "340px", left: "30%" }}>DM</div>
               <div className='playerNames' style={{ top: "440px", left: "30%" }} > {data["DM1"][2]} </div>
               <div className="player" style={{ top: "340px", right: "30%" }}>DM</div>
               <div className='playerNames' style={{ top: "440px", right: "30%" }} > {data["DM2"][2]} </div>
               {/* Attack */}
               <div className="player" style={{ top: "550px", left: "3%" }}>RW</div>
               <div className='playerNames' style={{ top: "650px", left: "3%" }} > {data["RW"][2]} </div>
               <div className="player" style={{ top: "500px", left: "43%" }}>CAM</div>
               <div className='playerNames' style={{ top: "600px", left: "43%" }} > {data["CAM"][2]} </div>
               <div className="player" style={{ top: "550px", right: "3%" }}>LW</div>
               <div className='playerNames' style={{ top: "650px", right: "3%" }} > {data["LW"][2]} </div>
               {/* Forward */}
               <div className="player" style={{ top: "700px", left: "43%" }}>CF</div>
               <div className='playerNames' style={{ top: "800px", left : "43%" }} > {data["CF"][2]} </div>
               
            </div>
        
        
          
         
        </div>
      </div>  
        
      )
}

  
  export default PotmResults;