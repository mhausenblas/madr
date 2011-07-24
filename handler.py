"""
The handler script.

@author: Michael Hausenblas, http://sw-app.org/mic.xhtml#i
@since: 2011-07-23
@status: init
"""
import sys
sys.path.insert(0, 'lib')
import logging
import cgi
import os
import platform
import urllib
import StringIO

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.api import urlfetch

# import rdflib
# 
# from rdflib import Graph
# from rdflib import Namespace
# from rdflib import plugin
# from rdflib.serializer import Serializer

# plugin.register("rdf-json-pretty", Serializer, "rdfjson.RdfJsonSerializer", "PrettyRdfJsonSerializer")
# plugin.register("json-ld", Serializer, "rdfjson.JsonLDSerializer", "JsonLDSerializer")
# plugin.register('sparql', rdflib.query.Processor, 'rdfextras.sparql.processor', 'Processor')
# plugin.register('sparql', rdflib.query.Result, 'rdfextras.sparql.query', 'SPARQLQueryResult')

class MainHandler(webapp.RequestHandler):
	def get(self):
		self.response.out.write(template.render('index.html', None))
		
class NotFoundHandler(webapp.RequestHandler):
	def get(self):
		self.error(404)
		self.response.out.write(template.render('a404.html', None))
		
class DerefHandler(webapp.RequestHandler):
	def get(self):
		turl = urllib.unquote(self.request.get('url'))
		logging.info('Trying to dereference URL [%s]' %turl)
		try:
			result = urlfetch.fetch(turl)
			if result.status_code == 200:
				self.response.headers.add_header("Access-Control-Allow-Origin", "*") # CORS-enabled API
				self.response.headers['Content-Type'] = result.headers['content-type'] # forward the content type
				self.response.out.write(result.content)
				logging.info('Dereference result [%s]' %result.headers)
			else:
				self.error(404)
				self.response.out.write(template.render('a404.html', None))
		except Exception, e:
			self.error(404)
			self.response.out.write(e)