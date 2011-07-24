var aarSV;
var pageSize;
var myLocLat = 0;
var myLocLng = 0;
var poiList = {};
var nearbyRadius = 0.5; // in km

function initPoIs(){
	// set user's location
	new google.maps.Marker({
		position: new google.maps.LatLng(myLocLat, myLocLng),
		map: aarSV,
		icon: new google.maps.MarkerImage('/img/myloc.png'),
		title:'my location'
	});
	// show PoIs around the user:
	poiList = {}; // reset list of PoIs
	queryPoIs(function(){
		var buf = ['<h2>Nearby</h2><div id="nearby-ctrl">Distance: <span id="current-radius"></span></div><div id="nearby-radius"></div><ul id="poi-list">'];
		$.each(poiList, function(index, val){
			buf.push('<li><a class="poi" href="' + index + '">' + poiList[index].title + '</a> <span class="poi-interaction" resource="' + index +'">GO THERE</span></li>');	
		});
		buf.push('</ul>');
		$('#dashboard').html(buf.join(''));
		
		$('#current-radius').html(nearbyRadius * 1000 + 'm');
		$('#nearby-radius').slider({
			value: nearbyRadius * 1000,
			min: 100,
			max: 2000,
			slide: function(event, ui) {
				nearbyRadius =  ui.value/1000; // get the current selected slider value (== search radius for nearby POIs in meter)
				$('#current-radius').html(ui.value + 'm');
			},
			change: function(event, ui) {
				initPoIs();
			}
		});
		
		$('#dashboard').slideDown();
	});
}

function queryPoIs(callback){
	var queryStr = 'PREFIX lgdo: <http://linkedgeodata.org/ontology/> SELECT ?s ?l ?g FROM <http://linkedgeodata.org> WHERE {  ?s a lgdo:Amenity . ?s rdfs:label ?l . ?s geo:geometry ?g . FILTER(bif:st_intersects (?g, bif:st_point (' + myLocLng + ',' +  myLocLat + '), ' + nearbyRadius + ')) . }';
	var defaultGraph = 'http://linkedgeodata.org';	
	
	// without rdfstore-js, simply processing the SPARQL results:
	var queryURLBase = 'http://live.linkedgeodata.org/sparql?default-graph-uri=' + encodeURIComponent(defaultGraph);
	var format = '&format=application%2Fsparql-results%2Bjson';
		
	$.getJSON(queryURLBase + '&query=' + queryStr + format , function(data, textStatus){
		if(data.results) {
			var rows = data.results.bindings;
			for(i in rows) {
				var row = rows[i];
				var title = row['l'].value;
				var loc = row['g'].value.substring(6, row['g'].value.length - 1); // POINT(-9.07412 53.2897) -> -9.07412 53.2897 - Note: OpenLink uses reverse lat/lng encoding
				var lat = loc.split(' ')[1];
				var lng = loc.split(' ')[0];
				var pos =  new google.maps.LatLng(lat, lng);
				var m = new google.maps.Marker({
					position: new google.maps.LatLng(lat, lng),
					map: aarSV,
					icon: new google.maps.MarkerImage('/img/poi.png'),
					title: title
				});
				console.log('Found PoI near you: ' + title + ' (' + lat  + ',' + lng + ')' );
				poiList[row['s'].value] = { marker : m, title : title, lat : lat, lng : lng }; // remember markers indexed by PoI URI
			}
		}
		callback();
	});
	
	// rdfstore.create(function(store) {
	// 	store.execute(queryStr, function(success, results){
	// 	  if(success) {
	// 		var rows = results.bindings;
	// 		for(i in rows) {
	// 			var row = rows[i];
	// 			var title = row['l'].value;
	// 			// Note: OpenLink uses reverse lat/lng encoding, hence we need to swap them later on:
	// 			var loc = row['g'].value.substring(6, row['g'].value.length - 1); // POINT(-9.07412 53.2897) -> -9.07412 53.2897 
	// 			var lat = loc.split(' ')[1];
	// 			var lng = loc.split(' ')[0];
	// 			console.log('Found PoI near you: ' + title + ' (' + lat  + ',' + lng + ')' );
	// 			new google.maps.Marker({
	// 				position: new google.maps.LatLng(lat, lng),
	// 				map: aarSV,
	// 				icon: new google.maps.MarkerImage('/img/poi.png'),
	// 				title: title
	// 			});
	// 		}
	// 		}
	// 	});
	// });
}


function drawPOI(title){
	// see also http://www.html5canvastutorials.com/
	var canvas = document.getElementById("scribble-board"); // our scribble board
	var context = canvas.getContext('2d');
	var topLeftCornerX = 0,
		topLeftCornerY = 0,
		width = 40,
		height = 40; // container dimensions	
	var centerX = 20;
	var centerY = 20;
	var radius = 18;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

    context.fillStyle = "#36C";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "#f0f0f0";
    context.stroke();

	context.fillStyle = '#fff';
	context.font = "9pt Arial";
	context.fillText(title, centerX - 1, centerY + 3);

	return canvas.toDataURL("image/png");
}

function initSV(lat, lng){
	var myloc = new google.maps.LatLng(lat, lng);
	aarSV = new google.maps.StreetViewPanorama(document.getElementById('aar'), {
		position : myloc,
		pov: {
			heading : -40,
			pitch : 1,
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