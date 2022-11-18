import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import './App.css';
import { useQuery } from "react-query";
//import Item from 'react-css-grid'
import 'bootstrap/dist/css/bootstrap.min.css';

const dummyList = [{HomeTeam:"Trabzonspor", AwayTeam:"Fenerbahçe", MatchDate:"14 March"} ]

async function Get_Fixture()
{
  let response = await fetch('http://127.0.0.1:8000/fixture/fixtureShow', {
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



export default function Fixture(){

    const {data, status} = useQuery(["Fixture"], Get_Fixture)
    console.log(data)
    return (

        <div>
            { status==="loading" && <div></div>}

            { status==="error" && <div>Error fetching</div>}
        
            {status === "success" &&
                    <Stack direction="horizontal" gap={2}>
                        {
                                data.map(element => {
                                    return(

                                        <Card className="bg-light border" style={{height:"60px", width: "5000px"} }>
                                            {element.HomeTeam}-{element.AwayTeam}
                                            <br></br>
                                            {element.MatchDate}
                                        </Card>

                                    );
                                })
                            
                        }
            
                    </Stack>
            }
        </div>
        
        


                   
        

    )
}

