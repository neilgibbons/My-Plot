
var map;
var markersArray = [];
var poly;
$(document).ready(function() {	
	    
	var latlng = new google.maps.LatLng(53.47998, -2.2412);
    	var myOptions = {
      		zoom: 15,
      		center: latlng,    	
		mapTypeId: google.maps.MapTypeId.ROADMAP,	
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		panControl: true,
		panControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		scaleControl: true,
		scaleControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		}
    	};
    	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);


	  // Add a listener for the click event
	  google.maps.event.addListener(map, 'click', addLatLng)


	$("#panel").toggle(function() {
		$(this).animate({left:'-372px'}, 500);		
	}, function() {
		$(this).animate({left:'0px'}, 500);		
	});

	$("#clearpatch").click(function(event) {
		event.stopPropagation();
		clearAll();
		poly.setMap(null);
		poly = null;
	})
});

/**
 * Handles click events on a map, and adds a new point to the Polyline.
 * @param {MouseEvent} mouseEvent
 */
function addLatLng(event) {

if (poly == null)
{
	 var polyOptions = {
	    strokeColor: '#000000',
	    strokeOpacity: 1.0,
	    strokeWeight: 3
	  }
	  poly = new google.maps.Polygon(polyOptions);
	  poly.setMap(map);
}

  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear
  path.push(event.latLng);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + path.getLength(),
    map: map
  });

markersArray.push(marker);
}

function clearAll()
{
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }	
}
