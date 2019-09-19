var coordinates, pointArray, map;
var heatMapData = [];

// Initialize map view
function showMap() {
    map = new google.maps.Map(document.getElementById('gmap'), {
          zoom: 12,
          center: new google.maps.LatLng(41.8857718, -87.6656355),
          mapTypeId: 'terrain'
        });

    var script = document.createElement("script");
    script.src = "data.js";
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Iterate through data to create markers for each address
window.geojson_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
        coordinates = results.features[i].geometry.coordinates;


        var centerCoord = new google.maps.LatLng(coordinates[0], coordinates[1]);
        heatMapData.push(centerCoord);
        var marker = new google.maps.Marker({
            position: centerCoord,
            map: map
          });


// Info window that displays full address on hover
          var address = results.features[i].properties.Full_Address;
          var weight = results.features[i].properties.ESTIMATED_MARKET_VALUE

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


    // Color gradient for estimaed market value
    //build the array


        console.log(heatMapData);

         var pointArray = new google.maps.MVCArray(heatMapData);

        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: pointArray,
          radius: 20,
          map: map
        });

        heatmap.setMap(map);


}
