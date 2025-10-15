import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

 const adatok = [
    { id:1, nev:"Szilvafa", darab: 10, szin:"red" },
    { id:2, nev:"Porszívó", darab: 7, szin:"lightgreen" },
    { id:3, nev:"Labda", darab: 15, szin:"yellow" },
    { id:4, nev:"Zokni", darab: 4, szin:"orange" }
];
let nextId = 5;

function getAdat(req,res){
    let {id} = req.params
    if(id){
        let i = adatok.findIndex(x => x.id == id)
        if(i != -1){
            res.send(adatok[i])
        }else{
            res.send({error:"Nincs ilyen index"})
        }
    }else res.send({error:"Hiányzó paraméter"})
}

function postAdat(req,res){
    let {nev, darab, szin} = req.body
    if(nev && darab && szin){
        let ujAdat={
            id:nextId,
            nev:nev,
            darab:darab,
            szin:szin
        }
        adatok.push(ujAdat)
        res.send(ujAdat)
    }else res.send({error: "Hiányzó paraméter"})
}

function putAdat(req,res){
    let {id} = req.params
    let {nev,darab,szin} = req.body
    if(id && nev && darab && szin){
        let i = adatok.findIndex(x => x.id == id)
        if(i!=-1){
            adatok[i].nev = nev
            adatok[i].darab = darab
            adatok[i].szin = szin
            res.send(adatok[i])
        }else res.send({error:"Nincs ilyen index"})
    }else res.send({error: "Hiányzó paraméter"})
}

function deleteAdat(req,res){
    let {id} = req.params
    if(id){
        let i = adatok.findIndex(x => x.id == id)
        if(i != -1){
            res.send(adatok.splice(i, 1))
        }else{
            res.send({error:"Nincs ilyen index"})
        }
    }else res.send({error:"Hiányzó paraméter"})
}

app.get("/", (req,res)=>res.send("<h1>hoghgéerohgoer</h1>"))
app.get("/adatok", (req,res)=>res.send(adatok))
app.get("/adat/:id", getAdat)
app.post("/adat", postAdat)
app.put("/adat/:id", putAdat)
app.delete("/adat/:id", deleteAdat)

app.listen(88, err=>{
    console.log(err?err:"Server on :88");
})