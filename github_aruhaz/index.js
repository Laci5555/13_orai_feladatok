import express from "express";
import cors from "cors";
import aruhaz from "./aruhaz.js";

const app = express();
app.use(cors());

function getKategoriak(req, res){
    let t = []
    aruhaz.forEach(x => {
        if(!t.includes(x.kategoria)){
            t.push(x.kategoria)
        }
    })
    res.send(t)
}

function getTermekek(req, res){
    let adat = [{err: "Hiányzó paraméter!"}]
    if(req.query.kategoria){
        adat = aruhaz.filter(x => x.kategoria == req.query.kategoria)

        if(adat.length == 0){
            adat = [{err : "Nincs a keresésnek megfelelő elem!"}]
        }else {
            adat = adat.map(x => x.nev)
        }
    }
    res.send(adat)
}

function getTermek(req,res){
    let adat = [{err : "Hiányzó paraméter!"}]
    if(req.query.nev){
        adat = aruhaz.filter(x => x.nev == req.query.nev)

        if(adat.length == 0){
            adat = [{err : "Nincs a keresésnek megfelelő elem!"}]
        }
    }
    res.send(adat)
}

function getKeres(req, res){
    let adat = [...aruhaz]
    if(req.query.minar){
        adat = adat.filter(x => x.ar > req.query.minar)
    }
    if(req.query.maxar){
        adat = adat.filter(x => x.ar < req.query.maxar)
    }

    if(!req.query.minar && !req.query.maxar){
        adat = [{err : "Hiányzó paraméter"}]
    }

    if(adat.length==0){
        adat = [{err : "Nincs a keresésnek megfelelő elem!"}]
    }
    res.send(adat)
}

app.get("/", (req, res) => res.send("<h1>Áruház v1.0.0</h1>"))
app.get("/kategoriak", getKategoriak)
app.get("/termekek", getTermekek)
app.get("/termek", getTermek)
app.get("/keres", getKeres)

app.listen(88, err => {
    console.log(err ? err : "App running on :88");
})
