const iconId = document.querySelector('.weather-icon');
const tempValue = document.querySelector('.temperature-value');
const tempDescription = document.querySelector('.temperature-description');
const cityLocation = document.querySelector('.location');
const currentTime = document.querySelector('.current-time');
const apiKey = "fb263e6f19901b41b57d73ab98b0548e";
const searchLat = document.getElementById('loc_lat');
const searchLong = document.getElementById('loc_long');
const prevision = document.querySelector('.prevision')


function googleAutoComplete(position) {
    var searchInput = 'search_input';

    $(document).ready(function () {
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('inputCity')), {
            types: ['geocode'],
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var near_place = autocomplete.getPlace();
            searchLat.value = near_place.geometry.location.lat();
            searchLong.value = near_place.geometry.location.lng();

        });

    });

    $(document).on('change', '#' + searchInput, function () {
        document.getElementById('latitude_input').value = '';
        document.getElementById('longitude_input').value = '';

    }
    );
}



function fillUpHtml(data) {

    cityLocation.innerHTML = data.city.name;
    tempValue.innerHTML = Math.floor(data.list[0].main.temp) + "°C";
    tempDescription.innerHTML = data.list[0].weather[0].description;
    currentTime.innerHTML = data.list[0].dt_txt;
    iconId.innerHTML = "<img src = " + data.list[0].weather[0].icon + ".png" + " > ";


    /* boucle pour les icons*/
    let html = "";
    for (let number = 1; number <= 5; number++) {
        html += "<img src = " + data.list[number].weather[0].icon + ".png" + " > " + Math.floor(data.list[number].main.temp) + "°C "+ data.list[number].dt_txt;
    }
    prevision.innerHTML = html;

    
}



let getWeather = function (url) {
    fetch(url)
        .then((response) =>
            response.json().then((data) => {
                console.log(data);
                fillUpHtml(data);
            }))
}


/* demande de géolocalisation */

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
} else {
    notification.style.display = "block";
    notification.innerHTML = "<p>Le navigateur ne supporte pas la géolocalisation</p>";
   
};


function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;

    getWeather(apiUrl);
    googleAutoComplete(position);


}


let apiCall = function (city) {
    let searchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    getWeather(searchUrl);
};


document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    let city = document.querySelector('#inputCity').value;

    apiCall(city);
});

function celsiusToFahrenheit(temperature){
    return(temperature * 9/5) + 32 ;
}




  


tempValue.addEventListener('click',function(){
    
})

let degre = parseInt(tempValue.textContent.split("°C")[0])
    let fahrenheit = celsiusToFahrenheit(degre);