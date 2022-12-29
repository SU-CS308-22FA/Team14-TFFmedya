import React, { Component , useState } from "react"
//import dataJson from "../../data/en.1.json"
import styled from "styled-components"
import StandingsRow from "./StandingsRow.js"
import EPLLogo from "./logo/epl-logo"
import {base_url} from "./constants"
import {useQuery} from "react-query"

//import FlipMove from "react-flip-move"
//import RoundSelector from "../round-selector/index"







async function GetStandings(){
    

    let response = await fetch(base_url+'/standings/index', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
            // Handle data
         .catch((err) => {
            console.log(err.message);
         })
    return response.json();     
  }





function StandingsTable () {

  const {data, status} = useQuery(["Standings"], GetStandings)

  
  
 
  

  
    return (
    <div>
      
      { status==="loading" && <div style={{marginTop : '20px'}}>  Loading data  </div>}
      { status==="error" && <div style={{marginTop : '20px'}} >Error fetching</div>}
      {
          status=== "success" &&(
            <div>  
              <Table>
                <br></br>
            
                <TableHeader />
                { data.map((team, index) =>
                  <StandingsRow
                    //{...team[1]}
                    //key={team.id}
                    position={index + 1}
                    name= {team.team_name}
                    logo = {team.team_logo}
                    played = {team.games_played}
                    won = {team.victories}
                    drawn = {team.draws}
                    lost = {team.losses}
                    goalFor = {team.goals_scored}
                    goalAgainst = {team.goals_conceded}
                    goalDifference =  {team.goal_difference}
                    point = {team.points}
                  />
                )}
                
              </Table>
            </div>
          )
      }
    </div>
    )
  
}

export default StandingsTable

const Table = styled.div`
  letter-spacing: .02em;
  display: flex;
  flex-direction: column;
`
const TableHeader = () =>
  <div style={{ display: "flex", flexDirection: "row-reverse" ,backgroundColor : "#A020F0 " }}>
    <Th>P</Th>
    <Th>AV</Th>
    <Th>YG</Th>
    <Th>AG</Th>
    <Th>M</Th>
    <Th>B</Th>
    <Th>G</Th>
    <Th>O</Th>
  </div>

const Th = styled.div`
  width: 3.05em;
  padding: .5em;
  border: solid #360037 1px;
  border-right: 0;
  font-weight: 400;
`

const Title = styled.h1`
  font-size: 2em;
  margin: 0;
`

const TableWrapper = styled.div`
  text-align: center;
  background-color: #360037;
  background-size : cover;
  color: white;
  border-radius: 3px;
`


