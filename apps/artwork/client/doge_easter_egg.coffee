_ = require 'underscore'
Layers = require('./layered_search.coffee').Layers
template = -> require('../templates/doge.jade') arguments...

module.exports = (artwork) ->
  return unless location.pathname.match('/doge')
  (geneLayers = new Layers(null, artwork: artwork)).fetch
    success: =>
      starters = ['such', 'wow', 'what', 'such', 'very', 'so', 'nice', 'omg', 'much', 'so', '']
      maxItems = 7
      colors = ['#fff', '#ff00ff', '#7CA4C8', '#D7E46E', '#e8bbda', '#00ff00', '#ffff00']
      fontMax = 33
      fontMin = 18
      topMargin = 10
      rightMargin = 90
      $container = $('.artwork-image')
      $image = $container.find('img')
      imgWidth = $image.width()
      imgHeight = $image.height()
      getRandomInt = (min, max) ->
        Math.floor(Math.random() * (max - min)) + min
      formatItems = (layers) ->
        for item in layers[..maxItems]
          "#{starters[getRandomInt(0, starters.length)]} #{item.get('name')}"
      $container.append template
        items: formatItems(geneLayers.models)
      @$('.doge-container').css
        width: imgWidth
        height: imgHeight
      $('.doge-text').each (idx, el) =>
        $(el).css
          'font-size': "#{getRandomInt(fontMin, fontMax)}px"
          'color': colors[getRandomInt(0, 7)]
          'top': getRandomInt(0 + topMargin, imgHeight - rightMargin)
          'left': getRandomInt(0 + topMargin, imgWidth - rightMargin)
