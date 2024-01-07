import express from "express";
import { fileURLToPath } from "url";
import {dirname} from "path";
import bodyParser from "body-parser";

const pt=dirname(fileURLToPath(import.meta.url));
const app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(pt+"/public"))

app.listen("3000",function(req,res)
{
    console.log("Listening");
})

app.get("/",function(req,res)
{
    res.sendFile(pt+"/public/index.html",pt+"/public/style.css")
})

async function chargen(charname) {
    const url = `https://gateway.marvel.com/v1/public/characters?name=${charname}&ts=1&apikey=b6c3f2617e4c10fa730ba5386e70f97d&hash=ea81d9d362afd16ba3d5d4b01e930ac3`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.data.results[0].thumbnail); 
      return data; 
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }

  }
  
app.post("/set",function(req,res)
{
    const a=req.body["name"];
    console.log(a);
    chargen(a);
    res.sendFile(pt+"/public/new.html",pt+"/public/istyle.css")
})

// const pk="b6c3f2617e4c10fa730ba5386e70f97d";
// const hk="ea81d9d362afd16ba3d5d4b01e930ac3";
