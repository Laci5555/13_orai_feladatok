import express from "express"
import cors from "cors"
import mysql from "mysql2/promise"

const app = express()
app.use(cors())
app.use(express.json())

let con = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "monitor",
    user: "root",
    password: ""
});

async function getMonitorok(req,res){
    let sql = "SELECT * FROM `monitor` order by tipus asc"
    const [ json ] = await con.query(sql);
    res.send(json)
}

async function postMonitor(req,res) {
    let {tipus, meret} = req.body
    if(tipus && meret){
        let sql = "Insert into monitor set tipus = ?, meret = ?"
        const [ json ] = await con.query(sql, [tipus, meret]);
        res.send({text:"Monitor hozzáadva!"})
    }else{
        req.status(400).send({error:"Hibás paraméter!"})
    }
}

async function delMonitor(req,res) {
    let {id} = req.params
    if(id){
        let sql = "DELETE from monitor where id = ?"
        const [ json ] = await con.query(sql, [id]);
        res.send({text:"Monitor törölve!"})
    }else{
        req.status(400).send({error:"Hibás paraméter!"})
    }
}

app.get("/", (req,res) => res.send("(-_-)"))
app.get("/monitorok", getMonitorok)
app.post("/monitor", postMonitor)
app.delete("/monitor/:id", delMonitor)

app.listen(88, err =>{
    console.log(err?err:"Server on :88");
})