import express from "express"
import cors from "cors"
import mysql from "mysql2/promise"

const app = express()
app.use(cors())
app.use(express.json())

let con = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "raktar",
    user: "root",
    password: ""
})

async function getAutok(req,res) {
    let {tipus, ev, szin} = req.query;
    let sql = "select az,tipus,ev,szin from autok inner join szinek using(saz) "
    if(szin || tipus || ev){sql += "where "}
    if(szin){sql += `szin="${szin}" and`}
    if(tipus){sql += `tipus="${tipus}" and`}
    if(ev){sql += ` ev=${ev} and`}
    if(szin || tipus || ev){sql = sql.substring(0, sql.length-3)}
    console.log(sql)
    try{
        const [json] = await con.query(sql);
        res.send(json)
    }catch(err){res.send({error:"Adatbázis hiba"})}
}

async function getSzinek(req,res) {
    let sql = "select * from szinek"
    try{
        const[json] = await con.query(sql);
        res.send({status:"OK", content:json})
    }catch(err){res.send({error:"Adatbázis hiba"})}
}

async function postAuto(req,res) {
    let {tipus,ev,saz} = req.body
    if(tipus && ev && saz){
        let sql = `insert into autok set tipus="${tipus}", ev=${ev}, saz=${saz}`;
        try{
            const [json] = await con.query(sql);
            res.send({status:"OK", content:json})
        }catch(err){res.send({error:"Adatbázis hiba"})}
    }else res.send({error:"Hiányzó paraméter"})
}

async function putAuto(req,res) {
    let {az, tipus, ev, saz} = req.body
    if(az && tipus && ev && saz){
        let sql = `update autok set tipus="${tipus}", ev=${ev}, saz=${saz} where exists(select * from autok where az=${az}) and az=${az}`
        try{
            const [json] = await con.query(sql)
            res.send({status:"OK", content:json})
        }catch(err){res.send({error:"Adatbázis hiba"})}
    }else res.send({error:"Hiányzó paraméter"})
}

async function deleteAuto(req,res) {
    let {az} = req.params
    if(az){
        let sql = `delete from autok where exists(select * from autok where az=${az}) and az=${az}`
        try{
            const [json] = await con.query(sql)
            res.send({status:"OK"})
        }catch(err){res.send({error:"Adatbázis hiba"})}
    }else res.send({error:"Hiányzó paraméter"})
}

async function postSzin(req,res) {
    let {szin,kod} = req.body
    if(szin && kod){
        let sql = `insert into szinek set szin="${szin}", kod="${kod}"`;
        try{
            const [json] = await con.query(sql);
            res.send({status:"OK", content:json})
        }catch(err){res.send({error:"Adatbázis hiba"})}
    }else res.send({error:"Hiányzó paraméter"})
}

async function putSzin(req,res) {
    let {saz, szin, kod} = req.body
    if(saz && szin && kod){
        let sql = `update szinek set szin="${szin}", kod="${kod}" where exists(select * from szinek where saz=${saz}) and saz=${saz}`
        try{
            const [json] = await con.query(sql)
            res.send({status:"OK", content:json})
        }catch(err){res.send({error:"Adatbázis hiba"})}
    }else res.send({error:"Hiányzó paraméter"})
}

async function deleteSzin(req,res) {
    let {saz} = req.params
    if(saz){
        let presql = `select count(*) as darab from autok where saz=${saz}`
        try{
            const [json] = await con.query(presql);
            if(json[0].darab == 0){
                let sql = `delete from szinek where saz=${saz}`
                try{
                    const [json] = await con.query(sql)
                    res.send({status:"OK"})
                }catch(err){res.send({error:"Adatbázis hiba"})}
            } else res.send({error:"Használatban lévő szín"})
        }catch(err){req.send({error:"Adatbázis hiba"})}
    }else res.send({error:"Hiányzó paraméter"})
}


app.get("/", (req,res)=>res.send("<h1 style='font-size: 60px; font-style:italic; border-top:25px solid khaki; border-radius:50%; padding-left:0px; display:inline-block;'>(^,_,^)</h1>"))
app.get("/autok", getAutok)
app.get("/szinek", getSzinek)
app.post("/auto", postAuto)
app.put("/auto", putAuto)
app.delete("/auto/:az", deleteAuto)
app.post("/szin", postSzin)
app.put("/szin", putSzin)
app.delete("/szin/:saz", deleteSzin)

app.listen(88, err=>{
    console.log(err?err:"Server on :88");
})