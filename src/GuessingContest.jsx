//import Navbar from "./Navbar"
import { Link, useNavigate  } from 'react-router-dom'
import {Q} from './Contest_Create'
import {OPTION_LIST} from './Contest_Create'
import Poll from 'react-polls';
import {useQuery} from "react-query"
import { ReactSession } from 'react-client-session'
import {base_url} from "./constants"
//import PollCard from './PollCard';
import React, {useState} from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";



async function Get_Contest()
{
    console.log(base_url+ "/guessingcontest/guesscontestshow")
    let response = await fetch(base_url +'/guessingcontest/guesscontestshow', {

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
              // Handle data
          })
          .catch((err) => {
          console.log(err.message);
          })*/
    return response.json()

}

async function Update_Contest(question, guessAnswer)
{
    console.log("Question is:",question)
    await fetch(base_url +'/guessingcontest/voteUpdate', {
      method: 'POST',
      body: JSON.stringify({
        // Add parameters here
        'question' : question.question_text,
        'username' : ReactSession.get("username"),
        'choice' : guessAnswer,
      }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
      })
      
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              
              // Handle data
          })
          .catch((err) => {
          console.log(err.message);
          })
    //return response.json()

}

export default function GuessingContestPage () {
    const [selected_choice, setSelectedChoice] = useState('')
    const {data, status} = useQuery(["Questions"], Get_Contest)
    //var data = Get_Poll();
    console.log("Line 39: ", typeof(data))

    const Navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault();
        Navigate("/contest_create");
    }

    function ContestCard(question) {

        const handleChange = (event) => {
          event.preventDefault();
          setSelectedChoice(event.target.value)
        }
        //var selected_choice = ""
        return (
          <MDBContainer>
            <MDBRow className="justify-content-center">
              <MDBCol size="6">
                <MDBCard style={{color : "green", backgroundColor : "orange"}}>
                  <MDBCardBody>
                    <div className="text-center">
                      <MDBIcon far icon="file-alt mb-3 text-primary" size="4x" />
                      
                      <p style={{color:'black'}}>
                        {question.question_text}
                        
                      </p>
                    </div>
      
                    <hr />
      
                    <form className="px-4" action="">
                      <p className="text-center">
                        <strong>Your Answer:</strong>
                      </p>
                      {
                        question.choices.map((choice, i) => {
                          return(
                            <div>
                              <input 
                              type="radio"
                              value={choice.option}
                              checked={selected_choice === choice.option}
                              onChange={handleChange}
                              name="choice" /> {choice.option} 
                            </div>
                          )
                        })
                      }
                      
                    </form>
                    
                  </MDBCardBody>
                  {
                  <MDBCardFooter>
                    <div className="text-end">
                      <button onClick={selected_choice !== "" ? (e) =>  handleGuess(e,selected_choice,question) : undefined}>Submit</button>
                    </div>
                  </MDBCardFooter>
                    }
                </MDBCard>
              </MDBCol>
            </MDBRow>
                    </MDBContainer>
        );
      }

    //var data = Get_Poll();
    
    const handleEnd = (e,i) => {
        e.preventDefault();
        data[i].isActive = false
        //Update_Poll(data[i])

    }
    
    const handleGuess = (e,guessAnswer,question) => {
        e.preventDefault();
        console.log("Data???",guessAnswer)
        //console.log("i:", i)
        //console.log("data[i]:", data[i])
        Update_Contest(question, guessAnswer)

    }


    return (

            ReactSession.get("username") === undefined ? <h>PLEASE LOGIN FIRST</h> :


            <form role="form" onSubmit={handleSubmit}>

                { ReactSession.get("is_moderator") === true &&
                <div>

                    <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Create Contest</button>



                </div>
                }

        

                <div>


                    { status==="loading" && <div>Loading data</div>}
                    { status==="error" && <div>Error fetching</div>}
                    {
                        status=== "success" &&(
                                <div>
                                    <br/>
                                    <h1 className='leaderboard'>Contests</h1>
                                    {
                                        data.map( (x, i)=>
                                        {
                                           
                                            return(
                                                    

                                                    <div className="row mb-3">
                                                        <div class="form-group col-md-4">
                                                            <br></br>
                                                            {ContestCard(data[i])}
                                                            {/*<button onClick={handleVote(selected_choice,i)}>Submit Answer</button>*/}
                                                            {/*ReactSession.get("is_moderator") === true&&<button onClick={e => handleEnd(e,i)}>End Poll</button>*/}
                                                        </div>
                                                    </div>
                                                    // <div className="row mb-3">
                                                    //     <div class="form-group col-md-4">
                                                    //         <br></br>
                                                    //         <Poll noStorage = {true} question={data[i].question_text} answers={data[i].choices} onVote={(b) => handleVote(b,i)}/>
                                                    //         {ReactSession.get("is_moderator") === true&&<button onClick={e => handleEnd(e,i)}>End Poll</button>}
                                                    //     </div>
                                                    // </div>
                                                    );
                                        })
                                    }
                                </div>
                                )
                    }
                </div>
            </form>
            )
}