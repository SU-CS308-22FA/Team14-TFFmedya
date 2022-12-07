//import Navbar from "./Navbar"
import { Link, useNavigate  } from 'react-router-dom'
import {Q} from './Poll_Create'
import {OPTION_LIST} from './Poll_Create'
import Poll from 'react-polls';
import {useQuery} from "react-query"
import { ReactSession } from 'react-client-session'



var QQ = "lol"
async function Get_Poll()
{
    let response = await fetch('https://tffmedya-backend.herokuapp.com/poll/index', {
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

async function Update_Poll(question)
{
    let response = await fetch('https://tffmedya-backend.herokuapp.com/poll/update', {
      method: 'POST',
      body: JSON.stringify({
        // Add parameters here
        'question_text' : question.question_text,
        'pub_date' : question.pub_date,
        'choices' : question.choices,
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
              // Handle data
          })
          .catch((err) => {
          console.log(err.message);
          })*/
    return response.json()

}



export default function PollPage () {

    const {data, status} = useQuery(["Questions"], Get_Poll)
    //var data = Get_Poll();
    console.log("Line 39: ", typeof(data))

    const Navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault();
        Navigate("/poll_create");
    }


    //var data = Get_Poll();
    

    
    const handleVote = (voteAnswer,i) => {
        //const {d} = this.state
        console.log("Data???",voteAnswer)
        console.log("i:", i)
        const newPollAnswers = data[i].choices.map(answer => {
          if (answer.option === voteAnswer) answer.votes++
          console.log("votes:",answer, answer.votes)
          return answer
        })
        //console.log("Bu ne",data)
        Update_Poll(data[i])


        /*
        this.setState({
        d: newPollAnswers

        })
        console.log(data[0])
        */

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
                                                            <Poll question={data[i].question_text} answers={data[i].choices} onVote={(b) => handleVote(b,i)}/>
                                                        </div>
                                                    </div>
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