import cors from "cors"
import express from "express"

const app = express();
app.use(cors())
app.use(express.json())

let torony = [
    [5,4,3,2,1],
    [],
    []
];

function mozgat(req,res){
    let {honnan, hova} = req.params
    if(honnan != null && hova != null){
        let topHonnan = torony[honnan].length > 0 ? torony[honnan].at(-1) : 6;
        let topHova = torony[hova].length > 0 ? torony[hova].at(-1) : 6;
        if(topHova > topHonnan){
            torony[hova].push(torony[honnan].pop())
            res.send({status:"OK"})
        }else res.send({error:"Ide nem teheted!"})
    } else res.send({error:"Hiányzó paraméter"})
}

function putCopy(req,res){
    //console.log(req.body);
    if(req.body.torony){
        torony = req.body.torony
        res.send({status:"OK"})
    }else res.send({error:"Hiányzó paraméterek!"})
}

app.get("/", (req,res) => res.send("<h1>Hanoi v1.0.0</h1>"))
app.get("/torony", (req,res) => res.send(torony))
app.patch("/mozgat/:honnan-:hova", mozgat)
app.put("/copy", putCopy)

app.listen(88, err => {
    console.log(err ? err:"Server on :88");
})