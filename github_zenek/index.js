import express from "express";
import cors from "cors";
import zenek from "./zenek.js";

const app = express();
app.use(cors())


function getEloadok(req, res){
    let t = []
    zenek.forEach(x => {
        if(!(t.includes(x.eloado))){
            t.push(x.eloado)
        }
    })
    res.send(t.sort())
}

function getAlbumok(req, res){
    let t = []
    zenek.forEach(x => {
        if(!(t.includes(x.album))){
            t.push(x.album)
        }
    })
    res.send(t.sort())
}

function getEvek(req, res){
    let t = []
    zenek.forEach(x => {
        if(!(t.includes(x.ev))){
            t.push(x.ev)
        }
    })
    res.send(t.sort())
}
function getZenek(req, res){
    let adat = [{err : "Hiányzó paraméter"}];
    if(req.query.eloado){
        adat = zenek.filter(x => x.eloado == req.query.eloado)
    }else{
        if(req.query.album){
            adat = zenek.filter(x => x.album == req.query.album)
        } else {
            if(req.query.ev){
                adat = zenek.filter(x => x.ev == req.query.ev)
            }
        }
    }
    if(adat.length == 0){
        adat = [{err : "Nincs ilyen!"}];
    }
    res.send(adat)
}


app.get("/", (req, res) => res.send("<h1>Zenék v1.0.0</h1>"))
app.get("/eloadok", getEloadok)
app.get("/albumok", getAlbumok)
app.get("/evek", getEvek)
app.get("/zenek", getZenek)


app.listen(88, err => {
    console.log(err ? err: "App running on :88");
})