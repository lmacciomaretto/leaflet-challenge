// Function from leaflet - https://leafletjs.com/examples/choropleth/
function getColor(d) {
    return d > 21 ? '#800026' :
        d > 18 ? '#BD0026' :
        d > 15 ? '#E31A1C' :
        d > 12 ? '#FC4E2A' :
        d > 9 ? '#FD8D3C' :
        d > 6 ? '#FEB24C' :
        d > 3 ? '#FED976' :
        '#FFEDA0';
}

// Define a function we want to run once for each feature in the features array
// Give each feature a popup describing the place and time of the earthquake
function popUpMsg(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>" +
        "<p>Depth: " + feature.geometry.coordinates[2] + " km</p>" +
        "<p><a href='" + feature.properties.url + "'>LINK</a></p>");
}

// Step 1: Define Tile Layers
// 1.a: Define streetmap layer
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1
});
//1.b: Define darkmap layer 
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 18
});

// Step 2. Define Basemaps object to hold our base layers
let baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topo
};

// Step 3: Define Leaflet map with default layers included
let myMap = L.map("map", {
    center: [-22.492, -66.149],
    zoom: 3.5,
    layers: [streetmap]
});

// Step 4: Add tile layers to the map
streetmap.addTo(myMap);

// Step 5: Create a layer for the earthquakes
let earthquakes = new L.LayerGroup();

// Step 6: Create overlay object to hold our overlay layer
let overlayMaps = {
    "Earthquakes": earthquakes
};

// Step 7: Add layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// Step 8: Store the API endpoint inside queryUrl
const queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2022-07-04%2000:00:00&endtime=2023-07-04%2023:59:59&maxlatitude=14.264&minlatitude=-57.136&maxlongitude=-33.75&minlongitude=-82.617&minmagnitude=4.5&eventtype=earthquake&orderby=time";

// Step 9: Perform a GET request to the query URL
fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        // Step 10: Create a GeoJSON layer containing the features array on the earthquakeData object
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: getColor(feature.geometry.coordinates[2])
                };
            },
            pointToLayer: function (feature, latlng) {
                return new L.CircleMarker(latlng, {
                    radius: feature.properties.mag * 3,
                    fillOpacity: 0.85
                });
            },
            onEachFeature: popUpMsg
        }).addTo(earthquakes);

        // Step 11: Add the layer group to the map
        earthquakes.addTo(myMap);

        // Step 12: Create the legend
        var legend = L.control({ position: 'bottomright' });

        // Step 13: Define the legend's onAdd function
        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 3, 6, 9, 12, 15, 18, 21],
                labels = [];
            div.innerHTML = '<h4>Depth</h4>'; // Add legend title

            // Loop through the grades and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' km<br>' : '+ km');
            }

            return div;
        };

        // Step 14: Add the legend to the map
        legend.addTo(myMap);
    })
    .catch(error => {
        console.log('Error:', error);
    });

// Step 15: Ensure all data points load in the correct locations
myMap.on('zoomend', function () {
    earthquakes.eachLayer(function (layer) {
        layer._updatePath();
    });
});