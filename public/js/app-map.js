// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

//var restRooms = [
//  ['test1',35.328839, -80.93479, 1, '2342'],
//  ['test2',35.22883532, -80.8347621, 1, '2343']
//];

//$(document).ready(function() {

    getUserLoggedIn();
    getAllRestRooms();

    var map, infoWindow;
    function initMap() {
      let myLatLng = {lat: 35.22888353357024, lng: -80.83476207120572};

      map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 11
      });
      infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          myLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
    
          infoWindow.setPosition(myLatLng);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(myLatLng);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

//      setMarkers( map );

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
    function setMarkers(map, restRooms ) {

      var image = {
        url: './images/the-pin.svg', 
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
      };

      console.log( `DEBUG - setMarkers() - # of Rest Rooms = ${restRooms.length}`);

      for (var i = 0; i < restRooms.length; i++) {
        var marker = new google.maps.Marker({
          position: {lat: restRooms[i].lat, lng: restRooms[i].lng},
          map: map,
          icon: image,
          title: restRooms[i].name,
          zIndex: restRooms[i].zIndex
        });

        addMarkerUniqID(marker, restRooms[i].id);

      }
    }

    function addMarkerUniqID( marker, ID ) {
      var newInfoWindow = new google.maps.InfoWindow({ markerID: ID });

      marker.addListener('click', function() {
        // newInfoWindow.open( marker.get('map'), marker);
        console.log( `DEBUG - addMarkerUniqID() - ${newInfoWindow.markerID}` );
        $.get(`/api/getRestRoom/${newInfoWindow.markerID}`, function(data) {
          console.log(`DEBUG - addMarkerUniqID() .... ${JSON.stringify(data)}`);
        });
      });
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    };

    function getAllRestRooms() {
      $.get("/api/allRestRooms", function(restRooms) {
        console.log( `DEBUG - getAllRestRooms() - # of Rest Rooms = ${restRooms.length}`);
        setMarkers( map, restRooms );
      });
    };

    function getUserLoggedIn () {
      $.get("/api/getAuthUser", function(userName) {
        console.log( `DEBUG - getUserLoggedIn() - ${userName}`);
      });
    };

//});