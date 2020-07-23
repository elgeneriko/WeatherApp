console.log('Client side Js file loaded');

const weatherForm =document.querySelector('#search-form');
const searchButton = document.querySelector('#search-button')
const Location = document.querySelector('#location');
const Temp = document.querySelector('#temp');
const Feel = document.querySelector('#feel');
const Desc = document.querySelector('#desc');
const cardImg = document.querySelector('#card-img')

searchButton.addEventListener('click',(e)=>{
    const location = weatherForm.value;
    console.log(location);
    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
           console.log(data.error); 
        }else{
            const location = data.location;
            const imgLink = data.forecast.current.weather_icons;
            const actualTemp = data.forecast.current.temperature;
            const description = data.forecast.current.weather_descriptions;
            const feelTemp = data.forecast.current.feelslike;
            console.log(location);
            cardFiller(location,imgLink,actualTemp,description,feelTemp);
        }
    });
});
});

function cardFiller(location,imgLink,actualTemp,description,feelTemp){
    Location.innerHTML = location;
    Temp.innerHTML = "It is " + actualTemp + "° C";
    Feel.innerHTML = "Feels like " + feelTemp + "°C";
    Desc.innerHTML = description;
    cardImg.src = imgLink;
}