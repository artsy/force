Backbone = require 'backbone'

router = new Backbone.Router
clickedHref = null

module.exports = ($el) ->
  $el.on 'click', 'a[href]', (e) ->
    e.preventDefault()
    clickedHref = $(@).attr 'href'

    # We'll be stuck in the iframe until we navigate back to the location.pathname
    # (e.g via back button) at which point we'll remove the body class, hiding the iframe, and
    # leaving us at the place we scrolled to last.
    addIframe()
    router.route location.pathname.replace(/^\//, ''), removeIframe
    router.navigate clickedHref

  # Make sure history is started to use our internal router
  Backbone.history.start(pushState: true) unless Backbone.History.started

addIframe = ->
  $('#iframe-popover').html "<iframe src='#{clickedHref}'>"
  $('body').addClass('body-iframe-popover')

removeIframe = ->
  $('#iframe-popover').html ''
  $('body').removeClass('body-iframe-popover')

# To keep our router state from getting out of wack we'll do a full redirect after the first page
# in the iframe. We trigger this parent event inside the main_layout/templates/head.jade to make
# sure our route changes right away.
addEventListener 'message', (e) ->
  return if e.data.href is @location.href
  $('body').remove()
  @location = e.data.href