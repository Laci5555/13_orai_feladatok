import { getDocs } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Lista({collection, deleteAdat, r}) {

    const [adatLista, setAdatLista] = useState([]);
    

    async function getAdatok() {
        const adatSnapshot = await getDocs(collection);
        const adatList = adatSnapshot.docs.map(doc => ({ ...doc.data(), id:doc.id }));

        setAdatLista(adatList)
    }

    useEffect(()=>{getAdatok()}, [r])
    


  return (
    <div className='doboz'>
      {adatLista.map(x => 
        <div className="sor">
          <img src='del.png' onClick={()=>deleteAdat(x.id)}/> 
          <p>{x.szoveg}</p>
          <div className="iconok-kepek">{x.ikonok.map(icon => <img src={"icon"+icon+".png"}/>)}</div>
        </div>)
      }
    </div>
  )
}
