"""
The handler script.

@author: Michael Hausenblas, http://sw-app.org/mic.xhtml#i
@since: 2011-07-23
@status: init
"""
import sys
import logging
import cgi
import os
import platform
import urllib
import urllib2
import StringIO

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template

class MainHandler(webapp.RequestHandler):
	def get(self):
		self.response.out.write(template.render('index.html', None))
		
class DerefHandler(webapp.RequestHandler):
	def get(self):
		self.response.out.write("ping")