import express from "express";
import cors from "cors";
import uditok from "./uditok.js";

const app = express();
app.use(cors());

function getNevek(req, res){
    let t = [] 
    uditok.forEach(x => {
        t.push(x.nev)
    })
    res.send(t.sort())
}

function getKategoriak(req, res){
    let t = []
    uditok.forEach(x => {
        if(!(t.includes(x.kategoria))){
            t.push(x.kategoria);
        }
    })
    res.send(t)
}

function getMeret(req, res){
    let t = []
    uditok.forEach(x => {
        if(!(t.includes(x.ml))){
            t.push(x.ml)
        }
    })
    res.send(t.sort())
}

function getEnergia(req, res){
    let t = []
    if(req.query.kisebb){
        t = uditok.filter(x => x.kcal < req.query.kisebb)
    } else if(req.query.nagyobb){
        uditok.forEach(x => {
            if(x.kcal > Number(req.query.nagyobb)){
                t.push(x)
            }
        })
    } else {
        t = [{err : "Hiányzó paraméter"}]
    }

    if(t.length == 0){
        t = [{err : "Nincs ilyen"}]
    }
    res.send(t)
}

function getKeres(req, res){
    //let adat = [{err : "Hiányzó paraméter!"}]
    let adat = [...uditok]
    let {nev, kategoria, meret, energia} = req.query;
    /*if(nev, kategoria, ml, kcal){
        let t = []
        uditok.forEach(x => {
            if(x.nev.includes(nev) && x.kategoria == kategoria && x.ml == ml && x.kcal == kcal){   
                t.push(x)
            }
        })
        if(t.length == 0){
            adat = [...uditok]
        }else {
            adat = [...t]   
        }
    }
    res.send(adat)*/
    if(nev){
        adat = adat.filter(x => x.nev.includes(nev))
    }
    if(kategoria){
        adat = adat.filter(x => x.kategoria == kategoria)
    }
    if(meret){
        adat = adat.filter(x => x.ml == meret)
    }
    if(energia){
        adat = adat.filter(x => x.kcal == energia)
    }

    if(!nev && !kategoria && !meret && !energia){
        adat = [...uditok]
    }

    if(adat.length == 0){
        adat = {err : "Nincs a keresésnek megfelelő elem!"}
    }

    res.send(adat)
}

app.get("/", (req, res) => res.send("<h1>Üdítők v1.0.0</h1>"))
app.get("/nevek", getNevek);
app.get("/kategoriak", getKategoriak)
app.get("/meret", getMeret)
app.get("/energia", getEnergia)
app.get("/keres", getKeres)

app.listen(88, err => {
    console.log(err ? err : "App running on :88");
})