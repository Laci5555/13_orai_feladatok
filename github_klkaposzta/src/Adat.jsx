import React from 'react'
import { useState } from 'react'

export default function Adat({tomb, setTomb}) {

    const [text, setText] = useState()

    function AddSzám() {
        let x = parseInt(text)
        if(x>99){
            x = 99
        }else if(x < 20){
            x = 20
        }
        
        if(!isNaN(x)){
            setTomb([...tomb, x])
            setText(x)
        }
    }

    function GondolSzám() {
        let r = Math.floor(Math.random()*80)+20
        setText(r)
    }

  return (
    <div className='adat'>
      <input type="text" className='text' placeholder='szám' value={text} onChange={e => setText(e.target.value)}/>
      <input type="button" className='gomb' value={"Hozzáad"} onClick={()=>AddSzám()}/>
      <input type="button" className='gomb' value={"Gondol"} onClick={()=>GondolSzám()}/>
    </div>
  )
}
