"""
The main GAE script.

@author: Michael Hausenblas, http://sw-app.org/mic.xhtml#i
@since: 2011-07-23
@status: inital version
"""
import sys
import os
import logging
import cgi
import platform

from google.appengine.dist import use_library
use_library('django', '0.96')

from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from handler import *


application = webapp.WSGIApplication([
						(r'/', MainHandler),
						(r'/deref', DerefHandler),
						(r'/.*', NotFoundHandler)
					],
					debug=False)

def main():
    run_wsgi_app(application)

if __name__ == '__main__':
	main()
