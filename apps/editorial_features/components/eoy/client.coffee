_ = require 'underscore'
Backbone = require 'backbone'
slinky = require './slinky.js'

module.exports.EoyView = class EoyView extends Backbone.View

	initialize: ->
		console.log 'init eoy'
		@sayHi()
		window.onscroll( @doScroll() )

	sayHi: =>
		console.log 'hi'
		# $('.nav').slinky()
		$('.nav').waypoint (direction) =>
      if direction is 'down'
      	console.log 'scroll out of view'
      	$('.nav').addClass('hidden')
      if direction is 'up'
      	console.log 'hit top of page'
      	$('.nav').removeClass('hidden')
    # , { offset: 'bottom-in-view' }

    $('.nav').waypoint (direction) =>
      if direction is 'down'
      	console.log 'bottom-in-view down'
      	# $('.nav').addClass('hidden')
      if direction is 'up'
      	console.log 'bottom-in-view up'
      	# $('.nav').removeClass('hidden')
    , { offset: 'bottom-in-view' }

    $('.page-content').waypoint (direction) =>
    	if direction is 'down'
      	console.log 'add menu'
      	$('.header').addClass('solid')
      if direction is 'up'
      	console.log 'remove menu'
      	$('.header').removeClass('solid')
    , { offset: '5%' }


    $('section').waypoint (direction) =>
    	if direction is 'down'
      	console.log 'box down'
      if direction is 'up'
      	console.log 'box up'
		, { offset: 'bottom-in-view' }

	doScroll: =>
		console.log 'doScroll'
		debugger
		scrollTop = window.scrollTop()
		console.log scrollTop
			# if scrollTop < 200)
		  #   maxHeight = 150
		  # else if(scrollTop > 400)
		  #   maxHeight = 75
		  # else
		  #   maxHeight = 150 - 75 * (((scrollTop-200) * 100)/200)/100
		  # $('.main-title').stop().animate({'max-height': maxHeight+"px"}, 500)


module.exports.init = ->
	new EoyView