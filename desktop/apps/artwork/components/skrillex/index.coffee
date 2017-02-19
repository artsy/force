_ = require 'underscore'
mediator = require '../../../../lib/mediator.coffee'
sd = require('sharify').data

module.exports = ->
  mediator.on 'search:skrillex', => window.location = "#{sd.CLIENT.href}/skrillex"
  return unless location.pathname.match('/skrillex')
  $('.artwork-page.main-layout-container').prepend(
    "<audio id='skrillex' src='/sounds/skrillex(cut).mp3'></audio>" 
  )
  $container = $('.artwork-images__images')
                .find("a[data-state='active']")
                .find(".artwork-images__images__image__display")
  $container.imagesLoaded ->
    $image = $container.find('img')
    imgWidth = $image.width()
    imgHeight = $image.height()
    image = new Image  # used for canvas
    image.src = $image.attr('src')
    beatDrops = [ 7400, 21000, 28700, 34800 ]
    beatStops = [ 17500, 28000, 31000, 39600 ]
    songEnd = 39700
    canvas = $("<canvas width=#{imgWidth} height=#{imgHeight}>")[0]
    $canvas = $(canvas)
    $canvas.css
      'display' : 'inline'
      'z-index': '2'
    $container.css
      'text-align' : 'center'
    $container.append canvas
    context = canvas.getContext('2d')
    $skrillex = $('#skrillex')
    syncBeats = ->
      for beatDrop in beatDrops
        _.delay (=> startShaking()), beatDrop
      for beatStop in beatStops
        _.delay (=> stopShaking()), beatStop
    drawImage = (x, y) ->
      context.drawImage image, x, y, imgWidth, imgHeight
    startShaking = =>
      @interval = setInterval (=>
       drawImage(Math.floor( Math.random() * 6 - 3 ) * 2, - Math.random() * 16)
      ), 1000 / 60
    stopShaking = =>
      clearInterval(@interval)
    destroySkrillex = ->
      $canvas.remove()
      $skrillex.remove()
      $image.show()

    # Start 'er off!
    _.defer =>
      $image.hide()
      drawImage 0, 0
      $skrillex[0].play()
      syncBeats()
      _.delay (=> destroySkrillex()), songEnd
