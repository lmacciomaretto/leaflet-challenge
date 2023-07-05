// Define a function we want to run once for each feature in the features array
// Give each feature a popup describing the place and time of the earthquake
function popUpMsg(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3> <hr> <p>Magnitude:${feature.properties.mag}</p> <hr> <p>Depth:${feature.properties.geometry[2]}</p>`);
}

// Define streetmap and darkmap layers
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 18
});

// Define a baseMaps object to hold our base layers
let baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topo
};

// Define a markerSize() function that will give each point a different radius based on the earthquake magnitude.
function markerSize(mag) {
return (mag) * 10;
}

// Create the layer for earthquakes
let earthquakes = new L.LayerGroup();

// Loop through locations, and create the city and state markers.
for (let i = 0; i < data.feature.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  earthquakes.push(
    L.circle(data.feature[i].properties, {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
      radius: markerSize(data.feature[i].properties.mag)
    })
)};


// Create our map, giving it the streetmap and earthquakes layers to display on load.
let myMap = L.map("map", {
    center: [-17.78629, -63.18117],
    zoom: 3.4,
    layers: [streetmap, earthquakes]
});

// Create an overlay object to hold our overlay.
let overlayMaps = {
    Earthquakes: earthquakes
};

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// Store our API endpoint as queryUrl.
const queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2022-07-04%2000:00:00&endtime=2023-07-04%2023:59:59&maxlatitude=14.264&minlatitude=-57.136&maxlongitude=-33.75&minlongitude=-82.617&minmagnitude=4.5&eventtype=earthquake&orderby=time"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function.
//   createFeatures(data.features);

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    L.geoJSON(data, {
        onEachFeature: popUpMsg,
    }).addTo(earthquakes);

    earthquakes.addTo(myMap)
});  

// // Call the marker into the styling
// var geojsonMarkerOptions = {
//     radius: markerSize(data.features.properties.mag),
//     fillColor: "#ff7800",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };

//     // Create a new marker cluster group.
//   let markers = L.markerClusterGroup();

//   // Loop through the data.
//   for (let i = 0; i < response.length; i++) {

//     // Set the data location property to a variable.
//     let location = response[i].location;

//     // Check for the location property.
//     if (location) {

//       // Add a new marker to the cluster group, and bind a popup.
//       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//         .bindPopup(response[i].descriptor));
//     }

//   }

//   // Add our marker cluster layer to the map.
//   myMap.addLayer(markers).


