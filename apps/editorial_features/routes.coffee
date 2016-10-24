Backbone = require 'backbone'
_ = require 'underscore'

@eoy = (req, res, next) ->
	res.render '../components/eoy/index'

@testApp = (req, res, next) ->
	res.render '../components/test_app/index'