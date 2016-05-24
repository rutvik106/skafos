$(document).ready(function(){

  //loadScript();

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadScript() {
  

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?libraries=geometry,places&key=AIzaSyAD8_7jlz6p87RMRfkFI-E-uvoIF6Qb2SE&callback=initialize';
  document.body.appendChild(script);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function initialize()
{

  document.getElementById("pac-input").style.display="block";


  var myOptions = {
    zoom: 16,
    center: new google.maps.LatLng(23.027425, 72.511649),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(23.027425, 72.511649),

    map: map
  });
  
  google.maps.event.addListenerOnce(map, 'idle', function()
  {

    vfxAnimTopBar();
    document.getElementById("lbl-username").innerHTML = XMPP.jid_to_id(XMPP.connection.jid);
    
    
  });
  
  
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  
  
  
  
  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    
    
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });



}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
