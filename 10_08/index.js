import express from "express"
import cors from "cors"
import konyvek from "./konyvek.js"

const app = express()
app.use(express.json())
app.use(cors())

let nextId = konyvek[konyvek.length-1].id + 1

app.get("/", (req,res)=>{
    res.send("<h1>Könyvek v1.0.0</h1>")
})
app.get("/konyvek", (req,res)=>{
    if(req.query.iro){
        let adat = []
        adat = konyvek.filter(x=> x.iro == req.query.iro)
        if(adat.length != 0){
            res.send(adat)
        }else{
            res.send({error:"Nincs ilyen író"})
        }
    }else{
        res.send(konyvek)
    }
})
app.get("/konyv/:id", (req,res)=>{
    let i = konyvek.findIndex(x => x.id == req.params.id)
    if(i != -1){
        res.send(konyvek[i])
    }else{
        res.send({error:"Nincs ilyen index"})
    }
})
app.get("/ev/:tol-:ig", (req,res)=>{
    let adat = []
    let {tol, ig} = req.params
    adat = konyvek.filter(x => x.ev > tol && x.ev < ig)
    if(adat.length != 0){
        res.send(adat)
    }else{
        res.send({error:"Nincs ilyen evszám"})
    }
})
app.post("/konyv", (req,res)=>{
    let {iro, cim, ev} = req.body
    console.log(iro, cim, ev);
    
    if(iro && cim && ev){
        let ujkonyv = {
            id:Number(nextId),
            iro:iro,
            cim:cim,
            ev:Number(ev)
        }
        konyvek.push(ujkonyv)
        nextId++;
        res.send(ujkonyv)
    }else{
        res.end({error:"Hiányzó paraméter!"})
    }
})
app.put("/konyv/:id", (req,res)=>{
    let {iro,cim, ev} = req.body
    let id = req.params.id
    if(iro&&cim&&ev){
        let index = konyvek.findIndex(x => x.id == id)
        if(index !=  -1){
            konyvek[index] = {
                id:id,
                iro:iro,
                cim:cim,
                ev:ev
            }
            res.send(konyvek[index])
        }
    }else{
        res.send({error:"Hiányzó paraméter"})
    }
})
app.patch("/konyv/:id/ev/:ev", (req,res)=>{
    let {id, ev} = req.params
    if(id && ev){
        let i = konyvek.findIndex(x => x.id == id)
        if(i != -1){
            konyvek[i].ev = ev
            res.send(konyvek[i])
        }
    }else{
        res.send({error:"Hiányzó paraméter"})
    }
})
app.delete("/konyv/:id", (req,res)=>{
    let id = req.params.id
    if(id){
        let i = konyvek.findIndex(x => x.id == id)
        if(i != -1){
            res.send(konyvek[i])
            konyvek.splice(i, 1)
        }
    }else{
        res.send({error:"Hiányzó id"})
    }
})



app.listen(88, err=>{
    console.log(err?err:"Server on :88");
})