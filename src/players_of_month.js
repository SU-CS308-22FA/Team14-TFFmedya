import React from 'react'
import "./players_of_month.css"
import Select from "react-select"

const PlayersOfMonth = () => {
    const GKoptions = [
       {value: "muslera" ,label : "Fernando Muslera"},
       {value: "bayindir" ,label : "Altay Bayındır"},
       {value: "cakir" ,label : "Uğurcan Çakır"} 
    ]
    const LBoptions = [
       {value: "hasan" ,label : "Hasan Ali Kaldırım"},
       {value: "boey" ,label : "Sacha Boey"},
       {value: "ali" ,label : "Alioski"} 
    ]
    const RBoptions = [
        {value: "ferdi" ,label : "Ferdi Kadıoğlu"},
        {value: "rosier" ,label : "Valentin Rosier"},
        {value: "dubois" ,label : "Léo Dubois"} 
     ]
     const CB1options = [
        {value: "sanuc" ,label : "Tayyip Sanuc"},
        {value: "bardakci" ,label : "Abdülkerim Bardakci"},
        {value: "marc" ,label : "Marc Bartra"} 
     ]
     const CB2options = [
        {value: "szalai" ,label : "Attila Szalai"},
        {value: "nelsson" ,label : "Victor Nelsson"},
        {value: "hugo" ,label : "Vitor Hugo"} 
     ]
     const DM1options = [
        {value: "crespo" ,label : "Miguel Crespo"},
        {value: "toköz" ,label : "Dorukhan Toköz"},
        {value: "sergio" ,label : "Sérgio Oliveira"} 
     ]
     const DM2options = [
        {value: "Zajc" ,label : "Miha Zajc"},
        {value: "Fernandes" ,label : "Gedson Fernandes"},
        {value: "berkan" ,label : "Berkan Kutlu"} 
     ]
     const LWoptions = [
        {value: "rossi" ,label : "Diego Rossi"},
        {value: "kerem" ,label : "Kerem Aktürkoglu"},
        {value: "redmond" ,label : "Nathan Redmond"} 
     ]
     const RWoptions = [
        {value: "akgün" ,label : "Yunus Akgün"},
        {value: "ghezzal" ,label : "Rachid Ghezzal"},
        {value: "visca" ,label : "Edin Visca"} 
     ]
     const CAMoptions = [
        {value: "yusuf" ,label : "Yusuf Yazici"},
        {value: "dele" ,label : "Dele Alli"},
        {value: "güler" ,label : "Arda Güler"} 
     ]
     const CFoptions = [
        {value: "mauro" ,label : "Mauro Icardi"},
        {value: "weghorst" ,label : "Wout Weghorst"},
        {value: "batshuayi" ,label : "Michy Batshuayi"} 
     ]
    const handleChange = (selectedOption) => {                      //bunu selectedOption listesi olarak tutmalıyım.
        console.log("handleChange", selectedOption)
    }
    return (
        <div>
           <br></br> 
          <h1>Ayın 11'i Adaylarınızı Seçiniz</h1>
          <br></br>
          <div className="pitch">
            {/* Goalkeeper */}
            
            <div className="player" style={{ top: "20px", left: "43%" }}>GK</div>
            <div className='playerNames' style={{ top: "120px", left: "43%" }} > <Select options={GKoptions} onChange={handleChange}/> </div>
           
        
            {/* Defense */}
            <div className="player" style={{ top: "200px", left: "20px" }}>RB</div>
            <div className='playerNames' style={{ top: "300px", left: "20px" }} > <Select options={RBoptions} onChange={handleChange}/> </div>
            <div className="player" style={{ top: "170px", left: "30%" }}>CB</div>
            <div className='playerNames' style={{ top: "270px", left: "30%" }} > <Select options={CB1options} onChange={handleChange}/> </div>
            <div className="player" style={{ top: "170px", left: "56%" }}>CB</div>
            <div className='playerNames' style={{ top: "270px", left: "56%" }} > <Select options={CB2options} onChange={handleChange}/> </div>
            <div className="player" style={{ top: "200px", right: "20px" }}>LB</div>
            <div className='playerNames' style={{ top: "300px", right: "20px" }} > <Select options={LBoptions} onChange={handleChange}/> </div>
           
            {/* Midfield */}
            <div className="player" style={{ top: "340px", left: "30%" }}>DM</div>
            <div className='playerNames' style={{ top: "440px", left: "30%" }} > <Select options={DM1options} onChange={handleChange}/> </div>
            <div className="player" style={{ top: "340px", right: "30%" }}>DM</div>
            <div className='playerNames' style={{ top: "440px", right: "30%" }} > <Select options={DM2options} onChange={handleChange}/> </div>
            {/* Attack */}
            <div className="player" style={{ top: "550px", left: "3%" }}>RW</div>
            <div className='playerNames' style={{ top: "650px", left: "3%" }} > <Select options={RWoptions} onChange={handleChange}/> </div>
            <div className="player" style={{ top: "500px", left: "43%" }}>CAM</div>
            <div className='playerNames' style={{ top: "600px", left: "43%" }} > <Select options={CAMoptions} onChange={handleChange}/> </div>
            <div className="player" style={{ top: "550px", right: "3%" }}>LW</div>
            <div className='playerNames' style={{ top: "650px", right: "3%" }} > <Select options={LWoptions} onChange={handleChange}/> </div>
            {/* Forward */}
            <div className="player" style={{ top: "700px", left: "43%" }}>CF</div>
            <div className='playerNames' style={{ top: "800px", left : "43%" }} > <Select options={CFoptions} onChange={handleChange}/> </div>
            
          </div>
          <br></br>
          <button> Oyuncuları Seç </button>   {/* bunun için form oluşturmalıyım */}
        </div>
        
      );
    };

  
  export default PlayersOfMonth;