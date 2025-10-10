import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

let players = [{nev:"Senki", szin:"#FFFFFF", pont:0}]; // nev, szin, pont
let level = []; // 30x30 <- index

for (let sor=0;sor<30;sor++){
    level[sor] = [];
    for(let osz = 0;osz<30;osz++){
        level[sor][osz] = 0;
    }
}

function postJoin(req,res){
    let {nev,szin} = req.body
    if(nev && szin){
        if(players.length < 15){
            players.push({nev:nev, szin:szin, pont:1});
            let id = players.length-1;
            let sor, osz;
            do{
                sor = Math.floor(Math.random()*30)
                osz = Math.floor(Math.random()*30)
            }while (level[sor][osz] != 0);
            level[sor][osz] = id;
            res.send({id:id});
        }else res.send({error:"Túl sok felhasználó"})
    }else res.send({error:"Hiányzó paraméterek!"})
}

function patchLevel(req,res){
    console.log(req.body);
    let {id, sor, osz} = req.body;
    if(id && sor && osz){
        if(level[sor][osz]==0){
            sor = sor*1
            osz = osz*1
            let szomszed = false;
            for(let dsor = -1; dsor <= 1; dsor++){
                for(let dosz=-1;dosz<=1;dosz++){
                    let s = sor+dsor;
                    let o = osz+dosz
                    if(s >=0 && s<30 && o>=0 && o<30 && level[s][o] == id) szomszed = true;
                }
            }
            if(szomszed) {
                level[sor][osz] = id; 
                players[id].pont += 1;
                res.send({status:"OK", id:id, pont:players[id].pont})
            }else res.send({error:"Nem szomszédos"})
        }else res.send({error:"Ez már foglalt"})
    }res.send({error:"Hiányzó paraméterek"})
}

app.get("/", (req,res)=> res.send("<h1>Color war v1.0.0</h1>"))
app.get("/players", (req,res)=> res.send(players))
app.get("/level", (req,res)=> res.send(level))
app.post("/join", postJoin)
app.patch("/level", patchLevel)

app.listen(88, err=>{
    console.log(err?err:"Server on :88");
})