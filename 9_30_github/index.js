import express from "express"
import cors from "cors"
import varosok from "./varosok.js"

const app = express()
app.use(cors())
app.use(express.json())

let nextId = 47

function getVarosok(req, res){
    res.send(varosok.map(x => x.telepules))
}

function getVaros(req, res){
    if(req.query.nev){
        res.send(varosok.filter(x => x.telepules = req.query.nev))
    }else{
        res.send("NEM")
    }
}

function getIrszam(req,res){
    let szam = req.params.szam
    if(szam){
        let t = varosok.filter(x => x.irszam == szam)

        if(t.length == 0){
            res.send("Nincs ilyen")
        }else {
            res.send(t)
        }
    }
    else {
        res.send("Nem")
    }
}

function getLakos(req,res){
    let tol = req.params.tol
    let ig = req.params.ig
    if(tol && ig){
        let t = varosok.filter(x => x.lakos > tol && x.lakos < ig)

        if(t.length == 0){
            res.send("Nincs ilyen")
        }else {
            res.send(t)
        }
    }else {
        res.send("Nem")
    }
}

function getId(req,res){
    let id = req.params.id
    if(id){
       let t = varosok.filter(x => x.id == id)

        if(t.length == 0){
            res.send("Nincs ilyen")
        }else {
            res.send(t)
        }
    }else {
        res.send("Nem")
    }
}

function postVaros(req, res){
    let {telepules, irszam, varmegye, lakos, terulet} = req.body

    if(telepules && irszam && varmegye && lakos && terulet){
        varosok.push({
            id: Number(nextId),
            telepules: telepules,
            irszam: irszam,
            varmegye: varmegye,
            lakos: lakos,
            terulet: terulet
        })
        nextId++;
        res.send("Igen" + nextId)
    }else{
        res.send("HIányzó paraméter")
    }
}

function patchVaros(req, res){
    let id = req.params.id
    let lakos = req.params.lakos
    if(id && lakos){
        let index = varosok.findIndex(x => x.id == id)

        if(index != -1){
            varosok[index].lakos = lakos
            res.send("Igen")
        }else{
            res.send("Nincs ilyen")
        }
    }else{
        res.send("HIányzó paraméter")
    }
}

function deleteVaros(req, res){
    let id = req.params.id
    if(id){
        let index = varosok.findIndex(x => x.id == id)

        if(index != -1){
            varosok.splice(index, 1)
            res.send("Sikeres törlés")
        }else{
            res.send("Nincs")
        }
    }else{
        res.send("Nem")
    }
}

app.get("/", (req, res) => res.send("<h1>Városok v1.0.0</h1>"))
app.get("/varosok", getVarosok)
app.get("/varos", getVaros)
app.get("/irszam/:szam", getIrszam)
app.get("/lakos/:tol-:ig", getLakos)
app.get("/varos/:id", getId)

app.post("/varos", postVaros)
app.patch("/varos/:id/lakos/:lakos", patchVaros)
app.delete("/varos/:id", deleteVaros)


app.listen(88, err => {
    console.log(err ? err : "Server on :88");
})


/*

{
  "telepules": "hadfhdafh",
  "irszam": 346346,
  "varmegye": "ajghé",
  "lakos": 3,
  "terulet": 44
}*/