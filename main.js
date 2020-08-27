const api = {
    key: "16a219c0efab2e95419b03c339e65d43",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        console.log(searchbox.value);
        getResults(searchbox.value);
    }
}
 function getResults(query) {
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(weather => {
         return weather.json();
     }).then(displayResults);
 }
 function displayResults(weather){
     let city=document.querySelector('.location .city');
     city.innerText=`${weather.name}, ${weather.sys.country}`;
     
     let icon=document.querySelector('.weather-icon');
     icon.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`;
     
     let now= new Date();
     let date= document.querySelector('.location .date');
     date.innerText = dateBuilder(now);

     let temp= document.querySelector('.current .temp');
     temp.innerHTML=`${Math.floor(weather.main.temp)}<span>°c</span>`;

     let desc = document.querySelector('.weather');
     desc.innerText = weather.weather[0].main;

     let maxmin= document.querySelector('.hi-low');
     maxmin.innerText=`${weather.main.temp_max}/${weather.main.temp_min}`


 }
 function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
 }