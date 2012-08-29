# madr - a generic, mobile AR browser

## About

This project is about implementing a (research) prototype of a generic, mobile AR browser that utilises [Linked Open Data](http://lod-cloud.net) (LOD) data sources. For the background, you might want to read our [position paper](http://www.w3.org/2010/06/w3car/exploiting_lod_for_ar.pdf) on this topic and what the potential is. Ah, and in case you wonder, the name itself, *madr*, comes from `Mobile AugmenteD Reality` ...

## Under the hood ...

madr is all about HTML5 and JavaScript - all the heavy lifting is done on the client-side. Currently, madr consists of the following components:

* Initially, the user's location is determined via JavaScript.
* Then, using Ajax, [LinkedGeoData](http://linkedgeodata.org/), and with it the [OSM](http://www.openstreetmap.org/ "OpenStreetMap") is queried for nearby 'Points of Interest' (PoI).
* From the available PoI the user can select to visit one.
* Next steps:
 * We will use [aLODin](http://lab.linkeddata.deri.ie/alodin/agent/) for interaction with the PoI; see also the [Entity-Action  ](http://purl.org/NET/entity-actions) vocabulary.
 * We plan to integrate with social media streams (Twitter, Google+, etc.) based on the user's location.

And this is how madr currently looks on my Samsung Galaxy SII:

![madr mobile screen shot](http://dl.dropbox.com/u/10436738/img/madr-samsung-s2-screenshot.png)

... or an older sreen shot from the desktop browser:

![madr desktop screen shot](https://lh6.googleusercontent.com/--tItkkkZVts/TiwAHvhntCI/AAAAAAAAAXo/Om2msSpZrlI/s912/madr-screenshot-0.png)





## License

This software is Public Domain.