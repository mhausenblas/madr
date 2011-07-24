$(function(){
	pageSize = getPageSize();
	
	// make AAR plane fit the whole available screen space:
	$('#aar').css("width", pageSize[0] + "px");
	$('#aar').css("height", pageSize[1] + "px");
	$('#dashboard').css("width", pageSize[0] + "px");
	$('#dashboard').css("height", "40%");
	
	// determine user's location and render PoIs
	if(geo_position_js.init()){
		geo_position_js.getCurrentPosition( // try to determine the user's location
			function(p){
				myLocLat = p.coords.latitude.toFixed(5);
				myLocLng = p.coords.longitude.toFixed(5);
				console.log('Your location is: lat=' + myLocLat + ',lng=' + myLocLng);
				initSV(myLocLat, myLocLng);
				initPoIs();
			},
			function(p){
				alert('Error while determining your location: ' + p.message);
			},
			{enableHighAccuracy:true}
		);
	}
	else{
		alert("I can't locate you as the functionality is not available on your device. Manually enter address?");
	}
	
	// interaction with PoIs
	$('.poi-interaction').live('click', function(){
		var poi = $(this).attr('resource');
		myLocLat = poiList[poi].lat;
		myLocLng = poiList[poi].lng;
		initSV(myLocLat, myLocLng);
		initPoIs();
	});
});