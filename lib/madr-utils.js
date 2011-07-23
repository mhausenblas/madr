var aarSV;


function drawPOI(title){
	// see also http://www.html5canvastutorials.com/
	var canvas = document.getElementById("scribble-board"); // our scribble board
	var context = canvas.getContext('2d');
	var topLeftCornerX = 0,
		topLeftCornerY = 0,
		width = 10,
		height = 10; // container dimensions	
	var centerX = 5;
	var centerY = 5;
	var radius = 4;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

    context.fillStyle = "#36C";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();

	// context.fillStyle = '#fff';
	// context.font = "6pt Arial";
	// context.fillText(title, 2, 5);

	return canvas.toDataURL("image/png");
}

function initSV(lat, lng){
	var myloc = new google.maps.LatLng(lat, lng);
	aarSV = new google.maps.StreetViewPanorama(document.getElementById('aar'), {
		position : myloc,
		pov: {
			heading : 100,
			pitch : 0,
			zoom : 1
		},
		panControl : true,
		addressControl: true,
		scrollwheel : true,
		zoomControl : true
	});
	aarSV.setVisible(true);
}

function getPageSize() {
	var xScroll, yScroll;

	if (window.innerHeight && window.scrollMaxY) {
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}

	var windowWidth, windowHeight;

	if (self.innerHeight) { // all except Explorer
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}

	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){
		pageWidth = xScroll;
	} else {
		pageWidth = windowWidth;
	}

	return [pageWidth, pageHeight];
}