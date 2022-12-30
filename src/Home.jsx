//import Navbar from "./Navbar"

import { ReactSession } from 'react-client-session'
import ImageSlider from "./ImageSlider";




export default function Home () {
  const slides = [
    { url: "https://cdnuploads.aa.com.tr/uploads/Contents/2022/01/02/thumbs_b_c_ab8c6c099ef97dbf26f7e8816ea1bb6f.jpg?v=153658", title: "messi" },
    { url: "https://media-cdn.t24.com.tr/media/library/2021/11/1636882336922-mbappe.jpg", title: "turtle" },
    { url: "https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/Bayern-Muenchen-v-Fenerbahce---Audi-Cup-2019-Semi--b421cf514f095cae9dd375eddfcbb5a2.jpg", title: "stairs" },
    { url: "https://img3.aksam.com.tr/imgsdisk/2022/12/05/arabistana-degil-galatasa-461.jpg", title: "poor-ronaldo" },
    { url: "https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1672000/marek-hamsik-aa-1672040.jpg", title: "hamsik" },
  ];
  const containerStyles = {
    width: "1000px",
    height: "560px",
    margin: "0 auto",
    
  };
 


    return (
     
        <div>
          
            <h2 style = { {marginTop :"30px" }} > En Güncel Futbol Haberleri</h2>
            <div style={containerStyles} >
              <ImageSlider slides={slides} />
            </div>

           

        </div>
    )   
}