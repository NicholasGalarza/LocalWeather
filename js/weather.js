$(document).ready(function() {
    // HTML5 Geolocation.
    function getCoordinates() {
        var key = "84d9272c2a6c08552f1e4fb558f1a98d";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        } else {
            alert("Failed to retrieve your coordinates.");
        }

        function success(position) {
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude;

            $.getJSON("https://api.darksky.net/forecast/" + key + '/' + latitude + ',' + longitude + "?callback=?", function(forecast) {
                console.log(forecast);
            });
        }
    }
    getCoordinates(); // <-- hopefully this works.
});

/*
var xhr = new XMLHttpRequest(),
    darkSkyHTTP = "https://api.darksky.net/forecast/" + key + '/' + lat + ',' + long;
xhr.open('GET', darkSkyHTTP, true);
xhr.send();
xhr.onreadystatechange = processRequest;
xhr.addEventListener("readystatechange" , processRequest, false);

function processRequest(e) {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var weatherData = JSON.parse(xhr.responseText);
    alert(weatherData);
  }
}
*/
