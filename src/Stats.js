import './Stats.css';
import {base_url} from "./constants"
import { Link, useNavigate,  useLocation } from 'react-router-dom'
import {useQuery} from "react-query"
// Example of a data array that
// you might receive from an API
var team1 = "Ankaragücü"
var team2 = "Ümraniyespor"
const d = [
  { statistics1: { total_sut: 15, isabetli_sut: 6, topla_oynama: "%47", pas:383, pas_isabeti:"%66", faul:14}, 
   statisctics2:{ total_sut: 12, isabetli_sut: 8, topla_oynama: "%53", pas:426, pas_isabeti:"%69", faul:14}},
   
]




export function Stats() {

  async function Get_Stats()
  {
    console.log("Lololol");
    var h = hometeam.slice(0, -1);

    var d = awayteam.slice(1);
    console.log("h:", h, " d:", d)
    let response = await fetch(base_url +'/stat/statshow', {
      
      method: 'POST',
      body: JSON.stringify({
        // Add parameters here
        
        'evsahibi':h,
        'deplasman':d,
      }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
          
      },

      })
        /*
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              console.log(data[0].choices[0].option);
              return data;
              // Handle data
          })

          .catch((err) => {
          console.log(err.message);
          })*/
    //console.log("RRR",response.json());
    return response.json()
  }
  function StatTable(stat){
    var d = Object.keys(stat)
  
    console.log("d is:", d)
    
      
        return(

                        <table>
                        <tr>
                          
                        <th>{stat.HomeTeam}</th>
                        <th>Statistics</th>
                        <th>{stat.AwayTeam}</th>
                        </tr>

                    
                  
                        <tr >
                          
                          <td>{stat.GolHome}</td>
                          <td>{Object.keys(data)[2].split("Home")}</td>
                          <td>{stat.GolAway}</td>
                         
                        </tr>
                        <tr >
                          
                          <td>{stat.ToplaOynamaHome}</td>
                          <td>{Object.keys(data)[4].split("Home")}</td>
                          <td>{stat.ToplaOynamaAway}</td>
                         
                        </tr>
                        <tr >
                          
                          <td>{stat.ToplamSutHome}</td>
                          <td>{Object.keys(data)[6].split("Home")}</td>
                          <td>{stat.ToplamSutAway}</td>
                         
                        </tr>
                        <tr >
                          
                          <td>{stat.IsabetliSutHome}</td>
                          <td>{Object.keys(data)[8].split("Home")}</td>
                          <td>{stat.IsabetliSutAway}</td>
                         
                        </tr>
                        <tr >
                          
                          <td>{stat.BasariliPaslarHome}</td>
                          <td>{Object.keys(data)[10].split("Home")}</td>
                          <td>{stat.BasariliPaslarAway}</td>
                         
                        </tr>
                        <tr >
                          
                          <td>{stat.BasariliPasYuzdesiHome}</td>
                          <td>{Object.keys(data)[12].split("Home")}</td>
                          <td>{stat.BasariliPasYuzdesiAway}</td>
                         
                        </tr>
                        <tr >
                          
                          <td>{stat.KornerHome}</td>
                          <td>{Object.keys(data)[14].split("Home")}</td>
                          <td>{stat.KornerAway}</td>
                         
                        </tr>
                        <tr >
                          
                          <td>{stat.OrtaSayisiHome}</td>
                          <td>{Object.keys(data)[16].split("Home")}</td>
                          <td>{stat.OrtaSayisiAway}</td>
                         
                        </tr>
                        <tr >
                          
                          <td>{stat.FaullerHome}</td>
                          <td>{Object.keys(data)[18].split("Home")}</td>
                          <td>{stat.FaullerAway}</td>
                         
                        </tr>
                      
                      
                    
                  
                      </table>   
    )}
    
  

  const location = useLocation()
  const info= location.state
  console.log("Info on stats", info)
  const awayteam = info.awayteam
  const hometeam = info.hometeam
  console.log("homeworn is", hometeam)
  const {data, status} = useQuery(["Stats"], Get_Stats)
  console.log("status is", status)






  return (

    <div className="Stats">
    { status==="loading" && <div>Loading data</div>}
    { status==="error" && <div>Error fetching</div>}
              
    {status === "success" && 
                    
                    StatTable(data)
                  
                    /*<table>
                    {console.log(data)}
                    <tr>
                      
                      <th>{data.HomeTeam}</th>
                      <th>Statistics</th>
                      <th>{data.AwayTeam}</th>
                    </tr>

                    
                   
                        <tr >
                          
                          <td>{Object.keys(data)[0]}</td>
                          

                          <td>{}</td>
                          <td>{Object.keys(data)[1]}</td>
                          <td>{}</td>
                    </tr>
                    </table>
                  */
                  
                  
                    
                  
                    
                  
    }
     
    </div>
  );
}
  
export default Stats;