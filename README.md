# leaflet-challenge
 This is the repo for Assignment #15: Mapping Challenge with Leaflet and D3-JS

The code will create a map that plots all the earthquakes from a dataset based on their longitude and latitude.

1. The data set was obtained from USGS website (http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) in GeoJSON format. The data set chosen included all earthquakes that occurred in South America during a period of one year.


2. Using Leaflet, this code creates a map showing earthquake markers according to their longitude and latitude. Each marker reflects the magnitude of the earthquake by its size and the depth of the earthquake by color. This means earthquakes with higher magnitudes will appear larger, and earthquakes with greater depth will appear darker in color.

3. Tooltips that provide additional information, such as earthquake location, magnitude and depth  when its associated marker is clicked.


In this repository:
* index.html script for the map, with Leaflet, D3 and complimentary instructions
* GeoJSON query that was used for this map
* "static" folder that holds "css" folder with its own css file, and "js" folder with the script logic.json inside of it.

logic.json creates:
*Base map with street view or topographic view
Street View
![Base-Street-Map](https://github.com/lmacciomaretto/leaflet-challenge/assets/126762600/c69f25d9-35af-422d-8f3b-bb39296ba021)

Topographic View
![Base-Topographic-Map](https://github.com/lmacciomaretto/leaflet-challenge/assets/126762600/4fdb392e-2338-4d22-9f14-01b1fc802aa4)

*Choropleth map that overlays and can be turned on and off independently
![Base-Street-Map-Earthquakes-Overlay](https://github.com/lmacciomaretto/leaflet-challenge/assets/126762600/c335577d-a041-4cb8-89c0-a3cff50e45b9)

![Base-Topographic-Map-Earthquakes-Overlay](https://github.com/lmacciomaretto/leaflet-challenge/assets/126762600/153e3d67-2bb3-477d-b1d8-94566d096206)

*Tooltips and layer controls that allow for interactivity.
![Tooltips-Map](https://github.com/lmacciomaretto/leaflet-challenge/assets/126762600/bf765e43-133d-4235-859f-df736780c8dc)


### References

Dataset created by [the United States Geological Survey](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

The code was written based on class files, Leaflet, D3, JavaScript, and HTML documentation, and with the help of TA Erin Wills.
