import React from 'react'
import { useState } from 'react'

export default function Foglal({foglalasok, setFoglalasok}) {


    const [radio, setRadio] = useState(1)
    const [reggeli, setReggeli] = useState(false)

    function Foglalas(){
        setFoglalasok([...foglalasok, {ejszaka:radio, reggeli:reggeli}])
    }


  return (
    <div className='doboz foglal'>
        <label htmlFor="ejszaka">Éjszakák:</label>
        <input type="number" name="" id="ejszaka" value={radio} onChange={e => setRadio(e.target.value)}/>

        <input type="radio" name="nap" id="egy" onClick={()=>setRadio(1)} checked={radio==1?true:false}/>
        <label htmlFor="egy">egy</label>
        <input type="radio" name="nap" id="harom" onClick={()=>setRadio(3)} checked={radio==3?true:false}/>
        <label htmlFor="harom">három</label>
        <input type="radio" name="nap" id="het" onClick={()=>setRadio(7)} checked={radio==7?true:false}/>
        <label htmlFor="het">hét + </label>

        <input type="checkbox" name="" id="reggeli" value={reggeli} onClick={()=>setReggeli(!reggeli)} checked={reggeli}/>
        <label htmlFor="reggeli">reggelivel</label>

        <input type="button" value="Foglal" className='gomb' onClick={()=>Foglalas()} data-testid="gombocska"/>
        <div>(Ár: {reggeli? radio*15000+radio*5000 : radio*15000},-Ft)</div>
    </div>
  )
}
