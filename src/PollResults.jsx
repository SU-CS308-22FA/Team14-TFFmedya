import {base_url} from "./constants"
import Card from 'react-bootstrap/Card';
import {useQuery} from "react-query"
import BarChart from 'react-easy-bar-chart';

export default function PollResults () {


    const {data, status} = useQuery(["Polls"], GetEndedPolls)
    //var data = []
    async function GetEndedPolls()
    {
        //console.log(base_url+ "/poll/getresults")
        let response = await fetch(base_url +'/poll/index', {

        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        /*
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            
            return(result)

            // Handle data
        })
        .catch((err) => {
        console.log(err.message);
        })*/
       
        return response.json()

    }

    function getResultCard(polls)
    {
        console.log(polls)
        var poll_data = []
        for (var poll in polls["choices"])
        {
            console.log("Poll",poll)
            var d = {}
            d["title"] = polls["choices"][poll]["option"]
            d["value"] = 15 //polls["choices"][poll]["vote"]
            d["color"] =  "#add9c0"
            poll_data.push(d)
        }
        console.log(poll_data)

        return(
            <div>
            <header>
              <h1>React Bar Chart!</h1>
            </header>
            <BarChart 
              xAxis={polls["question_text"]}
              yAxis="Values"
              height={400}
              width={800}
              data={poll_data}
            />
          </div>
        )

        /*
        polls.map((x,i) =>{
            return(
                
                <div className="row mb-3">
                <div class="form-group col-md-4">
                    <br></br>
                    <li class = "card" >
                            <div>
                        
                            <div class="card-content">
                                <p >
                                    {polls[i].option}
                                </p>
                            </div>
                            </div>
                    </li>
                    
                    {/*<button onClick={handleVote(selected_choice,i)}>Submit Answer</button>}
                </div>
            </div>


                );
            })
        */



    }

    

    return (
        
        
        <div>
            <h2>results</h2>
            { status==="loading" && <div>Loading data</div>}
            { status==="error" && <div>Error fetching</div>}
            {status === "success" && 
            
                data.map( (x, i)=> {
                                            
                    return(
                            <div className="row mb-3">
                                <div class="form-group col-md-4">
                                    <br></br>
                                    <li class = "card" >
                                            <div>
                                        
                                            <div class="card-content" style={{backgroundColor : "orange"}}>
                                                <p >
                                                    {getResultCard(data[i])}
                                                </p>
                                            </div>
                                            </div>
                                    </li>
                                    
                                    {/*<button onClick={handleVote(selected_choice,i)}>Submit Answer</button>*/}
                                </div>
                            </div>
                            );
                })
            }
         
        </div> 
    )   
}