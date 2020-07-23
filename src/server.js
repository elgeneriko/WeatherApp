const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
app.use(express.static(publicPath));

hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather'
    });    
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                __dirname
            });
        });
    });
});

app.get('/help',(req,res)=>{
    res.render('help');
});

app.get('*',(req,res) =>{
    res.render('404');
});

app.listen(port,()=>{
    console.log('Server started');
});