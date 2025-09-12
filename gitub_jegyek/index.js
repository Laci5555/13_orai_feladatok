import express from "express";
import jegyek from "./jegyek.js";
import cors from "cors";

const app = express();
app.use(cors());


function getTargyak (req, res){
    let t = [];
    jegyek.forEach(x => {
        if(!(t.includes(x.tantargy))){
            t.push(x.tantargy);
        }
    })
    res.send(t.sort())
}

function getOsztalyok(req, res){
    let t = []
    jegyek.forEach(x => {
        if(!(t.includes(x.osztaly))){
            t.push(x.osztaly)
        }
    })
    res.send(t.sort())
}

function getNevsor(req, res){
    if(req.query.osztaly){
        let t = []
        jegyek.forEach(x => {
            if(!(t.includes(x.nev)) && x.osztaly == req.query.osztaly){
                t.push(x.nev)
            }
        })
        res.send(t.sort())
    } else(res.send("Hiányzó paraméter"))
}

function getJegyek(req, res){
    let adat = [{err : "Hiányzó paraméter"}]
    if(req.query.nev && req.query.osztaly){
        adat = jegyek.filter(x => x.nev == req.query.nev && x.osztaly == req.query.osztaly)
        if (req.query.tantargy){
            adat = adat.filter(x => x.tantargy == req.query.tantargy)
        }
        let adat2 = []
        adat.forEach(x => {
            adat2.push({tantargy: x.tantargy, jegy: x.jegy})
        })
        res.send(adat2.sort())
    } else res.send(adat)
}

function getSzamol (req,res){
    let adat = [...jegyek]
    if(req.query.fx){
        if(req.query.osztaly){
            adat = adat.filter(x => x.osztaly == req.query.osztaly)
        }
        if(req.query.tantargy){
            adat = adat.filter(x => x.tantargy == req.query.tantargy)
        }
        let sum = 0;
        adat.forEach(x => {
            sum += x.jegy
        })
        if(req.query.fx == "atlag"){
            res.send((sum/adat.length).toFixed(2));
        } else if(req.query.fx == "darab"){
            res.send(adat.length)
        }
    } else res.send({error: "Hiányzó paraméter"})   
}


app.get("/", (req, res) => res.send("<h1>Jegyek v1.0.0</h1>"));
app.get("/tantargyak", getTargyak)
app.get("/osztalyok", getOsztalyok)
app.get("/nevsor", getNevsor)
app.get("/jegyek", getJegyek)
app.get("/szamol", getSzamol)



app.listen(88, err => {
    console.log(err ? err : "Server on :88");
})