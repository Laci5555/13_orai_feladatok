import express from "express"
import cors from "cors"
import mysql from "mysql2/promise"

const app = express();
app.use(express.json())
app.use(cors())

let con = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "zenek",
    user: "root",
    password: ""
});

async function getDalok(req,res) {
    let sql = "select daz,cim,ev,nev as eloado from dalok inner join eloadok using(az)"
    if(req.query.ev){sql += "where ev="+req.query.ev;}
    try{
        const [ adat ] = await con.query(sql);
        res.send(adat);
    } catch(err) {res.send({error:err})}
}

async function postDal(req,res) {
    let {cim,ev,az} = req.body;
    if(cim && ev && az){
        let sql = `insert into dalok set cim="${cim}", ev=${ev}, az=${az}`;
        try {
            const [ adat ] = await con.query(sql);
            res.send(adat)
        } catch (err) {res.send({error:err})}
    }
}

async function deleteDal(req,res) {
    let {daz} = req.body;
    if(daz){
        let sql = "delete from dalok where daz="+daz;
        try {
            const [adat] = con.query(sql);
            res.send(adat)
        } catch (error) {res.send({error:err})} 
    }
}

async function patchCim(req,res) {
    let {daz,cim} = req.body;
    if(daz && cim){
        let sql = `update dalok set cim="${cim}" where daz=${daz}`;
        try {
            const [adat] = con.query(sql);
            res.send(adat)
        } catch (error) {res.send({error:err})} 
    }
}

async function patchEv(req,res) {
    let {daz,ev} = req.body;
    if(daz && ev){
        let sql = `update dalok set ev="${ev}" where daz=${daz}`;
        try {
            const [adat] = con.query(sql);
            res.send(adat)
        } catch (error) {res.send({error:err})} 
    }
}

async function getEloadok(req,res) {
    let sql = `select az,nev,orszag from eloadok`;
    if(req.query.orszag){
        sql += ` where orszag="${req.query.orszag}"`
    } 
    try {
        const [adat] = con.query(sql);
        res.send(adat)
    } catch (error) {res.send({error:err})}
}

async function postEloado(req,res) {
    let {nev,orszag} = req.body;
    if(nev && orszag){
        let sql = `insert into eloadok set nev="${nev}", orszag="${orszag}"`;
        try {
            const [adat] = con.query(sql);
            res.send(adat)
        } catch (error) {res.send({error:err})}
    }
}

async function putEloado(req,res) {
    let {az,nev,orszag} = req.body;
    if(az && nev && orszag){
        let sql = `update eloadok set nev="${nev}", orszag="${orszag}" where az=${az}`;
        try {
            const [adat] = con.query(sql);
            res.send(adat)
        } catch (error) {res.send({error:err})}
    }
}

async function deleteEloado(req,res) {
    let {az} = req.body;
    if(az){
        let teszt = `select count(*) from dalok where az=${az}`;
        try{
            const [adat] = await con.query(sql);
            if(adat[0].db == 0){
                let sql = "delete from eloado where az="+az;
                try {
                    const [adat] = con.query(sql);
                    res.send(adat)
                } catch (error) {res.send({error:err})}
            }else res.send({error:"Az előadóhoz kapcsolódik zene!"})
        }catch(err){res.send({error:err})}
    }
}

app.get("/", (req,res)=>res.send("(-_-)"))
app.get("/dalok", getDalok)
app.post("/dal", postDal)
app.delete("/dal", deleteDal)
app.patch("/cim", patchCim)
app.patch("/ev", patchEv)
app.get("/eloadok", getEloadok)
app.post("/eloado", postEloado)
app.put("/eloado", putEloado)
app.delete("/eloado/:az", deleteEloado)


app.listen(88, err=>{
    console.log(err?err:"Server on :88");
})