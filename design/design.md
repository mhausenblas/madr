# Design Notes

### Software components 

It might be useful to build on or re-use the following:

* [JavaScript RDF store](https://github.com/antoniogarrote/rdfstore-js/) allows for client side, native processing of the (LOD) data sources
* [JavaScript port of FLARToolKit ](https://github.com/kig/JSARToolKit) - TODO: Michael needs to check for what we can use this ...
* [JavaScript library for Augmented Reality](http://code.google.com/p/js-aruco/) applications can also offer some AR-specific functionality
* Mobile apps/location-centric
 * [jQuery plug-in for mobile web development](http://www.jqtouch.com/) on the iPhone, Android, iPod Touch, etc. might offer some high-level, cross-platform functionality
 * [jQuery GPS plug-in](http://www.birdwingfx.com/jQuery_gps/) provides geo-location functions
 * [Location based mobile websites](http://code.google.com/p/geo-location-javascript/)
* Webcam
 * [JavaScript API for Webcam image access using Canvas](https://github.com/taboca/CamCanvas-API-) 
 * [jQuery webcam plugin](http://www.xarg.org/project/jquery-webcam-plugin/) provides a Flash-based way to capture live images (is there a non-Flash version as well?)
* [PhoneGap](http://www.phonegap.com/), an HTML5 app platform that allows you to author native applications with web technologies and get access to APIs and app stores
* Presentation on [Mobile Device APIs](http://www.slideshare.net/jamesgpearce/mobile-device-apis) from early 2012

## Design

### Data flow

1. `get_current_location()` -> lookup location in LGD/OSM and return PoIs
2. Display PoIs
3. Select or interact with a PoI


### Issues

* What contextual data can be used to help guide the selection of relevant PoIs?
 * position (GPS)
 * time
 * user calendar
 * user preferences (explicit or previous interactions)
* Two main interaction modes: 
 * information: view PoI properties, learn about PoI, etc. - this can be directly done with LOD
 * action: interact with PoI (for example, order pizza, query current offers, etc.) - here we might want to utilise aLODin/EA (?)
* Client-side:
 * RDF store that i) directly accesses a dataset where possible, that is, [CORS-enabled](http://enable-cors.org/) or ii) via server-side API/gateway
 * AR component (webcam)
 * interaction layer (selection of PoI and action on PoI)
* Server-side:
 * Simple curl-based wrapper for providing a gateway to datasets

### Initial datasets

* [LGD](http://linkedgeodata.org/) and with it the [OSM](http://www.openstreetmap.org/ "OpenStreetMap")
* DBpedia live
* wrapper for some Irish datasets (fingal, etc.)

### Mockups

Some mockups created with [Balsamiq](http://balsamiq.com/products/mockups):

![Mockup 0](https://github.com/mhausenblas/madr/raw/master/design/madr-mockup-0.png)
