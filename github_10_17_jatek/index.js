import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

let level = [
    "........B...",
    "...B.B..B.B.",
    "..BB.BB.BBB.",
    "...B..B.....",
    "BB.BB.BBB.BB",
    "....B.B.B.B.",
    "..B.....B.B.",
    "B.BBB.B...B.",
    "......B.....",
];

const players = [
    {nev:"Star", avatar:"star", sor:0, osz:0, pont:0, ip:0}
]

function randomCsillag(){
    let sor, osz;
    do{
        sor = Math.floor(Math.random()*9);
        osz = Math.floor(Math.random()*12);
    } while(level[sor].charAt(osz) != '.');
    players[0].sor = sor
    players[0].osz = osz
    for (let p of players) if (p.dead) {p.dead = false; p.pont=0}
}
randomCsillag();

function postConnect(req,res){
    if(players.length < 12){
        let {nev, avatar} = req.body
        if(nev && avatar){
            let i = players.findIndex(x => x.ip == req.ip);
            if(i != -1){
                let sor, osz;
                do{
                    sor = Math.floor(Math.random()*9);
                    osz = Math.floor(Math.random()*12);
                }while(!(level[sor].charAt(osz) == '.' && nemEmber(sor, osz)));
                let ujPlayer = { nev:nev, avatar:avatar, sor: sor, osz:osz, pont:0, ip:req.ip, dead:false };
                players.push(ujPlayer)
                res.send({ id:players.length-1 });
            }else{
                players[i].nev = nev
                players[i].avatar = avatar
                res.send(playres[i])
            }
        }else res.send({error:"Hiányzó paraméter"})
    }
}

function nemEmber(sor, osz){
    let ures = true;
    for (let p of players) if (p.sor == sor && p.osz == osz) ures = false
    return ures;
}

function patchMove(req,res){
    let i = players.findIndex(x => x.ip == req.ip)
    if(i != -1 && !players[i].ban && !players[i].dead){
        let {sor, osz} = players[i];
        if(req.params.key == 'w' && sor > 0 && level[sor-1].charAt(osz) == '.') sor--;
        if(req.params.key == 's' && sor < 8 && level[sor+1].charAt(osz) == '.') sor++;
        if(req.params.key == 'a' && osz > 0 && level[sor].charAt(osz-1) == '.') osz--;
        if(req.params.key == 'd' && osz < 11 && level[sor].charAt(osz+1) == '.') osz++;
        players[i].sor = sor;
        players[i].osz = osz;
        if(sor == playres[0].sor && osz == players[0].osz){
            players[i]++;
            randomCsillag();
        } 
        if(level[sor].charAt(osz) == 'B'){
            players[i].pont--;
            if(players[i].pont < 0) players[i].dead=true;
        }
        res.send(players[i])
    }else res.send({error:"Nem létező IP!"})
}
function banPlayer(req,res){
    if(req.ip == "::1"){

    } else res.send({error:"Host only!"})
}

app.get("/", (req,res)=> res.send("<h1>Ember v1.0.0</h1>"))
app.get("/level", (req,res)=> res.send(level))
app.get("/players", (req,res)=> res.send(players))
app.post("/connect", postConnect)
app.patch("/move/:id/:key", patchMove)
app.patch("/ban/:ip", banPlayer)

app.listen(88, err => {
    console.log(err?err:"Server on :88");
})