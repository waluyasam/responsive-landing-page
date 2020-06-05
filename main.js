const time = document.getElementById('time');


(function dateTime() {
    //set date and time
    let realTime = new Date(),
    newDay = realTime.getDay(),
    newMonth = realTime.getMonth(),
    newYear = realTime.getFullYear(),
    newHour = realTime.getHours(),
    newMin = realTime.getMinutes(),
    newSec = realTime.getSeconds();


    //set to 12hr time
    newHour = newHour % 12 || 12;
    // show am or pm
    let amPm = newHour >= 12 ? 'PM' : 'AM';

 time.innerHTML = `${appendZero(newDay)}<span>/</span>${appendZero(newMonth)}
                    <span>/</span>${appendZero(newYear)}<span> </span>
                    ${appendZero(newHour)}<span>:</span>${appendZero(newMin)}<span>:</span>${appendZero(newSec)} ${amPm}`;

    setTimeout(dateTime, 1000);
}()); //function not to be called

//add zero to single numbers
function appendZero(val) {
    return parseInt(val, 10) <= 10 ? '0' + val : val;
}

//set the background images
(function setBackground() {
    let images = ['url(./img/afternoon.jpg)', 'url(./img/evening.jpg)',
                'url(./img/morning.jpg)', 'url(./img/night.jpeg)',
                    'url(./img/s1.jpg)', 'url(./img/s2.jpg)',
                'url(./img/s3.jpg)', 'url(./img/s4.jpg)',
                'url(./img/s5.jpg)'];
    //select the images randomly
    let i = Math.floor(Math.random()*8);
    document.body.style.backgroundImage = images[i];
    setTimeout(setBackground, 50000); //image changes after every 50 seconds
}()); //function not to be called


//set the greeting to change depending on the time of the day
(function greeting() {
    const greet = document.getElementById('salute');
    const wish = document.getElementById('wish');
    let realTime = new Date(),
    newHour = realTime.getHours();

    if (newHour < 12) {
        greet.textContent = 'Good morning';
        wish.innerText = 'morning!';
    } else  if (newHour < 18) {
        greet.textContent = 'Good afternoon';
        wish.innerText = 'afternoon!';
    } else  {
        greet.textContent = 'Good evening';
        wish.innerText = 'evening!';
    }

}()); //function not to be called


//SETTING THE WEATHER
const notify = document.querySelector('.notification');
const icon = document.querySelector('.weather-icon');
const tempVal = document.querySelector('.temperature-value');
const tempDes = document.querySelector('.temperature-description');
const locate = document.querySelector('.location');

let weather = {};

weather.temperature = {
    unit: "celsius",
}

//constants
let kelvin = 273;
let key = '3208461580527e13d92dd3675ceba815';

//check if browser supports geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getPosn, throwError)
} else {
    notify.innerHTML = "<p>Browser does not support geolocation</p>";
}

//set user position
function getPosn(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    getWeather(lat, lng);
}

//show error if geolocation has errors

function throwError(error) {
    notify.innerHTML = `<p>${error.message}</p>`;
}

//get weather from api
function getWeather(lat, lng) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json()
            return data;
        }) .then(function (data) {
                weather.temperature.value = Math.floor(data.main.temp - kelvin);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
    }).then(function () {
            showWeather();
    })
}

function showWeather() {
    icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempVal.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempDes.innerHTML = weather.description;
    locate.innerHTML = `${weather.city}, ${weather.country}`;
}

const name = document.getElementById('name');

(function enterName() {

    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}());

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

function setName(e) {
    if (e.type === 'keypress') {
        if (e.keyCode === 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }
};








