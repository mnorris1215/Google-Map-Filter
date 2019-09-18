var coordinates;
var map;
function showMap() {
    map = new google.maps.Map(document.getElementById('gmap'), {
          zoom: 13,
          center: new google.maps.LatLng(41.8857718, -87.6656355),
          mapTypeId: 'terrain'
        });

    var script = document.createElement("script");
    script.src = "data.js";
    document.getElementsByTagName("head")[0].appendChild(script);
}


window.geojson_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
        coordinates = results.features[i].geometry.coordinates;

        var centerCoord = new google.maps.LatLng(coordinates[0], coordinates[1]);

        var marker = new google.maps.Marker({
            position: centerCoord,
            map: map
          });

          var address = results.features[i].properties.Full_Address;

          var infowindow = new google.maps.InfoWindow({
              content: address
            });

    (function(infowindow) {

        google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, this);
        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });

        })(infowindow);
    }
}
