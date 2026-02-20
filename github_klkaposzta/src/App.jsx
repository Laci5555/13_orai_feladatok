import { useState } from 'react'
import Adat from './Adat'
import './App.css'
import Diagram from './Diagram'

function App() {

  const [tomb, setTomb] = useState([30, 71])

  console.log('====================================')
  console.log(tomb)
  console.log('====================================')

  return (
    <div className='app'>
        <Adat tomb={tomb} setTomb={setTomb}/>
        <Diagram tomb={tomb}/>
    </div>
  )
}

export default App
