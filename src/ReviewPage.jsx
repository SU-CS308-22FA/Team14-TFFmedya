import React, { useState } from 'react'
import { Link, useNavigate,  useLocation } from 'react-router-dom'
import {base_url} from "./constants"
import { ReactSession } from 'react-client-session'


const getComments = (match) => {
        
                
    fetch(base_url+'/matchreview/comments', {
        method: 'POST',
        body: JSON.stringify({
          // Add parameters here
          'match' : match,

          
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);

            return data
  

         })
         .catch((err) => {
            console.log(err.message);
         })

        
}

export default function Review () {
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
    //const {match, match_date} = location.state
    const data= location.state
    const match = data.match
    const match_date = data.match_date
    //const comments = getComments(match);

    return (
        <div>
        <h2>Review</h2>
        <h3>{match}</h3>
        <h4>{match_date}</h4>
        <label >Share your comments on this match</label>
        <br></br>
        <input type="text"  name="firstName" class="form-control" value={comment} placeholder="Comment" onChange={e => setComment(e.target.value)} />
        <button onClick={e=>CreateComment(e)}>Add Comment</button>
        </div>
        /*
        <div>
        
        </div>*/

    /*
    <form role="form" onSubmit={handleSubmit}>

     <div className="row">
       <div className="col-sm-12">   
          <div class="form-group col-md-4">
            <label >Enter your comment</label>
            <br></br>
            <input type="text"  name="firstName" class="form-control" value={comment} placeholder="Comment" onChange={e => setQuestion(e.target.value)} />
          </div>  
       </div>
     </div>
     <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Add Comment</button>
    </form>
      */
     
    )
}