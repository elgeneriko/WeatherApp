const request = require('request');

const forecast = (lat,long,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=7d4c7a60db4e3d2426de8fb9fdff571c&query="+lat+","+long;
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback('Unable to connect to location services');
      }else if(response.body.error){
        callback('Unable to find location. Try another search')
      }else{
        callback(undefined,{
          current: response.body.current,
          temperature: response.body.current.temperature
        })
      }
    })
  
  }
module.exports = forecast