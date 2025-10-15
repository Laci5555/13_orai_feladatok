import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

const csigak = [
    {id:1, nev:"Csigusz", meret:6, haz:"igen"},
    {id:2, nev:"Béla", meret:15, haz:"nem"},
    {id:3, nev:"Geriuszka", meret:3, haz:"igen"},
    {id:4, nev:"Cigusz", meret:4, haz:"nem"},
    {id:5, nev:"Bigusz", meret:3000, haz:"igen"}
]
let nextId = 6


const postCsiga = (req,res)=>{
    let {nev,meret,haz} = req.body;
    if(nev && meret && haz){
        let ujCsiga = {id:nextId, nev:nev, meret:meret, haz:haz}
        csigak.push(ujCsiga); nextId++;
        res.send(ujCsiga);
    } else res.send({error:"Hiányzó paraméterek!"});
}

const getCsiga = (req,res)=>{
    let {id} = req.params
    if(id){
        let i = csigak.findIndex(x => x.id == id);
        if( i!=-1){
            res.send(csigak[i])
        }else res.send({error: "Hibás azonosító"})
    } else res.send({error:"Hiányzó paraméter"})
}

const deleteCsiga = (req,res)=>{
    let {id} = req.params
    if(id){
        let i = csigak.findIndex(x => x.id == id)
        if( i!=-1){
            let toroltCsiga = csigak.splice(i, 1)
            res.send(toroltCsiga);
        }else res.send({error: "Hibás azonosító"})
    } else res.send({error:"Hiányzó paraméter"})
}


app.get("/", (req,res)=>res.send("<h1>Csigákok v1.0.0</h1>"))
app.get("/csigak", (req,res)=>res.send(csigak))
app.get("/csiga/:id", getCsiga)
app.post("/csiga", postCsiga)
app.delete("csiga/:id", deleteCsiga)


app.listen(88, err=>{
    console.log(err?err:"Server on 88");
})
