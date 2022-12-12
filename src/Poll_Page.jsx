//import Navbar from "./Navbar"
import { Link, useNavigate  } from 'react-router-dom'
import {Q} from './Poll_Create'
import {OPTION_LIST} from './Poll_Create'
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



async function Get_Poll()
{
    console.log(base_url+ "/poll/index")
    let response = await fetch(base_url +'/poll/index', {

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

async function Update_Poll(question, voteAnswer)
{
    console.log("Question is:",question)
    await fetch(base_url +'/poll/update', {
      method: 'POST',
      body: JSON.stringify({
        // Add parameters here
        'question' : question.question_text,
        'username' : ReactSession.get("username"),
        'choice' : voteAnswer,
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



export default function PollPage () {
    const [selected_choice, setSelectedChoice] = useState('')
    const {data, status} = useQuery(["Questions"], Get_Poll)
    //var data = Get_Poll();
    console.log("Line 39: ", typeof(data))

    const Navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault();
        Navigate("/poll_create");
    }

    function PollCard(question) {

        const handleChange = (event) => {
          event.preventDefault();
          setSelectedChoice(event.target.value)
        }
        //var selected_choice = ""
        return (
          <MDBContainer>
            <MDBRow className="justify-content-center">
              <MDBCol size="6">
                <MDBCard>
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
                      <button onClick={selected_choice !== "" ? (e) =>  handleVote(e,selected_choice,question) : undefined}>Submit</button>
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
    
    const handleVote = (e,voteAnswer,question) => {
        e.preventDefault();
        console.log("Data???",voteAnswer)
        //console.log("i:", i)
        //console.log("data[i]:", data[i])
        Update_Poll(question, voteAnswer)

    }


    return (

            ReactSession.get("username") === undefined ? <h>PLEASE LOGIN FIRST</h> :


            <form role="form" onSubmit={handleSubmit}>

                { ReactSession.get("is_moderator") === true &&
                <div>

                    <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Create Poll</button>



                </div>
                }

        

                <div>


                    { status==="loading" && <div>Loading data</div>}
                    { status==="error" && <div>Error fetching</div>}
                    {
                        status=== "success" &&(
                                <div>
                                    {
                                        data.map( (x, i)=>
                                        {
                                           
                                            return(
                                                    

                                                    <div className="row mb-3">
                                                        <div class="form-group col-md-4">
                                                            <br></br>
                                                            {PollCard(data[i])}
                                                            {/*<button onClick={handleVote(selected_choice,i)}>Submit Answer</button>*/}
                                                            {ReactSession.get("is_moderator") === true&&<button onClick={e => handleEnd(e,i)}>End Poll</button>}
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