var coordinates, pointArray, map, marker;
var heatMapData = [];
var markerprops = [];
var filteredArray = [];

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

// Iterate through data to create markers for each coordinate
window.geojson_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
        coordinates = results.features[i].geometry.coordinates;


        var centerCoord = new google.maps.LatLng(coordinates[0], coordinates[1]);
        heatMapData.push(centerCoord);
         marker = new google.maps.Marker({
            position: centerCoord,
            map: map,
            properties: results.features[i].properties
          });
          markerprops.push(marker);



// Info window that displays full address on hover
      var address = results.features[i].properties.Full_Address;
      var weight = results.features[i].properties.ESTIMATED_MARKET_VALUE;

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
    var pointArray = new google.maps.MVCArray(heatMapData);
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointArray,
      radius: 20,
      map: map
    });

    heatmap.setMap(map);
}




// Function to filter markers by category

function dropDownLists(category, options){
    var description = ['Two to Six Apartments, Over 62 Years', 'Mixed commercial/residential building, 6 units or less, sq ft less than 20,000', 'Two or three story non-fireproof corridor apartments,or california type apartments, interior entrance','Two or three story non-frprf. crt. and corridor apts or california type apts, no corridors, ex. entrance','Mixed use commercial/residential with apts. above seven units or more or building sq. ft. over 20,000'];
    var street = ['JUSTINE', 'TAYLOR', 'HARRISON','POLK','LAFLIN','FILLMORE','LEXINGTON','FLOURNOY','BISHOP','LOOMIS','VAN BUREN','ROOSEVELT','GRENSHAW','ADA','THROOP','JACKSON','LYTLE','RACINE','MAY','VERNON PARK','ABERDEEN','CARPENTER','MILLER','MORGAN','17TH','18TH','19TH','21ST','CULLERTON','CERMAK','DAMEN','WOOD','ASHLAND','BLUE ISLAND','ALLPORT','WASHBURNE','MAXWELL','PEORIA','WESTERN','GRAND','HADDON','ARTESIAN','DIVISION','ARTESIAN','SACRAMENTO','GEORGE','WHIPPLE','TROY','ALBANY','KEDZIE','SUPERIOR','OHIO'];
    var resType = ['1.5 - 1.9','Two Story', 'Three Story'];
    var bldUsg = ['Multi Family'];
    var extDesc = ['Masonry','Frame','Frame/Masonry'];
    var bsmtDesc = ['Partial and Unfinished','Partial and Apartment','Slab and Unfinished','Full and Apartment','Full and Formal Rec. Room','Full and Unfinished','Craw and Formal Rec. Room'];
    var atticDesc = ['Full and Living Area','Partial and Living Area','Frame/Masonry'];
    var garDesc = ['1 Car Detached','1 1/2 Car Detached','2 Cars Detached','2 Cars Attached','2 1/2 Cars Attched','3 Cars Detached','4 Cars Detached'];
    var appealStatus = ['Appeal Review Complete'];
    var appealResult = ['Assessed Value Adjusted','Assessed Value Not Adjusted'];

   switch (category.value) {
       case 'CLASS_DESCRIPTION':
           options.options.length = 0;
           for (i = 0; i < description.length; i++) {
               createOption(options, description[i], description[i]);
           }
           break;
       case 'Street':
           options.options.length = 0;
       for (i = 0; i < street.length; i++) {
           createOption(options, street[i], street[i]);
           }
           break;
       case 'RES_TYPE':
           options.options.length = 0;
           for (i = 0; i < resType.length; i++) {
               createOption(options, resType[i], resType[i]);
           }
           break;
       case 'BLDG_USE':
           options.options.length = 0;
           for (i = 0; i < bldUsg.length; i++) {
               createOption(options, bldUsg[i], bldUsg[i]);
           }
           break;
       case 'EXT_DESC':
           options.options.length = 0;
           for (i = 0; i < extDesc.length; i++) {
               createOption(options, extDesc[i], extDesc[i]);
           }
           break;
       case 'BSMT_DESC':
           options.options.length = 0;
           for (i = 0; i < bsmtDesc.length; i++) {
               createOption(options, bsmtDesc[i], bsmtDesc[i]);
           }
           break;
       case 'ATTIC_DESC':
           options.options.length = 0;
           for (i = 0; i < atticDesc.length; i++) {
               createOption(options, atticDesc[i], atticDesc[i]);
           }
           break;
       case 'GAR_DESC':
           options.options.length = 0;
           for (i = 0; i < garDesc.length; i++) {
               createOption(options, garDesc[i], garDesc[i]);
           }
           break;
       case 'APPEAL_A_STATUS':
           options.options.length = 0;
           for (i = 0; i < appealStatus.length; i++) {
               createOption(options, appealStatus[i], appealStatus[i]);
           }
           break;
       case 'APPEAL_A_RESULT':
           options.options.length = 0;
           for (i = 0; i < appealResult.length; i++) {
               createOption(options, appealResult[i], appealResult[i]);
           }
           break;
           default:
               options.options.length = 0;
           break;
   }

}

function createOption(category, text, value) {
  var opt = document.createElement('option');
   opt.value = value;
   opt.text = text;
   category.options.add(opt);
   console.log("option=" + opt.value);
}

function filterCategories(){

    for (var i = 0; i < markerprops.length; i++) {
        marker = markerprops[i];

        if (Object.values(marker.properties).indexOf(options.value) > -1) {
           marker.setVisible(true);
       }else{
           marker.setVisible(false);
       }
    }

    var min = document.getElementById('min');
    var max = document.getElementById('max');

}




//
//
// function filterMarkers() {
//     for (var i = 0; i < markerprops.length; i++) {
//         filter = markerprops[i];
//
//         if(min <= filter.CURRENT_TOTAL && filter.CURRENT_TOTAL <= max ){
//             filter.setVisible(true);
//
//         }else{
//             filter.setVisible(false);
//         }
//     }
//     console.log(filter.CURRENT_TOTAL);
// }
