const iconId = document.querySelector('.weather-icon');
const tempValue = document.querySelector('.temperature-value');
const tempDescription = document.querySelector('.temperature-description');
const cityLocation = document.querySelector('.location');
const currentTime = document.querySelector('.current-time');
const apiKey = "fb263e6f19901b41b57d73ab98b0548e";
const searchLat = document.getElementById('loc_lat');
const searchLong = document.getElementById('loc_long');
const prevision = document.querySelector('.prevision')


let fetchFunction = function (url) {
    fetch(url)
        .then((response) =>
            response.json().then((data) => {
                console.log(data);
                cityLocation.innerHTML = data.city.name;
                tempValue.innerHTML = Math.floor(data.list[0].main.temp) + "°C";
                tempDescription.innerHTML = data.list[0].weather[0].description;
                currentTime.innerHTML = data.list[0].dt_txt;
                iconId.innerHTML = "<img src = " + data.list[0].weather[0].icon + ".png" + " > ";


                let html = "";
                for (let number = 1; number <= 5; number++) {
                    html += "<img src = " + data.list[number].weather[0].icon + ".png" + " > " + Math.floor(data.list[number].main.temp) + data.list[number].dt_txt;
                }
                prevision.innerHTML = html;
            }))
}


/* demande de géolocalisation */

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
} else {
    notification.style.display = "block";
    notification.innerHTML = "<p>Le navigateur ne supporte pas la géolocalisation</p>";
};

/* enregistre les coordonnées de l'utilisateur , envoie la requette a http://openweather.com/ ,  */
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;

    fetchFunction(apiUrl)

    /* autocomplétion avec une fonctionnalité google */
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

    /* function requete a l'api quand l'utilisateur saisie dans l'input */


    let apiCall = function (city) {
        let searchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`

        fetchFunction(searchUrl)
    };

    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        let city = document.querySelector('#inputCity').value;

        apiCall(city);
    });
}
