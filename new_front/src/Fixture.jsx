import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { useQuery } from "react-query";
import { Link, useNavigate,  useLocation } from 'react-router-dom'

import './Fixture.css';
//import Item from 'react-css-grid'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {base_url} from "./constants"

const dummyList = [{HomeTeam:"Trabzonspor", AwayTeam:"Fenerbahçe", MatchDate:"14 March"} ]

async function Get_Fixture()
{
    let response = await fetch(base_url +'/fixture/fixtureShow', {
      method: 'POST',
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
    //console.log(response.json());
    return response.json();

}

const CreateEvaluations = (e,element) => {

    //e.preventDefault();
    //var match = "Corendon Alanyaspor - Adana Demirspor";
    var question = "Bu maç için yorumlarınız neler?";
    

    
    fetch(base_url+'/matchreview/create', {
        method: 'POST',
        body: JSON.stringify({
          // Add parameters here
          'Evaluation_question' : question,
          'match' : element.HomeTeam + " - " + element.AwayTeam,
          'match_date': element.MatchDate,
          'comments' : []
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
         })
         .catch((err) => {
            console.log(err.message);
         })

}

const handleClick = (e, element, Navigate) => {

    e.preventDefault();
    CreateEvaluations(e, element);
    const m = {match: element.HomeTeam + " - " + element.AwayTeam, match_date:element.MatchDate}
    Navigate("/matchreview", {state : m});
    
}




export default function Fixture(){
    //CreateEvaluations();
    const Navigate = useNavigate()
    const {data, status} = useQuery(["Fixture"], Get_Fixture)
    //console.log(data)
    return (

        <div class = 'container'>
            { status==="loading" && <div></div>}

            { status==="error" && <div>Error fetching</div>}
        
            { status === "success" &&
                    <ul class="cards">
                        {
                                data.map(element => {
                                    return(
                                        <li class = "card" onClick={e => handleClick(e, element, Navigate)}>
                                            <div>
                                            <h3 class="card-title">{element.MatchDate}</h3>
                                            <div class="card-content">
                                                <p >
                                                    {element.HomeTeam} - {element.AwayTeam}
                                                </p>
                                            </div>
                                            </div>
                                        </li>
                                    );
                                })
                        }
            
                    </ul>
            }
        </div>
    )
}

