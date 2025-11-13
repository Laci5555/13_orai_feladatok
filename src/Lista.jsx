import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Lista() {

    let [adat, setAdat] = useState([])
    let [hang, setHang] = useState([])

    let [nap, setNap] = useState("");
    let [ido, setIdo] = useState("");
    let [haz, setHaz] = useState(1);
    
    let [refresh, setRefresh] = useState(false)

    useEffect(()=>{
        async function getAdat() {
            let json = await fetch("http://localhost:88/napok")
            let adat = await json.json()
            setAdat(adat)
        }
        async function getAdat2() {
            let json = await fetch("http://localhost:88/hangulat")
            let adat = await json.json()
            setHang(adat)
        }
        getAdat();
        getAdat2();
    }, [refresh])

    async function PostNap() {
        let ujNap = {
            nap:nap,
            ido:ido,
            haz:haz
        }
        await fetch("http://localhost:88/nap", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(ujNap)
        })
        setRefresh(!refresh);
    }

  return (
    <>
        <div className="input">
            <label htmlFor="nap">Nap: </label>
            <input type="text" id="nap" value={nap} onChange={(e)=>setNap(e.target.value)} placeholder='éé.hh.nn'/>
            <label htmlFor="ido">Idő: </label>
            <input type="text" id='ido' value={ido} onChange={(e)=>setIdo(e.target.value)} placeholder='oo:pp'/>
            <label htmlFor="hangulat">Hangulat: </label>
            <select id="hangulat" onChange={(e)=>setHaz(e.target.value)}>
                {hang.map(x=> <option key={x.haz} value={x.haz}>{x.hangulat}</option>)}
            </select>
            <button onClick={()=>PostNap()}>Hozzáad</button>
        </div>
        <div className='container'>
            {adat.map((x) => <div key={x.az} className='kartya'>
                <span>Nap: {x.nap}</span>
                <span>Idő: {x.ido}</span>
                <img src={"./src/assets/"+x.kep} alt="" />
                <span>{x.hangulat}</span>
            </div>)}
        </div>
    </>
  )
}
