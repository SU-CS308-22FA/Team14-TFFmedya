import React, { useState } from 'react'
import 'react-leaf-polls/dist/index.css'
import {base_url} from "./constants"



export default function CreateContent () {
    const [imgurl, setImg] = useState('')
    const [definition, setDef] = useState('')
    const [ref_url, setRef_URL] = useState('')
    
    const handleSubmit = (e) => {

        e.preventDefault();
        //console.log(email );
        //console.log(pass);


        fetch(base_url+'/content/postcontent', {
            method: 'POST',
            body: JSON.stringify({
              // Add parameters here
              "image": imgurl,
              "caption": definition,
              "ref_url" : ref_url
    
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if(data === "Post Added Successfully")
                {
                    window.location.href = "/" 
                }
                 
            })

             .catch((err) => {
                console.log(err.message);
             })

          
    }
    
    return(
        <div>
            <form className="login-form" onSubmit={handleSubmit}>
            <label >Resim Url</label>

            <input value={imgurl} onChange={(e) => setImg(e.target.value)}type="img" placeholder="Lütfen resmin urlsini giriniz." id="imgurl" name="imgurl" required/>
            <label >Açıklama</label>
            <input value={definition} onChange={(e) => setDef(e.target.value)} type="def" placeholder="Lütfen açıklama giriniz." id="def" name="def" required/>
            <label >Referans Linki</label>
            <input value={ref_url} onChange={(e) => setRef_URL(e.target.value)} type="ref" placeholder="Lütfen referans linki giriniz." id="ref" name="ref" required/>
            <button type='submit'> Oluştur</button>
            </form>
        </div>
        
    )   
}