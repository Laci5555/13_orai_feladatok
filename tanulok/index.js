import express from "express";

const app = express();
app.use(express.json());


let tanulok = [
    
        {nev: "Béla", osz:"10/A"},
        {nev: "Sára", osz:"10/A"},
        {nev: "Zoli", osz:"10/A"},
        {nev: "Sanyi", osz:"10/A"}
]




function getSearch(req, res) {
    //console.log(req);
    //console.log("Method:", req.method);
    console.log("query: ", req.query);
    if (req.query.nev) {
        let i = indexOfNev(req.query.nev);
        if (i != -1) res.send(tanulok[i]);
        else res.send({ err: "A keresett név nem található"});
    } else if(req.query.osz) {
        let nevek = tanulok.filter(x => x.osz == req.query.osz);
        if(nevek.length != 0) res.send( nevek);
        else res.send({err: " A keresett osztály nem található"});
    } else res.send({err: "hiányzó paraméter!"});
    res.send("nem tudom");
}
function indexOfNev(nev) {
    let i = 0; while (i<tanulok.length && tanulok[i].nev != nev) i++;
    if (i<tanulok.length) return i; else return -1;
};
function postNew(req, res) {
    console.log("body:", req.body);
    if(req.body.nev && req.body.osz){
        tanulok.push({nev: req.body.nev, osz: req.body.osz});
        res.send({msg: "Új tanuló felvéve."});
    }else res.send({err : "Hiányzó paraméter"});
};




app.get("/", (req, res) => {
    res.send("<h1>Elindultam v1.0.0</h1>");
});
app.get("/list", (req, res) => {
    res.send(tanulok);
});
app.get("/search", getSearch);
app.post("/new", postNew);


app.listen(88, err => {
    console.log(err ? err : "server on :88");
});