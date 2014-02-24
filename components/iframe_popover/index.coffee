_ = require 'underscore'
Backbone = require 'backbone'

router = new Backbone.Router
clickedHref = null

module.exports = ($el) ->
  $el.on 'click', 'a[href]', (e) ->
    e.preventDefault()
    _.defer => onClick $(this).attr('href')

  # Make sure history is started to use our internal router
  Backbone.history.start(pushState: true) unless Backbone.History.started

onClick = (href) ->
  clickedHref = href
  addIframe()
  router.route location.pathname.replace(/^\//, ''), removeIframe
  router.navigate clickedHref

addIframe = ->
  $('#iframe-popover').html "<iframe src='#{clickedHref}'>"
  $('body').addClass('body-iframe-popover')

removeIframe = ->
  $('#iframe-popover').html ''
  $('body').removeClass('body-iframe-popover')

# To keep our router state from getting out of wack we'll do a full redirect after the first page
# in the iframe. We trigger this parent event inside the main_layout/templates/head.jade to make
# sure our route changes right away.
addEventListener? 'message', (e) ->
  return if e.data.href is @location.href
  $('body').remove()
  @location = e.data.href