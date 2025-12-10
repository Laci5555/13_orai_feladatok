import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {useState} from 'react'
import Valaszt from './Valaszt';
import Uzenet from './Uzenet'
import Lista from './Lista'

function App() {

  const [r, setR] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyCdtQp1IGdPLPeGloyo48G51DoS74U8ebg",
    authDomain: "uzenet-6f75f.firebaseapp.com",
    projectId: "uzenet-6f75f",
    storageBucket: "uzenet-6f75f.firebasestorage.app",
    messagingSenderId: "462308934628",
    appId: "1:462308934628:web:30c54fd153829864a0fdf1"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const adatCollection = collection(db, 'uzenetek');
  
  const [ temp_ikonok, setTemp_ikonok ] = useState([])
  function addIcon(nev) {
    if(temp_ikonok.length == 4) return
    setTemp_ikonok([...temp_ikonok, nev])
  }

  function delIcon(nev) {
    temp_ikonok.splice(temp_ikonok.findIndex(x=> x == nev), 1)
    setTemp_ikonok([...temp_ikonok])
  }

  async function addAdat(szoveg, ikonok){
    console.log("égnaslgnéalngáaslgnélasg " + szoveg + ikonok);
    await addDoc(adatCollection, {ikonok:ikonok, szoveg:szoveg});
    setR(!r)
  }

  async function deleteAdat(id){
    console.log("sdgksdklklsdgkjsdgdkkglgisdgnhéj " + id)
    await deleteDoc(doc(db, "uzenetek", id));
    setR(!r)
  }
  

  return (
    <div className='main'>
      <Valaszt addIcon={addIcon} />
      <Uzenet ikonok={temp_ikonok} delIcon={delIcon} addAdat={addAdat}/>
      <Lista collection={adatCollection} r={r} deleteAdat={deleteAdat}/>
    </div>
  )
}

export default App
