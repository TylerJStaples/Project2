// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var restRooms = [
  ['test1',35.328839, -80.93479, 1],
  ['test2',35.22883532, -80.8347621, 1]
]
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.22888353357024, lng: -80.83476207120572},
    zoom: 11
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  setMarkers( map );
}

//-------------------------------------------------------------------------------------------------
// Adds markers to the map.
//
// Marker sizes are expressed as a Size of X,Y where the origin of the image
// (0,0) is located in the top left of the image.
//
// Origins, anchor positions and coordinates of the marker increase in the X
// direction to the right and in the Y direction down.
//-------------------------------------------------------------------------------------------------
function setMarkers(map) {

  var image = {
    url: './images/marker.png', 
    size: new google.maps.Size(25, 32),       // This marker is 25 pixels wide by 32 pixels high.
    origin: new google.maps.Point(0, 0),      // The origin for this image is (0, 0).
    anchor: new google.maps.Point(0, 32)      // The anchor for this image is the base of the flagpole at (0, 32).
  };

  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };

  for (var i = 0; i < restRooms.length; i++) {
    var restRoom = restRooms[i];
    var marker = new google.maps.Marker({
      position: {lat: restRoom[1], lng: restRoom[2]},
      map: map,
      icon: image,
      shape: shape,
      title: restRoom[0],
      zIndex: restRoom[3]
    });
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
