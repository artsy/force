_ = require 'underscore'

module.exports = (artwork) ->
  return unless location.pathname.match('/skrillex')
  $('#artwork-page.main-layout-container').prepend(
    "<audio id='skrillex' src='/sounds/skrillex(cut).mp3'></audio>"
  )
  $container = $('.artwork-image')
  $image = $container.find('img')
  imgWidth = $image.width()
  imgHeight = $image.height()
  image = new Image  # used for canvas
  image.src = $('img').attr('src')
  beatDrops = [ 7000, 20600, 28300, 34400 ]
  beatStops = [ 17100, 27600, 30600, 39200 ]
  songEnd = 42000
  canvas = $("<canvas width=#{imgWidth} height=#{imgHeight}>")[0]
  $canvas = $(canvas)
  $canvas.css
    'display': 'inline-block'
    'position': 'absolute'
  $container.prepend canvas
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

  # Start 'er off!
  _.defer =>
    drawImage 0, 0
    $skrillex[0].play()
    syncBeats()
    _.delay (=> destroySkrillex()), songEnd
