import cors from "cors"
import express from "express"
import fs from "fs"

const app = express()
app.use(express.json())
app.use(cors())

let csokik = [];
let nextId = 1;

fs.readFile("csokik.csv", "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
        let sorok = data.split("\r\n");
        for (let sor of sorok) {
            let s = sor.split(";");
            csokik.push({ id:nextId, nev:s[0], suly:s[1]*1, kcal:s[2]*1 });
            nextId++;
        }
        console.log("Beolvasott csokik száma: " + csokik.length);
    }
});

function saveCsokik(req, res) {
    let data = csokik.map(x => x.nev + ";" + x.suly + ";" + x.kcal).join("\r\n");
    fs.writeFile("csokik.csv", data, "utf-8", (err) => {
        if (err) {
            console.log(err);
            res.send({ error: "Mentés nem sikerült!" });
        } else {
            console.log("Fájl sikeresen elmentve.");
            res.send({ status: "OK" });
        }
    });
}

function postCsoki(req, res){
    let {nev, suly, kcal} = req.body

    if(nev && suly && kcal){
        csokik.push({
            id: nextId,
            nev: nev,
            suly: suly,
            kcal: kcal
        })
        nextId++;
        res.send({status:"OK", message:"Sikeres feltöltés"})
    }else{
        res.send({status:"not OK", message:"Sikertelen feltöltés"})
    }
}

function deleteCsoki(req, res){
    let id = req.body.id
    if(id){
        let index = csokik.findIndex(x => x.id == id)

        if(index != -1){
            csokik.splice(index, 1)
            res.send({status:"OK", message:"Sikeres törlés"})
        }
    }else{
        res.send({status:"not OK", message:"Sikertelen törlés"})
    }
}

function putCsoki(req,res){
    let {id, nev, suly, kcal} = req.body
    if(id){
        let index = csokik.findIndex(x => x.id == id)

        if(index != -1){
            csokik[index] = {
                id:id,
                nev:nev,
                suly:suly,
                kcal:kcal
            }
            res.send({status:"OK", message:"Sikeres módosítás"})
        }
    }else{
        res.send({status:"not OK", message:"Sikertelen módosítás"})
    }
}

function patchNev(req, res){
    let {id, nev, suly, kcal} = req.body
    if(id && nev && suly && kcal){
        let index = csokik.findIndex(x => x.id == id && x.suly == suly && x.kcal == kcal)

        if(index != -1){
            csokik[index].nev = nev
            res.send({status:"OK", message:"Sikeres módosítás"})
        }
    }else{
        res.send({status:"not OK", message:"Sikertelen módosítás"})
    }
}

app.get("/", (req,res) => res.send("<h1>Csokik v1.0.0</h1>"))
app.get("/csokik", (req, res) => res.send(csokik))
app.get("/kcal", (req, res) => res.send(csokik.sort((a,b) => a.kcal - b.kcal)))
app.get("/save", saveCsokik)

app.post("/csoki", postCsoki)
app.delete("/csoki", deleteCsoki)
app.put("/csoki", putCsoki)
app.patch("/nev", patchNev)

app.listen(88, err => {
    console.log(err ? err : "App running on :88")
})



/*{
  "nev":"hgéahg",
  "suly":45,
  "kcal":1000
}*/