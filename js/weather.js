'use strict'
$(document).ready(function() {

    var temperature, highTemp, lowTemp;

    // HTML5 Geolocation.
    function getCoordinates() {
        if (navigator.geolocation) {
            // navigator.geolocation.getCurrentPosition(success);
            return navigator.geolocation;
        } else {
            alert("Failed to retrieve your coordinates.");
        }
    }

    function success(position) {
        var tempArr = [];
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude,
            key = "84d9272c2a6c08552f1e4fb558f1a98d";

        // getJSON() is a shorthand to ajax() and allows you to get the JSON object straight away.
        // additionally, "callback=?" is appended because this is making an external request and
        // treats the GET request as JSONP to work around cross site limitations.
        $.getJSON("https://api.darksky.net/forecast/" + key + '/' + latitude + ',' + longitude + "?callback=?", function(forecast) {
            // Extract values for current temperature.
            temperature = Math.floor(forecast.currently.temperature);
            highTemp = Math.floor(forecast.daily.data[0].apparentTemperatureMax);
            lowTemp = Math.floor(forecast.daily.data[0].apparentTemperatureMin);

            var humidity = forecast.currently.humidity,
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
        });

        function prettify(string) {
            return string.replace(/[/]/g, ', ').replace(/[_]/g, ' ').toUpperCase();
        }

        // Button conversion for Fahrenheight to Celcius.
        var fahrenheight = true; // is Fahrenheight.
        $(".slider").click(function() {

            // Convert to Celcius.
            if (fahrenheight) {
                $('#temperature').hide().fadeIn(2000).text(Math.floor((temperature - 32) * (5 / 9)));
                $('#high').hide().fadeIn(2000).text(Math.floor((highTemp - 32) * (5 / 9)));
                $('#low').hide().fadeIn(2000).text(Math.floor((lowTemp - 32) * (5 / 9)));
                fahrenheight = false;
                return;
            } else {
                fahrenheight = true;
                $('#temperature').hide().fadeIn(2000).text(temperature);
                $('#high').hide().fadeIn(2000).text(highTemp);
                $('#low').hide().fadeIn(2000).text(lowTemp);
                return;
            }
        });

    }

    var geoNavigator = getCoordinates();
    geoNavigator.getCurrentPosition(success);

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
