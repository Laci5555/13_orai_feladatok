import express from "express";
import torna from "./torna.js";

const app = express();

function getAdat(req, res){
    console.log(req.query)
    let adat = {error: "Nincs ilyen!"};
    if (req.query.nev){
        adat = torna.find(x => x.nev == req.query.nev);
    } else if(req.query.nem){
        adat = torna.filter(x => x.nem == req.query.nem);
    } else if(req.query.kor){
        adat = torna.filter(x => x.kor == req.query.kor);
    } else if(req.query.magas){
        adat = torna.filter(x => x.magas == req.query.magas)
    } else if(req.query.suly){
        adat = torna.filter(x => x.suly == req.query.suly)
    }
    res.send(adat)
}

function getMagas(req, res){
    let adat = {error : "Nincs ilyen!"};
    if (req.query.fx){
        if (req.query.fx == "min") {
            adat = { min: torna[0].magas };
            for (let t of torna) if (t.magas < adat.min) adat.min = t.magas;
        } else if (req.query.fx == "max"){
            adat = {max: torna[0].magas};
            for (let t of torna) if (t.magas > adat.max) adat.max = t.magas;
        }else if(req.query.fx == "atlag"){
            let osszeg = 0;
            for (let t of torna) osszeg += t.magas;
            adat = {atlag:Math.floor(osszeg/torna.length)};
        }
    } else adat = {error : "Hiányzik a függvény!"};
    res.send(adat)
}

function getNevek(req, res){
    res.send(torna.map(x=> x.nev).sort());
}

app.get("/", (req,res) => res.send("<h1>Torna v1.0.0</h1>"));
app.get("/adat", getAdat);
app.get("/magas", getMagas);
app.get("/nevek", getNevek);



app.listen(88, err => {
    console.log(err ? err : "Server on :88");
});