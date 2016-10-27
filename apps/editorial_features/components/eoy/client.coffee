_ = require 'underscore'
Backbone = require 'backbone'
slinky = require './slinky.js'

module.exports.EoyView = class EoyView extends Backbone.View

	initialize: ->
		console.log 'init eoy'
		@sayHi()

	sayHi: =>
		console.log 'hi'
		$('.nav').slinky()

module.exports.init = ->
	new EoyView