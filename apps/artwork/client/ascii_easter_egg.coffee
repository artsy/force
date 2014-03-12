Konami = require 'konami-js'

module.exports = (artwork) ->
  $div = $ "<div><pre></pre></div>"
  $pre = $div.children()
  $container = $('.artwork-image')
  $div.css
    'position'    : 'absolute'
    'left'        : 0
    'top'         : 0
    'width'       : '100%'
    'background'  : 'white'
    'text-align'  : 'center'
    'top'         : '50%'
  $pre.css
    'font-family' : 'courier'
    'text-align'  : 'left'
    'font-size'   : '10px'
    'line-height' : '12px'
    'font-weight' : 'bold'
    'display'     : 'inline-block'
  animate = ->
    $('body, html').scrollTop(0)
    $.ajax(artwork.url() + '.txt').then (txt) ->
      $pre.text txt
      $container
        .css(position: 'relative')
        .append($div)
        .height($('.artwork-image').height())
      $div.css("margin-top": -$div.height() / 2)
      $container.find('img').animate {
        'height'     : $pre.height(),
        'width'      : $pre.width()
        'margin-top' : $div.offset().top - $container.offset().top
      }, 300, -> $div.fadeIn(1000)
      $div.hide()
  new Konami animate