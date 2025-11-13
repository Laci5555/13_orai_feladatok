import express from "express"
import cors from "cors"
import mysql from "mysql2/promise"

const app = express()
app.use(cors())
app.use(express.json())

let con = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "napom",
    user: "root",
    password: ""
})

async function getNapok(req,res) {
    let sql = "select az,nap,ido,hangulat,kep from adat inner join hangulat using(haz) order by nap,ido"
    try {
        const [json] = await con.query(sql)
        res.send(json)
    } catch (err) {res.send({error:err})}
}

async function getHangulat(req,res) {
    let sql = "select haz,hangulat from hangulat"
    try {
        const [json] = await con.query(sql)
        res.send(json)
    } catch (err) {res.send({error:err})}
}

async function postNap(req,res) {
    let {nap,ido,haz} = req.body;
    if(nap && ido && haz){
        let sql = `insert into adat set nap="${nap}", ido="${ido}", haz=${haz}`
        try {
            const [json] = await con.query(sql)
            res.send({status:"OK"})
        } catch (err) {res.send({error:err})}
    }else res.send({error:"Hiányzó paraméter"})
    
}

async function deleteNap(req,res) {
    let az = req.params.az
    if(az){
        let sql = `delete from adat where az=${az}`
        try {
            const [json] = await con.query(sql)
            res.send({status:"OK"})
        } catch (err) {res.send({error:err})}
    } else res.send({error:"Hiányzó paraméter"})
}

async function patchHangulat(req,res) {
    let {az,haz} = req.body;
    if(az && haz){
        let sql = `update adat set haz=${haz} where az=${az}`
        try {
            const [json] = await con.query(sql)
            res.send({status:"OK"})
        } catch (err) {res.send({error:err})}
    }else res.send({error:"Hiányzó paraméter"})
}

app.get("/", (req,res)=>res.send("<h1 style='font-size: 60px; font-style:italic; border-top:25px solid khaki; border-radius:50%; padding-left:0px; display:inline-block;'>(^,_,^)</h1>"))
app.get("/napok", getNapok)
app.get("/hangulat", getHangulat)
app.post("/nap", postNap)
app.delete("/nap/:az", deleteNap)
app.patch("/hangulat", patchHangulat)

app.listen(88, err=>{
    console.log(err?err:"Server on :88");
})