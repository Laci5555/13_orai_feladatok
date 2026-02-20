import React from 'react'

export default function Diagram({tomb}) {
  return (
    <div className='diagram'>
      <div className='belso' data-testid="ittvagyok">
        {tomb.map((x,i)=> <div key={i} className='ertek' style={{height: x+"px"}}>{x}</div>)}
      </div>
    </div>
  )
}
