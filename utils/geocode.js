const request = require('request');

const geocode = (adress,callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(adress)+".json?access_token=pk.eyJ1IjoiYXJqdW5nb3BpIiwiYSI6ImNrY2JsemVmZzF1aHQyeWxqMTBsMnB5YmkifQ.EdJeOJRz0Yh-80KXDGHBkQ";
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback('Unable to connect to location services');
      }else if(response.body.features.length === 0){
        callback('Unable to find location. Try another search')
      }else{
        callback(undefined,{
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name
        })
      }
    })
  
  }

  module.exports = geocode