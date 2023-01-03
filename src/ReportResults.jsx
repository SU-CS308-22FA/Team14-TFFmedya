import {base_url} from "./constants"
import { useNavigate  } from 'react-router-dom'


export default function ReportResults () {
    const Navigate = useNavigate()


    function handleGo(e, type)
    {
        e.preventDefault();
        Navigate("/reporttypes", {state : type});

    }



    return (
        <div>
        <h2>Please choose the report type that you want to view</h2>
        <br></br>
        <button onClick={(e) => handleGo(e,"user")}>User Reports</button>
        {"    "}

        <button onClick={(e) => handleGo(e, "bugs")}>Bug Reports</button>
        {"    "}

        <button onClick={(e) => handleGo(e, "TFFmedya")}>TFFMedya Reports</button>

        </div>
    )
}