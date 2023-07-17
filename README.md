# leaflet-challenge
 This is the repo for Assignment #15: Mapping Challenge with Leaflet and D3-JS

The code will create a map that plots all the earthquakes from a dataset based on their longitude and latitude.

1. The data set was obtained from USGS website (http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) in GeoJSON format. Data set chosen included all earthquakes occurred in South and Central America during a period of one year.


2. Using Leaflet, this code creates a map showing earthquakes markers according to their longitude and latitude. Each marker reflects the magnitude of the earthquake by their size and the depth of the earthquake by color. This means that earthquakes with higher magnitudes will appear larger, and earthquakes with greater depth will appear darker in color.

3. Tooltips that provide additional information, such as earthquake location, magnitude and depth  when its associated marker is clicked.


In this repository:
* index.html script for the map, with Leaflet, D3 and complimentary instructions
* GeoJSON query that was used for this map
* "static" folder that holds "css" folder with its own css file, and "js" folder with the script logic.json inside of it.

logic.json creates:
*Base map with street view or topographic view
*Choropleth map that overlays and can be turned on and off independently
*Tooltips and layer controls that allow for interactivity.

### References

Dataset created by [the United States Geological Survey](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

The code was written based on class files, Leaflet, D3, JavaScript, and HTML documentation, and with the help of TA Erin Wills.