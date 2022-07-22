'use strict';
const express= require('express');
const app=express()
const nodemailer = require('nodemailer');
var bodyParser =require('body-parser');
const { stringify } = require('querystring');
const fs=require('fs');

const rawdata = fs.readFileSync('dataform.json');
const data=JSON.parse(rawdata);
const port=process.env.PORT || 8000;


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/Audios', express.static(__dirname + '/public/Audios'));
app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/JavaScript', express.static(__dirname + '/public/JavaScript'));


const saveData= function(data,file){
    const finished=(error)=>{
        if (error){
            console.error(error);
            return;
        }
    }

    const jsonData=JSON.stringify(data,null,2);
    fs.writeFile(file,jsonData,finished);
   
}


const lib = require("./server");


const saveUser = function(body){
 
    const newUser ={
        name:body.name,
        phone:body.phone,
        address:body.address,
        email:body.email,
        comment:body.comments
    }
data[body.name]=newUser;
saveData(data,'dataform.json');
}


app.post('/sendform',function(req,res) {
    saveUser(req.body);
    lib.smail(req.body.email,req.body.name);
    res.redirect('/'); 
 
})



app.get('/',function(req,res){
    res.sendFile(__dirname + '/pages/index.html');
})


app.get('/nashpictures',function(req,res){
    res.sendFile(__dirname + '/pages/nashpics.html');
})


app.get('/miamipictures',function(req,res){
    res.sendFile(__dirname + '/pages/miami_pics.html');
})

app.get('/newOrpics',function(req,res){
    res.sendFile(__dirname + '/pages/newOr_pics.html');
})

app.get('/game',function(req,res){
    res.sendFile(__dirname + '/pages/game.html');
})




app.listen(port,()=>{
    console.log("server running on port " + port);
})