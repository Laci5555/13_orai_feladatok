import express from "express";
import email from "./email.js";
import cors from "cors";

const app = express();
app.use(cors());

function getFeladok(req, res){
    let t = [];
    for(let i = 0; i<email.length;i++){
        if(!(t.includes(email[i].ki))){
            t.push(email[i].ki);
        }
    }
    res.send(t.sort())
}

function getFelado(req, res){
    if(req.query.felado){
        res.send(email.filter(x => x.ki == req.query.felado))
    } else res.send("Hiányzó paraméter! ")
}

function getFogado(req, res){
    if(req.query.cimzett){
        res.send(email.filter(x => x.kinek == req.query.cimzett))
    } else res.send("Hiányzó paraméter!")
}

function getIdo(req, res){
    let {ora, perc} = req.query;
    let t = email.filter(x => {
        let split = x.mikor.split(":")
        let xora = split[0];
        let xperc = split[1];


        let ok = true;
        if(ora && ora != xora) ok = false;
        if(perc && perc != xperc) ok = false;
        return ok;
    });
    res.send(t)
}

function getLevel(req, res){
    if(req.query.leg){
        let felt = req.query.leg;
        if(felt == "rovidebb"){
            let adat = email[0];
            email.forEach(x => {
                if(x.hossz < adat.hossz){
                    adat = x;
                }
            })
            res.send(adat)
        } else if(felt == "hosszabb"){
            let adat = email[0];
            email.forEach(x => {
                if(x.hossz > adat.hossz){
                    adat = x;
                }
            })
            res.send(adat)
        } else if(felt == "korabbi"){
            let adat = email[0];
            email.forEach(x => {
                let adatido = parseInt((adat.mikor.split(":")[0])*60) + parseInt(adat.mikor.split(":")[1]);
                let xido = parseInt((x.mikor.split(":")[0])*60) + parseInt(x.mikor.split(":")[1]);
                if(xido < adatido){
                    adat = x;
                }
            })
            res.send(adat)
        } else if(felt == "kesobbi"){
            let adat = email[0];
            email.forEach(x => {
                let adatido = parseInt((adat.mikor.split(":")[0])*60) + parseInt(adat.mikor.split(":")[1]);
                let xido = parseInt((x.mikor.split(":")[0])*60) + parseInt(x.mikor.split(":")[1]);
                //console.log(adatido);
                if(xido > adatido){
                    adat = x;
                }
            })
            res.send(adat)
        }
    } else res.send("Hiányzó paraméter!")    
}


app.get("/",  (req, res) => res.send("<h1>Email v1.0.0</h1>"))
app.get("/feladok", getFeladok)
app.get("/kuldott", getFelado)
app.get("/fogadott", getFogado)
app.get("/idopont", getIdo)
app.get("/level", getLevel)




app.listen(88, err => {
    console.log(err ? err : "Server on :88");
})