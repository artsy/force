_ = require 'underscore'
Backbone = require 'backbone'

module.exports.TestAppView = class TestAppView extends Backbone.View

	initialize: ->
		console.log 'init TestAppView'

module.exports.init = ->
	new TestAppView