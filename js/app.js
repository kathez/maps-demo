/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

$(document).ready(function() {
    function createMap(center, zoom) {
        var mapElem = document.getElementById('map');

        var map = new google.maps.Map(mapElem, {
            center: center,
            zoom: zoom
        });

        var marker = new google.maps.Marker( {
            position: center,
            map: map,
            animation: google.maps.Animation.DROP
        });

        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent('<p>OMG I am HERE!!!</p>'); // later change to traffic information

        google.maps.event.addListener(marker, 'click', function() {
            console.log('marker clicked!');
            infoWindow.open(map,marker);
            map.panTo(marker.getPosition());
        }); //(thing clicked, action, function)
    } //createMap()

    function onGeoSuccess(position) {
        var center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }

        createMap(center, 14);
    } // onGeoSuccess()

    function onGeoError(error) {
        console.log(error);
    } // onGeoError --> if user doesn't allow the position request, it will go through error

    var uwCoords = {
        lat: 21.1606,
        lng: -86.8475
    };

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
//            enableHighAccuracy: true //will fire the GPS if available
        });
    }
    else {
        createMap(uwCoords, 10);
    }

    createMap(uwCoords, 14); // 0 - 21
}); // On doc ready