import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Foglal from './Foglal'
import Lista from './Lista'

function App() {

  const [foglalasok, setFoglalasok] = useState([])

  return (
    <div className='app'>
      <div className="fejlec">Foglalj szállást nálunk!</div>
      <Foglal foglalasok={foglalasok} setFoglalasok={setFoglalasok}/>
      <Lista foglalasok={foglalasok}/>
    </div>
  )
}

export default App
