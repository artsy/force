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
    router.route location.pathname.replace(/^\//, ''), hideIframe
    router.route clickedHref.replace(/^\//, ''), showIframe
    router.navigate clickedHref, trigger: true

    # To keep our navigation up to date we'll have our router change whenever links inside
    # the iframe are clicked (if it's an external) url we'll refresh the page and lose our place.

  # Make sure history is started to use our internal router
  Backbone.history.start(pushState: true) unless Backbone.History.started

showIframe = ->
  $('#iframe-popover').html "<iframe src='#{clickedHref}'>"
  $('body').addClass('body-iframe-popover')

hideIframe = ->
  $('#iframe-popover').html ''
  $('body').removeClass('body-iframe-popover')

addEventListener 'message', (e) ->
  return if not e.data.path or e.data.path is location.path
  router.navigate e.data.path