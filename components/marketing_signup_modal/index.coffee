Backbone = require 'backbone'
url = require 'url'
sd = require('sharify').data
FlashMessage = require '../flash/index.coffee'
modalize = require '../modalize/index.coffee'
template = -> require('./index.jade') arguments...

class MarketingSignupModalInner extends Backbone.View
  className: 'marketing-signup-modal'

  events:
    'submit form': 'submit'

  render: ->
    @$el.html template()
    @$('input:first').focus()
    this

  submit: (e) ->
    e.preventDefault()
    @$('.marketing-signup-modal-error').hide()
    @$('form button').addClass 'is-loading'
    $.ajax
      url: "#{sd.API_URL}/api/v1/user"
      method: 'POST'
      data:
        email: @$('[name=email]').val()
        password: @$('[name=password]').val()
      error: (e) =>
        err = e.responseJSON?.error or e.toString()
        @$('.marketing-signup-modal-error').show().text err
      success: =>
        @trigger 'close'
        new FlashMessage message: 'Thank you for joining Artsy'
      complete: =>
        @$('form button').removeClass 'is-loading'

module.exports = class MarketingSignupModal extends Backbone.View

  initialize: ->
    @inner = new MarketingSignupModalInner
    @modal = modalize @inner, dimensions: width: '900px'
    @modal.view.$el.addClass 'marketing-signup-modal-container'
    @inner.on 'close', => @modal.close()
    @maybeOpen()

  maybeOpen: ->
    host = url.parse(sd.APP_URL).host
    ref = document.referrer
    fromOutsideArtsy = Boolean ref and not host.match(ref)?
    loggedOut = not sd.CURRENT_USER?
    setTimeout (=> @modal.open()), 3000 if loggedOut and fromOutsideArtsy
