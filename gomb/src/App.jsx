import { useState } from 'react'
import './App.css'
import {Badge, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField} from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';

function App() {

  const [nev, setNev] = useState("")
  const [elfogad, setElfogad] = useState(false)
  const [nem, setNem] = useState("no")
  const [badge, setBadge] = useState(0)
  const [kor, setKor] = useState()

  console.log(nev, elfogad, nem);
  

  return (
    <>
      <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
        <TextField id="standard-basic" 
          label="Név" 
          variant="outlined" 
          size='medium'
          value={nev}
          onChange={e => setNev(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Életkor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={kor}
            label="Életkor"
            onChange={e => setKor(e.target.value)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
          <FormHelperText>Életkor</FormHelperText>
        </FormControl>
        <Badge badgeContent={badge} color="primary">
          <MailIcon/>
        </Badge>
        <RadioGroup row value={nem} onChange={e => setNem(e.target.value)}>
          <FormControlLabel value="no" control={<Radio />} label="Nő" />
          <FormControlLabel value="ferfi" control={<Radio />} label="Férfi" />
          <FormControlLabel value="egyeb" control={<Radio />} label="Egyéb" />
        </RadioGroup>
        <FormControlLabel 
          control={<Checkbox checked={elfogad} onChange={()=>setElfogad(!elfogad)} />} 
          label="Elfogadom"
        />
        <Button variant="contained" color='success' size='large' disabled={!elfogad} onClick={()=>setBadge(badge+1)}>Contained</Button>
      </Stack>
    </>
  )
}

export default App
