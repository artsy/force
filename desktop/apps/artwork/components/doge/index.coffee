_ = require 'underscore'
metaphysics = require '../../../../../lib/metaphysics'
mediator = require '../../../../lib/mediator'
template = -> require('./index.jade') arguments...
query = require './query'
sd = require('sharify').data

module.exports = ->
  mediator.on 'search:doge', => window.location = "#{sd.CLIENT.href}/doge"
  return unless location.pathname.match('/doge')
  metaphysics query: query, variables: id: sd.CLIENT.id
    .then (data) ->
      geneLayers = data.artwork.layers
      starters = ['such', 'wow', 'what', 'such', 'very', 'so', 'nice', 'omg', 'much', 'so', '']
      maxItems = 7
      colors = ['#fff', '#ff00ff', '#7CA4C8', '#D7E46E', '#e8bbda', '#00ff00', '#ffff00']
      fontMax = 26
      fontMin = 14
      topMargin = 10
      rightMargin = 70
      $container = $('.artwork-images__images')
      getRandomInt = (min, max) ->
        Math.floor(Math.random() * (max - min)) + min
      formatItems = (layers) ->
        for item in layers[..maxItems]
          "#{starters[getRandomInt(0, starters.length)]} #{item.name}"
      $container.imagesLoaded ->
        $image = $container.find('img')
        imgWidth = $image.width()
        imgHeight = $image.height()
        $container.append template
          items: formatItems(geneLayers)
        $('.doge-container').css
          width: imgWidth
          height: imgHeight
        $('.doge-text').each (idx, el) =>
          $(el).css
            'font-size': "#{getRandomInt(fontMin, fontMax)}px"
            'color': colors[getRandomInt(0, 7)]
            'top': getRandomInt(0 + topMargin, imgHeight - rightMargin)
            'left': getRandomInt(0 + topMargin, imgWidth - rightMargin)
            'z-index': 2
