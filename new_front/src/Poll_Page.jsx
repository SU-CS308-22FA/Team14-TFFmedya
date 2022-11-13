//import Navbar from "./Navbar"
import { Link, useNavigate  } from 'react-router-dom'
import {Q} from './Poll_Create'
import {OPTION_LIST} from './Poll_Create'
import Poll from 'react-polls';


export default function PollPage () {

    const Navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault();
        Navigate("/poll_create");
    }

    const handleVote = voteAnswer => {
        const { OPTION_LIST } = this.state
        const newPollAnswers = OPTION_LIST.map(answer => {
          if (answer.option === voteAnswer) answer.votes++
          return answer
        })
        this.setState({
          OPTION_LIST: newPollAnswers
        })
    }
    return (
        <form role="form" onSubmit={handleSubmit}>
    
        <div>
        
        <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Create Poll</button>


        <text>{Q}</text>
        <text>{OPTION_LIST[0]}</text>
        
        
        <div>
        <Poll question={Q} answers={OPTION_LIST} onVote={handleVote} />
        </div>
        

        </div>
        </form>

       
           
    )   
}