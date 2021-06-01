
mapboxgl.accessToken='pk.eyJ1IjoibXNvcmlhbm8yNCIsImEiOiJja29oeHhkNmgwcGxwMnhsbDFqMDl3eTMyIn0.D84IIpYoQgfRVUL-9M-M1g';
	
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [144.9350287575595, -37.78287455478831],
  zoom: 11
});

var geojson = {
    type: 'FeatureCollection',
    features: [
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [ 144.9236254016745, -37.77631930256852]
        },
        properties: {
            title: 'User 1',
            description: '7 West St, Ascot Vale VIC 3032'
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [144.9470863818076, -37.805161928627605]
        },
        properties: {
            title: 'User 2',
            description: '45 Silk Pl, West Melbourne VIC 3003'
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [144.91886918164963, -37.75670591199163]
        },
        properties: {
            title: 'Driver',
            description: '884 Mt Alexander Rd, Moonee Ponds VIC 3039'
        }
    }]
}
    


//add markers to map
geojson.features.forEach(function(marker){
				
    //create  a HTML for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    //make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
    .addTo(map);
});