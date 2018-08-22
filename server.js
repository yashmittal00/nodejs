const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
const port=process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{

  var now=new Date().toString();
  var log=now;

  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable tp append file to server.log');
    }
  });
    console.log(log);
  next();
});

app.get('/',(req,res)=>{
res.send('<h1>hello express</h1>');
res.send({name:'yash',age:'20'});

});
app.get('/home',(req,res)=>{


  res.render('home.hbs',{
    pageTitle:'home Page',
    currentYear:new Date().getFullYear()
  });

});
app.get('/about',(req,res)=>{


  res.render('about.hbs',{
    pageTitle:'about Page',
    currentYear:new Date().getFullYear()
  });

});
app.get('/bad',(req,res)=>{

  res.send({errormessage:'unable to handle request'});
});
app.listen(port,()=>{
  console.log('Working on port'+port);
});
