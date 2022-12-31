import React, { useState } from 'react'
import { Link, useNavigate,  useLocation, useHref } from 'react-router-dom'
import {base_url} from "./constants"
import { ReactSession } from 'react-client-session'
import {useQuery} from "react-query"
import Stats from './Stats'

/*
async function getComments()
{
    //console.log(base_url+ "/guessingcontest/guesscontestshow")
    let response = await fetch(base_url+'/matchreview/comments', {

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
          })
    return response.json()

}*/






export default function Review () {
  const Navigate = useNavigate()
  
  async function getComments() {
        
    console.log("mmm",match)
    let response = await fetch(base_url+'/matchreview/comments', {
        method: 'POST',
        body: JSON.stringify({
          // Add parameters here

          'match' : match,
          
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        /*
         .then((response) => response.json())
         .then((data) => {
            console.log("Data is:", data.comments);
            const comments = data.comments;
            return comments
  

         })
         .catch((err) => {
            console.log(err.message);
         })*/
     
      return response.json();
        
  }
  const [comment, setComment] = useState('')


  const CreateComment = (e) => {

  e.preventDefault()
  console.log(comment)
  var ev = {'Evaluation_question':'', 'match': "", 'comments': ""}
  fetch(base_url+'/matchreview/createcomment', {
      method: 'POST',
      body: JSON.stringify({
        // Add parameters here
        'comment_text' : comment,
        'match': match,
        'match_date': match_date,
        'user': ReactSession.get("username")
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
        .then((response) => response.json())
        .then((data) => {
          console.log("XX",data);
          /*
          if (data === "Question Added Successfully") {

              Navigate("/poll", { state: data })
          }
          else {
              
              setErrorMessage("Could not create the poll")

          }*/

        })
        .catch((err) => {
          console.log(err.message);
        })

    }


    const location = useLocation()
    const info= location.state
    console.log("info is", info)
    const match = info.match
    const match_date = info.match_date
    const {data, status} = useQuery(["Comments"], getComments)
    console.log("type of info ",typeof(data))
    console.log(status)
    //console.log("status", status)

    const handleSubmit = (e) => {

      e.preventDefault();
      const teams = match.split("-")
      var hometeam = teams[0]
      var awayteam = teams[1]
      console.log("Team1 is", hometeam)
      const m = {hometeam: hometeam, awayteam:awayteam}
      Navigate("/stats", {state : m});
      //window.location.href = "/stats";
  }

    return (
          
        
          
          <div>
          <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right" onClick={handleSubmit}>View Stats</button>

          <h2>Review</h2>
          <h3>{match}</h3>
          <h4>{match_date}</h4>
          <label >Share your comments on this match</label>
          <br></br>
          <input type="text"  name="firstName" class="form-control" value={comment} placeholder="Comment" onChange={e => setComment(e.target.value)} />
          <button onClick={e=>CreateComment(e)}>Add Comment</button>
            
        
              <h2>results</h2>
            

              { status==="loading" && <div>Loading data</div>}
              { status==="error" && <div>Error fetching</div>}
              
              {status === "success" && 
                    data.comments.map( (x, i)=> {
                      return(
                              <div className="row mb-3">
                                  <div class="form-group col-md-4">
                                      <br></br>
                                      <li class = "card" >
                                              <div>
                                          
                                              <div class="card-content" style={{backgroundColor : "orange"}}>
                                                  <p >
                                                      {data.comments[i].user}
                                                      :
                                                      {"       "}
                                                      {"       "}
                                                      {data.comments[i].comment_text}
                                                      
                                                      
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