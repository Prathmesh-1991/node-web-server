const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000 ;

var app = express();
app.set('view engine','hbs')


hbs.registerPartials(__dirname+'/views/partials');

app.use((req,res,next) =>
{
var now = new Date().toString();
var log = `${now} : ${req.method} : ${req.url}`;
fs.appendFile('server.log',log + '\n', (err) =>{
  if(err)
    {
      console.log('Unable to write to server.log');
    }
})
next();
});

/*app.use((req,res,next) =>
{
  res.render('maintenance.hbs',{
    titlePage: 'Maintenance Page',
    message: 'Sorry for inconvenience.Site is under construction'
});
});*/

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIT',(text) => {
  return text.toUpperCase();
})

app.get('/',(req,res) =>
{
  //res.send('<H1>Hi from Express<h>');
/*  res.send({
  name: 'Prathmesh',
  like:[
  'Car',
  'Bike'
  ]
});*/
res.render('home.hbs',{
    titlePage: 'Home Page',
    message: 'Welcome to my HomePAGE'
    //currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
//res.send('This page give details about page');
res.render('about.hbs',{
    titlePage: 'About'
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
res.send({
errorMessage: 'Unable to handle request'
  });
});
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
