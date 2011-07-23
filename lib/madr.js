$(function(){
	var pageSize = getPageSize();
	$("#webcam").webcam({
		width: pageSize[0] - 2,
		height: pageSize[1] - 2,
		mode: "stream",
		swffile: "lib/jquery.webcam/jscam.swf"
	});
	
	if(geo_position_js.init()){
		geo_position_js.getCurrentPosition(
			function(p){
				alert('lat='+p.coords.latitude.toFixed(2)+';lon='+p.coords.longitude.toFixed(2));
			},
			function(p){
				alert('error='+p.message);
			},
			{enableHighAccuracy:true}
		);
	}
	else{
		alert("I can't locate you as the functionality is not available on your device. Manually enter address?");
	}	
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