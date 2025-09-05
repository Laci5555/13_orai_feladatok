import express from "express";
import orarend from "./orarend.js";

//console.log(orarend.length);
const app = express();
app.use(express.json());

function getTargy(req, res){
    if(req.query.tgy){
        let tgy = req.query.tgy;
        let t = orarend.filter(x => x.tgy == tgy);
        res.send(t);
    } else res.send({err : "Hiányzó paraméter! "});
}

function getTargyak(req, res){
    let t = [];
    for (let x of orarend) if (!t.includes(x.tgy)) t.push(x.tgy);
    res.send(t.sort())
}

function getTanar(req, res) {
    if(req.query.tan){
        let tan = req.query.tan;
        let t = orarend.filter(x => x.tan == tan);
        res.send(t)
    } else res.send({err : "Hiányzó paraméter!"})
}

function getTanarok(req, res){
    let t = [];
    for(let x of orarend) if (!t.includes(x.tan)) t.push(x.tan)
    res.send(t.sort())
}


function getIdo(req, res){
    if(req.query.het && req.query.nap){
        const {het, nap} = req.query;
        let t = orarend.filter(x => x.ora[0] == het && x.ora[1] == nap)
        res.send(t)
    } else res.send({err : "Hiányzó paraméter! "})
}


function getSzuro(req, res){
    let {tan, tgy, csp} = req.query;
    let t = orarend.filter(x => {
        let ok = true;
        if( tan && x.tan != tan) ok = false;
        if( tgy && x.tgy != tgy) ok = false;
        if( csp && x.csp != csp) ok = false;
        return ok;
    });
    res.send(t);
}


app.get("/", (req, res) => res.send("<h1>Órarend v1.0.0</h1>"))
app.get("/mind", (req, res) => {res.send(orarend)})
app.get("/targy", getTargy);
app.get("/targyak", getTargyak);
app.get("/tanar", getTanar)
app.get("/tanarok", getTanarok)
app.get("/ido", getIdo)
app.get("/szuro", getSzuro)


app.listen(88, err => {
    console.log(err ? err : "Server is running on :88");
})
