var coordinates;
var map;
function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
          zoom: 10,
          center: new google.maps.LatLng(41.869053399999899,-87.665418399999893),
          mapTypeId: 'terrain'
        });

    var script = document.createElement("script");
    script.src = "data.js";
    document.getElementsByTagName("head")[0].appendChild(script);
}

window.geojson_callback = function(results) {
    for (var i = 0; i < results.features.length; i++) {
        console.log(results.features[i].geometry.coordinates);
        coordinates = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coordinates[1],coordinates[0]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
    }
}
