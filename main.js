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
     let city=document.querySelector('.location');
     city.innerText=`${weather.name}, ${weather.sys.country}`;
     
     let icon=document.querySelector('.icon-area');
     icon.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`;
     var imgbg= weather.weather[0].icon;
     console.log(imgbg);
     if(imgbg === "01n" || imgbg === "02n" || imgbg === "03n" || imgbg === "04n" || imgbg === "09n" || imgbg === "10n" || imgbg === "13n" || imgbg === "50n"){
         
         document.getElementById("d").style.backgroundImage= "url('images/bg-night.png')";
     }
     else{
        document.getElementById("d").style.backgroundImage= "url('images/bg-day.png')";
     }
     
     let now= new Date();
     let date= document.querySelector('.date');
     date.innerText = dateBuilder(now);

     let temp= document.querySelector('.temp-value');
     temp.innerHTML=`${Math.floor(weather.main.temp)}<span>°c</span>`;

     let desc = document.querySelector('.weather-desc');
     desc.innerHTML = `<u><label>Type</label></u><br>${weather.weather[0].main}`;

     let maxmin= document.querySelector('.maxmin');
     maxmin.innerHTML=`<u><label>Min/Max</label></u><br>${weather.main.temp_max}/${weather.main.temp_min}`;

     let humid = document.querySelector('.humidity');
     humid.innerHTML= `<u><label>Humid</label></u><br>${weather.main.humidity}%`;


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
 