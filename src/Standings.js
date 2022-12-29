import styled from "styled-components"
import EPLLogo from "./logo/epl-logo"
import StandingsTable from "./StandingsTable"
import {React , useState} from 'react'
import { ReactSession } from 'react-client-session'
import {base_url} from "./constants"






  








function Standings (){
  
 
    const Title = styled.h1`
    font-size: 2em;
    margin: 0;
  `
  
  const TableWrapper = styled.div`
    text-align: center;
    background-color: ;
    color: white;
    border-radius: 3px;
  `
  
  const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    padding: 5em 0;
    min-height: calc(100vh - 10em);
  `  




  return(
  <MainWrapper>
    <TableWrapper>
      <Title>
      <img src={ "https://upload.wikimedia.org/wikipedia/tr/c/c2/S%C3%BCper_Lig_logosu.png" } style={{
          height: "150px",
          width : "170px"
            }}
           />
     
      </Title>
     
      <div>
       <StandingsTable />
      </div>
      
    </TableWrapper>
  </MainWrapper>
  )


}
export default Standings;
