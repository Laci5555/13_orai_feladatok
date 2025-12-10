import React from 'react'

export default function Valaszt({addIcon}) {

    let t = []
    for (let i = 1; i < 10; i++) {
        t.push("icon"+i+".png")
    }

  return (
    <div className='ikonok doboz'>
        {t.map(x=> <img src={x} className='ikon' onClick={()=>addIcon(x)}/>)}
    </div>
  )
}
