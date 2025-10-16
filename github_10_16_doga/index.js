import express from "express"
import cors from "cors"
import idozona from "./idozona.js"

const app = express()
app.use(express.json())
app.use(cors())

let nextId = idozona[idozona.length-1].id +1

function getZona(req,res){
    let {id} = req.params
    if(id){
        let i = idozona.findIndex(x => x.id == id)
        if(i != -1){
            res.send(idozona[i])
        }else res.send({error:"Nincs ilyen index"})
    }else res.send({error:"Hiányzó paraméter"})
}

function rendez(req,res){
    let {mezo} = req.query
    let t = [...idozona]
    if(mezo == "ido"){
        res.send(t.sort((a,b)=> alakit(a.ido) - alakit(b.ido)))
    }else if(mezo == "rov"){
        t.sort((a, b)=> a.rov.localeCompare(b.rov))
        res.send(t)
    }else res.send({error:"Hiányzó paraméter"})
}

function alakit(ido){
    let szam;
    if(ido.includes("+")){
        let s = ido.split("+")[1]
        let ora = s.split(":")[0]
        let perc = s.split(':')[1]
        szam = ((ora*1)*60+(perc*1))
    } else if(ido.includes("-")){
        let s = ido.split("-")[1]
        let ora = s.split(":")[0]
        let perc = s.split(':')[1]
        szam = ((ora*1)*60+(perc*1)) *-1
    }
    return szam
}

//console.log(alakit("UTC-04:30"));


function postZona(req,res){
    let {nev, rov, ido} = req.body
    if(nev && rov && ido){
        let ujZona = {
            id:nextId,
            nev:nev,
            rov:rov,
            ido:ido
        }
        idozona.push(ujZona)
        res.send(ujZona)
        nextId++;
    }else res.send({error:"Hiányzó paraméter"})
}

function putZona(req,res){
    let {id, nev, rov, ido} = req.body
    if(id && nev && rov && ido){
        let i = idozona.findIndex(x => x.id == id)
        if(i != -1){
            idozona[i].nev = nev
            idozona[i].rov = rov
            idozona[i].ido = ido
            res.send(idozona[i])
        }else res.send({error:"Nincs ilyen index"})   
    }else res.send({error:"Hiányzó paraméter"})
}

function deleteZona(req,res){
    let {id} = req.params
    if(id){
        let i = idozona.findIndex(x => x.id == id)
        if(i != -1){
            res.send(idozona.splice(i, 1))
        }else res.send({error:"Nincs ilyen index"})
    } else res.send({error:"Hiányzó paraméter"})
}

function patchZona(req,res){
    let {id, ido} = req.body
    if(id && ido){
        let i = idozona.findIndex(x => x.id == id)
        if(i != -1){
            idozona[i].ido = ido
            res.send(idozona[i])
        }else res.send({error:"Nincs ilyen index"})   
    }else res.send({error:"Hiányzó paraméter"})
}

app.get("/", (req,res)=> res.send("<h1>Időzónák v1.0.0</h1>"))
app.get("/zonak", (req,res)=> res.send(idozona))
app.get("/zona/:id", getZona)
app.get("/rendez", rendez)

app.post("/zona", postZona)
app.put("/zona", putZona)
app.delete("/zona/:id", deleteZona)
app.patch("/ido", patchZona)

app.listen(88, err=>{
    console.log(err?err:"Server on :88");
})