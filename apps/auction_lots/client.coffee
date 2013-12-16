ZoomView  = require '../../components/modal/zoom.coffee'
mediator  = require '../../lib/mediator.coffee'

module.exports.init = ->
  $ ->
    $('.auction-lot-image-zoom').on 'click', (e) ->
      e.preventDefault()
      lightbox = new ZoomView imgSrc: $(this).attr 'href'

    $('.auction-lot-sale-signup').on 'click', (e) ->
      e.preventDefault()
      mediator.trigger 'open:auth', { mode: 'signup' }
