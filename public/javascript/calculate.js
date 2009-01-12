var map;

function initialize() {
  if (GBrowserIsCompatible()) {
    map = new GMap2(document.getElementById("map"));
    map.setCenter(new GLatLng(40.513799, -97.470703), 3);
    map.addControl(new GSmallMapControl());  
    map.addControl(new GMapTypeControl());   
    gdir = new GDirections(map, document.getElementById("directions"));
	GEvent.addListener(gdir, "load", onGDirectionsLoad);
    GEvent.addListener(gdir, "error", handleErrors);
	GEvent.addListener(gdir, "addoverlay", onGDirectionsAddOverlay); // added to trigger marker swap
  }
}

function showDirections(origin, dest, mpg, ppg) {
  gdir.load("from: " + origin + " to: " + dest, { "locale": "en_US" });	
  miles = mpg;
  price = ppg;
}

function handleErrors() {
  if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)
	alert("No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect.\nError code: " + gdir.getStatus().code);
  else if (gdir.getStatus().code == G_GEO_SERVER_ERROR)
	alert("A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.\n Error code: " + gdir.getStatus().code);   
  else if (gdir.getStatus().code == G_GEO_MISSING_QUERY)
	alert("The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.\n Error code: " + gdir.getStatus().code);
  else if (gdir.getStatus().code == G_GEO_BAD_KEY)
    alert("The given key is either invalid or does not match the domain for which it was given. \n Error code: " + gdir.getStatus().code);
  else if (gdir.getStatus().code == G_GEO_BAD_REQUEST)
    alert("A directions request could not be successfully parsed.\n Error code: " + gdir.getStatus().code);
  else alert("An unknown error occurred.");
}

function onGDirectionsLoad(){ 
  var distance = gdir.getDistance().meters;
  var x = 1609.344;
  var cost = (distance/x) * (price/miles);

  document.getElementById("one_way").innerHTML = "$"+(Math.round(cost*100)/100).toFixed(2);
  document.getElementById("round_trip").innerHTML = "$"+(Math.round(cost*2*100)/100).toFixed(2);
  document.getElementById("weekly").innerHTML = "$"+(Math.round(cost*10*100)/100).toFixed(2);
  document.getElementById("monthly").innerHTML = "$"+(Math.round(cost*40*100)/100).toFixed(2);  
}

///////////////////////////////////////////////////////////////////////
// The add-on code for draggable markers
// Esa 2008
//
var newMarkers = [];
var latLngs = [];
var icons = [];
	
function onGDirectionsAddOverlay(){ 
  for (var i=0; i<newMarkers.length; i++) {
	map.removeOverlay(newMarkers[i]);
  }
  for (var i=0; i<=gdir.getNumRoutes(); i++) {
	var originalMarker = gdir.getMarker(i);
	latLngs[i] = originalMarker.getLatLng();
	icons[i] = originalMarker.getIcon();
	newMarkers[i] = new GMarker(latLngs[i],{icon:icons[i], draggable:true, title:'Draggable'});
	map.addOverlay(newMarkers[i]);
	GEvent.addListener(newMarkers[i], "dragend", function() {
	  var points = [];
	  for (var i=0; i<newMarkers.length; i++) {
		points[i]= newMarkers[i].getLatLng();
	  }
	  gdir.loadFromWaypoints(points);
	});
	copyClick(newMarkers[i],originalMarker);
	map.removeOverlay(originalMarker);
  }

  function copyClick(newMarker,oldMarker) {
	GEvent.addListener(newMarker, 'click', function() {
	  GEvent.trigger(oldMarker,'click');
	});
  }
}
//
// End of draggable markers code
// Esa 2008
///////////////////////////////////////////////////////////////////////