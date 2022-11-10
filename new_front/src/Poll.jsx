import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import Poll from 'react-polls';
import { Container } from "react-bootstrap";



export default function PollPage () {
    const [errorMessage, setErrorMessage] = useState('')
    const Navigate = useNavigate()

    /*
    const pollQuestion = 'Is react-polls useful?'
    const pollAnswers = [
      { option: 'Yes', votes: 6 },
      { option: 'No', votes: 2 }
    ]
    
    /*
    const handleVote = voteAnswer => {
        const { pollAnswers } = this.state
        const newPollAnswers = pollAnswers.map(answer => {
          if (answer.option === voteAnswer) answer.votes++
          return answer
        })
        this.setState({
          pollAnswers: newPollAnswers
        })
    }*/

      const [inputList, setinputList]= useState([{ lastName:''}]);
    
      const handleinputchange=(e, index)=>{
        const {value}= e.target;
        const list= [...inputList];
        list[index]= value;
        setinputList(list);
    
      }
     
      const handleremove= index=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
      }
    
      const handleaddclick=()=>{ 
        console.log(inputList);
        setinputList([...inputList, { lastName:''}]);
      }

    
    const handleSubmit = (e) => {

        e.preventDefault();
        Navigate("/");
        //console.log(email );
        //console.log(pass);

        /*
        fetch('http://127.0.0.1:8000/userlogin', {
            method: 'POST',
            body: JSON.stringify({
              // Add parameters here
              'Title' : title,
              'Subject' : subject
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                if (data !== "There is no user with this email.") {

                    Navigate("/profile", { state: data })
                }
                else {
                   
                    setErrorMessage("Mail veya şifre bilginiz hatalı!")

                }

             })
             .catch((err) => {
                console.log(err.message);
             })*/

    }

    
    return (


    <Container className="content">
     <div className="row">
       <div className="col-sm-12">   
          <div class="form-group col-md-4">
            <label >Enter your poll question</label>
            <input type="text"  name="firstName" class="form-control"  placeholder="Poll question"  />
          </div>

            { 
            inputList.map( (x,i)=>{
              return(
              <div className="row mb-3">
                 
               <div class="form-group col-md-4">
               <label >Add the first option</label>
                  <input type="text"  name="lastName" class="form-control"   placeholder="Option 1" onChange={ e=>handleinputchange(e,i) }/>
               </div>
               <div class="form-group col-md-2 mt-4">
               {
                  inputList.length!==1 &&
                  <button  className="btn btn-danger mx-1" onClick={()=> handleremove(i)}>Remove</button>
               }
               { inputList.length-1===i &&
                  <button  className="btn btn-success" onClick={ handleaddclick}>Add More</button>
               }
               </div>
            </div>
              );
             } )} 

               
       </div>
     </div>
    </Container>
        /*
        //<div className="col-md-5">
          //<div className="form-area">  
              <form role="form" onSubmit={handleSubmit}>
              <br styles="clear:both" />
                <div className="form">
                  <h2>Create polls</h2>
                  <input type="text" className="form-control" id="title" name="title" placeholder="Title" required />
                </div>
                            
                <div className="form">
                <input type="text" className="form-control" id="question" name="question" placeholder="Your poll question" required />
                </div>
                   
              <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>

          //</div>
        //</div>
        /*<div>
        <Poll question={pollQuestion} answers={pollAnswers} onVote={handleVote} />
        </div>*/

 
        
       
    
           
         
       
           
    )   
}