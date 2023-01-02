import React, { Component } from "react"
import styled from "styled-components"
// This needs to be a stateful component to work with react-flip-move
class StandingsRow extends Component {
  render() {
    const {
      position,
      name,
      logo,
      played,
      won,
      drawn,
      lost,
      goalFor,
      goalAgainst,
      goalDifference,
      point
    } = this.props
    return (
      <Tr position={position}>
        <TdPosName style={{ width: "2em" , marginTop :"5px" }}>
          {position}
        </TdPosName>
        <TdPosName style={{ width: "3em" }}>
          <img src={logo} style={{
          marginTop : "1px",
          marginBottom : "5px",
          
        }}/>
        </TdPosName>
        <TdPosName style={{ textAlign: "left", width: "15em", marginTop :"5px" }}>
          {name}
        </TdPosName>
        <TdNumber style={{  marginTop :"5px" }}>
          {played}
        </TdNumber>
        <TdNumber style = { {marginTop :"5px" }}>
          {won}
        </TdNumber>
        <TdNumber style = { {marginTop :"5px" }}>
          {drawn}
        </TdNumber>
        <TdNumber style = { {marginTop :"5px" }}>
          {lost}
        </TdNumber>
        <TdNumber style = { {marginTop :"5px" }}>
          {goalFor}
        </TdNumber>
        <TdNumber style = { {marginTop :"5px" }}>
          {goalAgainst}
        </TdNumber>
        <TdNumber style = { {marginTop :"5px" }} >
          {goalDifference}
        </TdNumber>
        <TdNumber style = { {marginTop :"5px" }}>
          {point}
        </TdNumber>
      </Tr>
    )
  }
}

export default StandingsRow

const Tr = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ position }) =>
    position === 1
      ? "#FF0047"
      : position < 5 ? "#E10040" : position > 17 ? "#8A0036" : "#AB0039"};
`
const TdPosName = styled.div`
  padding: .5em;
  border-bottom: solid #360037 1px;
`
const TdNumber = styled.div`
  box-sizing: content-box;
  padding: .5em;
  width: 2em;
  border: solid #360037 1px;
  border-top: 0;
  border-right: 0;
`
