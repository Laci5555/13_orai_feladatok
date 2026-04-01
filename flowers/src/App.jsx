import { useEffect } from 'react'
import './App.css'
import levels from "./levels.json"
import { useState } from 'react'

function App() {

  let [level, setLevel] = useState(levels[0])
  let [index, setIndex] = useState(0)
  let [szazalek, setSzazalek] = useState(0)

  let [current, setCurrent] = useState({})

  let [katt, setKatt] = useState(0)


  let fa = 0
  
  useEffect(()=>{
    function getLevel(){
      let l = levels[index]
      setLevel(l)
    }
    getLevel()
  },[index])
  
  function getKep(az) {
    if(az == "F"){fa++; return "fa.png"}
    else if(az == "P") return "viragP.png"
    else if(az == "p") return "lepkeP.png"
    else if(az == "K") return "viragK.png"
    else if(az == "k") return "lepkeK.png"
  }

  function HandleClick(sor,osz){
    console.log(sor,osz);
    if(katt==0 && level[sor].charAt(osz) != "F"){
      setCurrent({sor:sor, osz:osz})
      setKatt(katt==0?1:0)
    }
    else if(katt==1){
      if(level[sor].charAt(osz) != "F" && (level[sor].charAt(osz) == level[current.sor].charAt(current.osz).toLocaleLowerCase() || level[sor].charAt(osz).toLocaleLowerCase() == level[current.sor].charAt(current.osz)) && (level[sor].charAt(osz) != level[current.sor].charAt(current.osz))){
        let s = level[sor].split("")
        s[osz] = "F"
        level[sor] = s.join('')
        let s2 = level[current.sor].split("")
        s2[current.osz] = "F"
        level[current.sor] = s2.join('')
        console.log(level[sor].charAt(osz));
        setCurrent({})
        setLevel([...level])
        setKatt(katt==0?1:0)
      }
      else if(level[sor].charAt(osz) != "F" && (level[sor].charAt(osz) != level[current.sor].charAt(current.osz).toLocaleLowerCase() || level[sor].charAt(osz).toLocaleLowerCase() != level[current.sor].charAt(current.osz))){
        setCurrent({osz:osz, sor:sor})
        setKatt(katt==0?1:0)
      }
    }
  }
  
  console.log(katt);

  return (
    <div className='app'>

      <div className="palya">
        {level.map((x,sor) => x.split("").map((y,osz) => <img src={"/"+getKep(y)} onClick={()=>HandleClick(sor, osz)} className={(sor==current.sor&&osz==current.osz)?"selected":""}/>))}
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '880px', margin:'10px auto'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'white', padding: '10px', borderRadius: '10px'}}>
          <img src="/prev.png" alt="" onClick={()=>setIndex(index>0?index-=1:index)}/>
          <p style={{fontWeight: 'bold', fontSize: 'large'}}>{index+1}</p>
          <img src="/next.png" alt="" onClick={()=>setIndex(index<5?index+=1:index)}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'white', padding: '10px', borderRadius: '10px'}}> 
          <img src="/fa32.png" alt="" />
          <p style={{fontWeight: 'bold', fontSize: 'large'}}>{Math.floor((fa/77)*100)}%</p>
        </div>
      </div>
    </div>
  )
}

export default App
