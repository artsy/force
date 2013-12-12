ZoomView = require '../../components/modal/zoom.coffee'

module.exports.init = ->
  $ ->
    $('.auction-lot-image-zoom').on 'click', (e) ->
      e.preventDefault()
      lightbox = new ZoomView imgSrc: $(this).attr 'href'
