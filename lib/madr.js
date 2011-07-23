$(function(){
	var pageSize = getPageSize();
	var myLocLat = 0;
	var myLocLng = 0;
	var wcAvailable = true;
	
	$("#aar").webcam({
		width: pageSize[0] - 2,
		height: pageSize[1] - 2,
		mode: "stream",
		swffile: "lib/jquery.webcam/jscam.swf",
		debug: function (type, string) {
			if(geo_position_js.init()){
				geo_position_js.getCurrentPosition( // try to determine the user's location
					function(p){
						myLocLat = p.coords.latitude.toFixed(5);
						myLocLng = p.coords.longitude.toFixed(5);
						console.log('Your location: lat=' + myLocLat + ',lng=' + myLocLng);
						
						if(string.indexOf("No camera was") >= 0) { // if the webcam doesn't work we replace it with a Google street view, well AAR (almost AR ;)
							$("#aar").html("Didn't find a webcame, switching to street view mode ...");
							initSV(myLocLat, myLocLng);
							wcAvailable = false;
						}
						
						//TODO: processing of the PoI depending on if there is a webcam available or not ...
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
		}
	});
});

window.addEventListener("load", function() {
	jQuery("body").append("<div id=\"flash\"></div>");	
	var pageSize = getPageSize();
	jQuery("#flash").css({ height: pageSize[1] + "px" });

}, false);

window.addEventListener("resize", function() {
	var pageSize = getPageSize();
	jQuery("#flash").css({ height: pageSize[1] + "px" });

}, false);