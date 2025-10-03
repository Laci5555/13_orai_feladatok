import express from "express"
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json())

let jatekok = [{id:0, nev:"null", negyzet:[1, 2, 3, 4, 5, 6, 7, 8, 9]}]
let szintek = [[ 2, 9, 0, 7, 0, 0, 0, 1, 8 ], [ 4, 9, 0, 3, 0, 0, 0, 0, 6 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]]

function hiany(negyzet){
    let t = []
    for(let i = 1;i<10;i++){
        if(!negyzet.includes(i)){
            t.push(i)
        }
    }
    return t
}

function osszeg(negyzet){
    let db = 0;
    let s1 = negyzet[0] + negyzet[1] + negyzet[2]; if (s1 == 15) db++;
    let s2 = negyzet[3] + negyzet[4] + negyzet[5]; if (s2 == 15) db++;
    let s3 = negyzet[6] + negyzet[7] + negyzet[8]; if (s3 == 15) db++;
    let o1 = negyzet[0] + negyzet[3] + negyzet[6]; if (o1 == 15) db++;
    let o2 = negyzet[1] + negyzet[4] + negyzet[7]; if (o2 == 15) db++;
    let o3 = negyzet[2] + negyzet[5] + negyzet[8]; if (o3 == 15) db++;
    let a1 = negyzet[2] + negyzet[4] + negyzet[6]; if (a1 == 15) db++;
    let a2 = negyzet[0] + negyzet[4] + negyzet[8]; if (a2 == 15) db++;
    return {s1:s1, s2:s2, s3:s3, o1:o1, o2:o2, o3:o3, a1:a1, a2:a2, ok:db}
}

app.get("/", (req,res) => res.send("<h1>Bűvös négyzet v1.0.0</h1>"))
app.get("/jatekok", (req,res)=>{
    res.send(jatekok)
})
app.post("/uj", (req,res)=>{
    let {nev, szint} = req.body
    if(nev && szint){
        let id = jatekok.length
        let negyzet = [...szintek[szint-1]]
        jatekok.push({
            id:id,
            nev:nev,
            negyzet: negyzet
        })
        res.send({id:id, negyzet:negyzet, hiany:hiany(negyzet), osszeg:osszeg(negyzet)})
    }else{
        res.send({error:"Hiányzó paraméter"})
    }
})
app.patch("/szam", (req,res)=>{
    let {id, szamId, szam} = req.body
    if(id && szamId && szam){
        let index = jatekok.findIndex(x => x.id == id)

        if(index != -1){
            jatekok[index].negyzet[szamId-1] = szam
            res.send({id:id, negyzet:jatekok[index].negyzet, hiany:hiany(jatekok[index].negyzet), osszeg:osszeg(jatekok[index].negyzet)})
        }else{
            res.send({error:"Nincs ilyen index"})
        }
    }else{
        res.send({error:"Hiányzó paraméter"})
    }
})



app.listen(88, err => {
    console.log(err ? err : "Server on :88");
})