import express from "express";
import cors from "cors";
import nevek from "./nevek.js";

const app = express();
app.use(cors());

function getFiuk(req, res){
    let t = []
    nevek.forEach(x => {
        if(x.nem == "F"){
            t.push(x.nev)
        }
    })
    res.send(t)
}

function getLanyok(req, res){
    let t = []
    nevek.forEach(x => {
        if(x.nem == "L"){
            t.push(x.nev)
        }
    })
    res.send(t)
}

function getInfo(req, res){
    let adat = [{err : "Hiányzó paraméter!"}]
    if(req.query.nev){
        nevek.forEach(x => {
            if(x.nev == req.query.nev){
                adat = x
            }
        })
        if(adat.length == 0){
            adat = [{err : "Nincs ilyen!"}]
        }
    }res.send(adat)
}

function getNevek(req, res){
    let adat = [{err : "Hiányzó paraméter"}]
    if(req.query.honap){
        adat = nevek.filter(x => {
            let split = x.nap.split(" ")
            let honap = split[0]
            if(honap == req.query.honap){
                return x
            }
        })
    } else if(req.query.nap){
        adat = nevek.filter(x => {
            let split = x.nap.split(" ")
            let nap = split[1]
            if(nap == req.query.nap + "."){
                return x
            }
        })
    } 
    if(adat.length == 0){
        adat = [{err : "Nincs ilyen!"}]
    }
    res.send(adat)
}

app.get("/", (req, res) => res.send("<h1>Nevek v1.0.0</h1>"))
app.get("/fiuk", getFiuk)
app.get("/lanyok", getLanyok)
app.get("/info", getInfo)
app.get("/nevek", getNevek)

app.listen(88, err => {
    console.log(err ? err : "App running on :88");
})