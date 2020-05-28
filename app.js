const express = require('express');
const app = express();
const path = require('path');
const geocode = require('./src/util/geocode');
const weather = require('./src/util/weather');

// This is for static dir
const htmlpath = path.join(__dirname, './public');
// const jspath = path.join(__dirname, './public/javascript');
app.use(express.static(htmlpath));
// app.use(express.static(jspath));

app.set("view engine", "ejs");
app.set("views", "views");



app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Saurabh"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About"
    })
});

// THIS IS FOR QUERY STRING

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: "No address was there"
        });
    }
// Use of {} so that program not crash {} work as default value    
    geocode(req.query.address, (error, { latitude, longitude ,location } = {} ) =>{
           if(error){
               return res.send({ error });
           }
           weather(latitude, longitude, (error, weatherdata) =>{
                  if(error){
                      return res.send(error);
                  }
                 res.send({
                     weather: weatherdata,
                     location,
                     address: req.query.address
                 }) 
           });
    });
});


app.get('*', (req, res) =>{
    res.render("404", {
        title: "404 Page"
    });
});



app.listen(3000);