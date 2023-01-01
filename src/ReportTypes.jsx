import React, { useState } from 'react'
import {useQuery} from "react-query"
import { Link, useNavigate,  useLocation, useHref } from 'react-router-dom'
import {base_url} from "./constants"

async function End_Report(report)
{
    console.log("Question is:",report)
    await fetch(base_url +'/report/end', {
      method: 'POST',
      body: JSON.stringify({
        // Add parameters here
        'type' : report.type,
        'title' : report.title,
        'username' : report.username,
        'report_text' : report.report_text,
        
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


export default function ReportTypes () {
    const location = useLocation()
    const info= location.state
    console.log("info is", info)
    const {data, status} = useQuery(["Reports"], getReports)

    const handleEnd = (e,report) => {
      e.preventDefault();
      console.log("Data title", report.title)
      End_Report(report)

  }



    async function getReports() {
        
        console.log("Report",info)
        let response = await fetch(base_url+'/report/show', {
            method: 'POST',
            body: JSON.stringify({
              // Add parameters here
    
              'type' : info,
              
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

    return (
        <div>
        <h2>Type is: {info}</h2>
        { status==="loading" && <div>Loading data</div>}
              { status==="error" && <div>Error fetching</div>}
              
              {status === "success" && 
                    data.map( (x, i)=> {
                      return(
                              <div className="row mb-3">
                                  <div class="form-group col-md-4">
                                      <br></br>
                                      <li class = "card" >
                                              <div>
                                          
                                              <div class="card-content" style={{backgroundColor : "orange"}}>
                                                  <p >
                                                      {data[i].username}
                                                      :
                                                      {"       "}
                                                      {"       "}
                                                      {data[i].report_text}
                                                      
                                                      
                                                  </p>
                                              <button onClick={(e)=>handleEnd(e,data[i])}>End Report</button>
                                              </div>
                                              </div>
                                      </li>
                                      
                                      
                                  </div>
                              </div>
                              );
                    })
                  }
        </div>
    )  
    
}