import express from "express";

const app = express();

function info(req, res) {
    res.send("<h1>Első program</h1>");
}

function getData(req, res) {
    let data = {
        nev:"János",
        magas: 175
    }
    res.send(data);
}

app.get("/", info);
app.get("/data/", getData);

app.listen(88, err =>{
    console.log(err ? err : "Server on :88");
})
