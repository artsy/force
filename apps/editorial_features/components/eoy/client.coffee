_ = require 'underscore'
Backbone = require 'backbone'

module.exports.EoyView = class EoyView extends Backbone.View

	initialize: ->
		console.log 'init eoy'

module.exports.init = ->
	new EoyView