'use strict'

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(assignPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function assignPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
}

getLocation();
var lat, long, key = "84d9272c2a6c08552f1e4fb558f1a98d";
var xhr = new XMLHttpRequest(),
    darkSkyHTTP = "https://api.darksky.net/forecast/" + key + '/' + lat + ',' + long;
xhr.open('GET', "", true);
