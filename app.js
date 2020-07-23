require('dotenv').config()

//console.log(process.argv[2])

const address = process.argv[2];

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

if(!address){
  console.log('Please provide an address');
}else{
  geocode(address, (error,{latitude,longitude,location}={})=>{
    if(error){
      return console.log(error);
    }
    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return console.log(error);
      }
      console.log(location);
      console.log(forecastData);
    });
  });
  
}
