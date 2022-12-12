import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";

export default function PollCard(question) {
  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol size="6">
          <MDBCard>
            <MDBCardBody>
              <div className="text-center">
                <MDBIcon far icon="file-alt mb-3 text-primary" size="4x" />
                
                <p>
                  {question.question_text}
                  
                </p>
              </div>

              <hr />

              <form className="px-4" action="">
                <p className="text-center">
                  <strong>Your Answer:</strong>
                </p>
                {
                  question.choices.map((choice) => {
                    return(
                      <MDBRadio
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        label= {choice.option}
                        defaultChecked
                      />
                    )
                  })
                }
                
              </form>
              
            </MDBCardBody>
            {/*
            <MDBCardFooter>
              <div className="text-end">
                <MDBBtn >Submit</MDBBtn>
              </div>
            </MDBCardFooter>
              */}
          </MDBCard>
        </MDBCol>
      </MDBRow>
              </MDBContainer>
  );
}