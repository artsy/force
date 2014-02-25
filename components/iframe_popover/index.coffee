_ = require 'underscore'
Backbone = require 'backbone'

router = new Backbone.Router
href = null

module.exports = ($el) ->
  $el.on 'click', 'a[href]', onClick
  # Make sure history is started to use our internal router
  Backbone.history.start(pushState: true) unless Backbone.History.started

onClick = (e) ->
  e.preventDefault()
  href = $(this).attr('href')
  _.defer =>
    setIframe()
    router.route location.pathname.replace(/^\//, ''), removeIframe
    router.navigate href

setIframe = ->
  $('#iframe-popover').html "<iframe src='#{href}'>"
  $('body').addClass('body-iframe-popover')

removeIframe = ->
  $('#iframe-popover').html ''
  $('body').removeClass('body-iframe-popover')

# To keep our router state from getting out of wack we'll do a full redirect after the first page
# in the iframe. We trigger this parent event inside the main_layout/templates/head.jade to make
# sure our route changes right away.
addEventListener? 'message', (e) ->
  return unless e.data.href
  return if e.data.href is @location.href
  $('body').remove()
  @location = e.data.href
