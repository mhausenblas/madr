$(function(){
	var pageSize = getPageSize();
	$("#webcam").webcam({
		width: pageSize[0] - 2,
		height: pageSize[1] - 2,
		mode: "stream",
		swffile: "lib/jquery.webcam/jscam.swf"
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