import { Container } from "react-bootstrap";



const dummyList = ["Trabzonspor", "Fenerbahçe", "Galatasaray", "Beşiktaş", "Gaziantep"]

export default function Fixture(){
    return (
        <div>
            <ul>
                {
                    dummyList.map(element => {
                        return(
                           
                                <div>
                                    
                                        <text>{element}</text>
                                      
                                    
                               
                                </div>
                            
                        );
                    })
                }
            </ul>
        </div>
    )
}

