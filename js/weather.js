'use strict'
$(document).ready(function() {

    var temperature, highTemp, lowTemp, icon;
    var skycons = new Skycons({
        "color": "snow"
    });

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
            icon = forecast.currently.icon;

            if (icon === "clear-day") {
                skycons.add(document.getElementById("icon"), Skycons.CLEAR_DAY);
            } else if (icon === "clear-night") {
                skycons.add(document.getElementById("icon"), Skycons.CLEAR_NIGHT);
            } else if (icon === "partly-cloudy-day") {
                skycons.add(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_DAY);
            } else if (icon === "partly-cloudy-night") {
                skycons.add(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_NIGHT);
            } else if (icon === "cloudy") {
                skycons.add(document.getElementById("icon"), Skycons.CLOUDY);
            } else if (icon === "rain") {
                skycons.add(document.getElementById("icon"), Skycons.RAIN);
            } else if (icon === "sleet") {
                skycons.add(document.getElementById("icon"), Skycons.SLEET);
            } else if (icon === "snow") {
                skycons.add(document.getElementById("icon"), Skycons.SNOW);
            } else if (icon === "wind") {
                skycons.add(document.getElementById("icon"), Skycons.WIND);
            } else {
                skycons.add(document.getElementById("icon"), Skycons.FOG);
            }
            skycons.play();

            var humidity = forecast.currently.humidity,
                summary = forecast.currently.summary,
                precipChance = forecast.currently.precipProbability,
                windSpeed = forecast.currently.windSpeed,
                location = forecast.timezone;

            // Apply values to the HTML.
            $('#location').text(prettify(location));
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
