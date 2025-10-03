import express from "express"
import cors from "cors"
import sajtok from "./sajtok.js"

const app = express()
app.use(express.json())
app.use(cors())

let nextId = sajtok[sajtok.length-1].id +1


app.get("/", (req,res) => res.send("<h1>Sajtok v1.0.0</h1>"))
app.get("/sajtok", (req,res)=> res.send(sajtok))
app.get("/sajt/:id", (req,res) => {
    res.send(sajtok.filter(x => x.id == req.params.id))
})
app.get("/ar", (req,res)=>{
    res.send(sajtok.sort((a,b)=> b.ar - a.ar))
})
app.get("/suly/:tol-:ig", (req,res) =>{
    let tol = req.params.tol
    let ig = req.params.ig
    res.send(sajtok.filter(x => x.suly > tol && x.suly < ig))
})
app.post("/sajt", (req,res)=>{
    let {nev, suly, ar} = req.body

    if(nev && suly && ar){
        sajtok.push({
            id:nextId,
            nev:nev,
            suly:suly,
            ar:ar
        })
        res.send(sajtok.filter(x => x.id == nextId))
        nextId++;
    }else{
        res.send({error:"Hiányzó paraméter"})
    }

})
app.delete("/sajt/:id", (req,res)=> {
    let id = req.params.id
    if(id){
        let index = sajtok.findIndex(x => x.id == id)

        if(index != -1){
            res.send(sajtok[index])
            sajtok.splice(index, 1)
        }else{
            res.send({error : "Nincs ilyen index"})
        }
    }
})
app.put("/sajt/:id", (req,res) => {
    let id = req.params.id
    let {nev, suly, ar} = req.body
    if(nev && suly && ar){
        let index = sajtok.findIndex(x => x.id == id)

        if(index != -1){
            sajtok[index] = {
                id: Number(id),
                nev:nev,
                suly:suly,
                ar:ar
            }
            res.send(sajtok[index])
        }else{
            res.send({error:"Nincs ilyen index"})
        }
    }else{
        res.send({error:"Hiányzó paraméter"})
    }
})
app.patch("/sajt/:id/nev/:nev", (req,res) => {
    let id = req.params.id
    let nev = req.params.nev
    if(nev && id){
        let index = sajtok.findIndex(x => x.id == id)

        if(index != -1){
            sajtok[index].nev = nev
            res.send(sajtok[index])
        }else{
            res.send({error:"Nincs ilyen"})
        }
    }else{
        res.send({error:"HIáynzó paraméter"})
    }
})



app.listen(88, err => {
    console.log(err ? err : "Server on :88");
})