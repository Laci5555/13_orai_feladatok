import express from "express"
import cors from "cors"

const autok = [
    {id: 1, tipus: "Peugetot 407", ev: 2004, szin: "kék"},
    {id: 2, tipus: "Ford Mondeo", ev: 2006, szin: "fehér"},
    {id: 3, tipus: "Audi A5 Limusine", ev: 2024, szin: "szürke"},
    {id: 4, tipus: "Skoda Octavia", ev: 2018, szin: "piros"}
];
let nextId = 5;

const app = express()
app.use(express.json())
app.use(cors())


function getList(req, res){
    res.send(autok)
}

function addObj(req,res){
    let {tipus, ev, szin} = req.body

    if(tipus && ev && szin){
        autok.push({id:nextId, tipus:tipus, ev:ev, szin:szin})
        nextId++;
        res.send({message: "Sikeres feltöltés"})
    }else{
        res.send({message: "Sikertelen feltöltés"})
    }
}

function deleteObj(req, res){
    let id = req.body.id
    if(id){
        let index = autok.findIndex(x => x.id == id)

        if(index != -1){
            autok.splice(index, 1)
            res.send({message: "Sikeres Törlés"})
        }else{
            res.send({message: "Sikretelen törlés"})
        }
    }
    res.send({error : "Hiányzó paraméter"})
}

function updateObj(req, res){
    let {id, tipus, ev, szin} = req.body

    if(id && tipus && ev && szin){

        let index = autok.findIndex(x => x.id == id)

        if(index != -1){
            autok[index] = {
                id: Number(id),
                tipus: tipus,
                ev: Number(ev),
                szin: szin
            }
            res.send({message: "Sikeres módosítás"})
        }else{
            res.send({message: "Sikertelen módosítás"})
        }
    }

}

function updateSzin(req, res){
    let id = req.body.id
    let szin = req.body.szin
    if(id && szin){

        let index = autok.findIndex(x => x.id == id)

        if(index != -1){
            autok[index].szin = szin
            res.send({message: "Sikeres módosítás"})
        }
        else{
            res.send({message: "Sikertelen módosítás"})
        }
    }
}

app.get("/", (req, res) => res.send("<h1>Autók v1.0.0</h1>"));
app.get("/list", getList)

app.post("/add", addObj)

app.delete("/del", deleteObj)

app.put("/upd", updateObj)

app.patch("/szin", updateSzin)


app.listen(88, err => {
    console.log(err ? err : "Server on :88");
})