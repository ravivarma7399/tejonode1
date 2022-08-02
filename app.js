
const express= require('express');
const app=express()
const nodemailer = require('nodemailer');
var bodyParser =require('body-parser');
const port=process.env.PORT || 8000;
const mongoose = require('mongoose');
const {Schema}=mongoose;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/Audios', express.static(__dirname + '/public/Audios'));
app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/JavaScript', express.static(__dirname + '/public/JavaScript'));



const lib = require("./server");






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



app.get('/Thankyou',function(req,res){
    res.sendFile(__dirname + '/pages/Thankyou.html');
})

app.get('/ThankyouUser',function(req,res){
    res.sendFile(__dirname + '/pages/ThankyouUser.html');
})

const DB='mongodb+srv://ravivarma07:abcd1234@cluster0.0jgkvpn.mongodb.net/Feedbackcheck?retryWrites=true&w=majority';

mongoose.pluralize(null);
mongoose.connect(DB,{useNewUrlParser: true},(err)=>{
    if(!err){
        console.log("Connected");
    }
    else  {   
         console.log("Not Connected");}
    
});

const postfSchema =new Schema({
    name:{type: String,required:true},
    phone:{type: String,required:true},
    address:{type: String,required:true},
    email:{type: String,required:true},
    comments:{type: String,required:true}
});

 const feedModel=mongoose.model('Feedbackform',postfSchema);


app.post('/addform',function(req,res){
   console.log(req.body);
    const feedData =new feedModel(req.body)
      feedModel.findOne({email:req.body.email},(error,resp)=>{
        if(error){
            console.log("Error:" +error);
        }
        else{ 
            if(resp!=null){
            console.log("DATA: "+resp);
           feedModel.findOneAndUpdate({email: req.body.email }, 
                {comments:req.body.comments,name:req.body.name,phone:req.body.phone,address:req.body.address}, null, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Original Doc : ",docs);
                }
            });

                  lib.smail(req.body.email,req.body.name);
                              console.log("user updated");
                  
                              feedModel.countDocuments({}, function(err,count) {
                                  if (err) { return handleError(err) } //handle possible errors
                                  console.log("Count: "+count);
                                  res.redirect('/ThankyouUser');

           })
          }
          else{
            feedData.save(function(err){
                if(!err){
                    lib.smail(req.body.email,req.body.name);
                    console.log("user added");
        
                    feedModel.countDocuments({}, function(err,count) {
                        if (err) { return handleError(err) } //handle possible errors
                        console.log("Count: "+count);
                        res.redirect('/Thankyou/?count='+count);
                       
                    })
                      
                    
                }
                else
                { res.send("user not added");
                console.log("user not added");
        
                }
            })
          }
        }
      })


  
})



app.listen(port,()=>{
    console.log("server running on port " + port);
})