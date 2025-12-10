import React from 'react'
import { useState } from 'react'

export default function Uzenet({ikonok, delIcon, addAdat}) {

  const [szoveg, setSzoveg] = useState("")

  function osszesit(){
    let temp = ikonok.map(x => x.split(".")[0].split("n")[1])
    addAdat(szoveg, temp) 
  }

  return (
    <div className='doboz input'>
      <input type="text" className='mezo' value={szoveg} onChange={e=>setSzoveg(e.target.value)} />
      <img src="add.png" alt="" onClick={()=>osszesit()}/>
      <div className="ikonok-kepek">{ikonok.map(x=><img src={x} className='ikon kisikon' onClick={()=>delIcon(x)}/>)}</div>
    </div>
  )
}
