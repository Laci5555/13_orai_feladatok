import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors())
app.use(express.json())


let con = await mysql.createConnection({
    host:"localhost",
    port:3306,
    database:"mozi",
    user:"root",
    password:""
});




async function getFilmek(req,res){
    let sql = "select * from filmek order by cim";
    try{
        const [json] = await con.query(sql);
        res.send(json)
    }
    catch(err) {res.send({error:err})}
}

async function postFilm(req,res) {
    let {cim,ev,hossz,imdb} = req.body;
    if(cim && ev && hossz && imdb){
        let sql = `insert into filmek set cim="${cim}", ev=${ev}, hossz=${hossz}, imdb=${imdb}`;
        try{
            const valasz = await con.query(sql);
            res.send("ok");
            console.log(valasz)
        }catch(err){res.send({error:err})}
    }else res.send({error:"Hiányzó paraméter!"})
    
}
async function putFilm(req,res) {
    let az = req.params.az;
    let {cim,ev,hossz,imdb} = req.body;
    if(cim && ev && hossz && imdb && az){
        let sql = `update filmek set cim="${cim}", ev=${ev}, hossz=${hossz}, imdb=${imdb} where faz=${az}`;
        try{
            const valasz = await con.query(sql);
            res.send("ok");
            console.log(valasz)
        }catch(err){res.send({error:err})}
    }else res.send({error:"Hiányzó paraméter!"})
    
}
async function deleteFilm(req,res) {
    let az = req.params.az;
    if(az){
        let sql = `delete from filmek where faz=${az}`;
        try{
            const valasz = await con.query(sql);
            res.send("ok");
            console.log(valasz)
        }catch(err){res.send({error:err})}
    }else res.send({error:"Hiányzó paraméter!"})
    
}


app.get("/", (req,res)=>{res.send("<h1>(°,_,°) v1.0.0</h1>")});
app.get("/filmek", getFilmek)
app.post("/film", postFilm)
app.put("/film/:az", putFilm)
app.delete("/film/:az", deleteFilm)

app.listen(88, err=>{
    console.log(err ? err : "Server on :88");
})