'use strict'
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

            // getJSON() is a shorthand to ajax() and allows you to get the JSON object straight away.
            // additionally, "callback=?" is appended because this is making an external request and
            // treats the GET request as JSONP to work around cross site limitations.
            $.getJSON("https://api.darksky.net/forecast/" + key + '/' + latitude + ',' + longitude + "?callback=?", function(forecast) {
                // Extract values for current temperature.
                var temperature = Math.floor(forecast.currently.temperature),
                    highTemp = Math.floor(forecast.daily.data[0].apparentTemperatureMax),
                    lowTemp = Math.floor(forecast.daily.data[0].apparentTemperatureMin),
                    humidity = forecast.currently.humidity,
                    icon = forecast.currently.icon,
                    summary = forecast.currently.summary,
                    precipChance = forecast.currently.precipProbability,
                    windSpeed = forecast.currently.windSpeed,
                    location = forecast.timezone;

                // Apply values to the HTML.
                $('#location').text(prettify(location));
                $('#icon').text(icon);
                $('#temperature').text(temperature);
                $('#high').text(highTemp);
                $('#low').text(lowTemp);
                $('#precipChance').text(precipChance);
                $('#summary').text('"' + summary + '"');
                $('#windSpeed').text(windSpeed);
                $('#humidity').text(humidity);

                console.log(forecast);
                // console.log(forecast.currently.humidity);
            });
        }

        function prettify(string) {
            return string.replace(/[/]/g, ', ').replace(/[_]/g, ' ').toUpperCase();
        }
    }

    getCoordinates(); // <-- hopefully this works.
    // Button conversion for Fahrenheight to Celcius.
    var fahrenheight = true; // is Fahrenheight.
    $("#switch-button").click(function() {
        // Convert to Celcius.
        if (fahrenheight) {
            $('#temperature').text(Math.floor((temperature - 32) * (5 / 9)));
            $('#high').text(Math.floor((highTemp - 32) * (5 / 9)));
            $('#low').text(Math.floor((lowTemp - 32) * (5 / 9)));
            fahrenheight = false;
            return;
        } else {
            fahrenheight = true;
            $('#temperature').text(temperature);
            $('#high').text(highTemp);
            $('#low').text(lowTemp);
            return;
        }
    });
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
