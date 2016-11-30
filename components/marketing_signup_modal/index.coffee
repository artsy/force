Backbone = require 'backbone'
qs = require 'querystring'
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
      url: sd.AP.signupPagePath
      method: 'POST'
      data:
        email: @$('[name=email]').val()
        password: @$('[name=password]').val()
        acquisition_initiative: sd.MARKETING_SIGNUP_MODAL_SLUG
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
    slug = qs.parse(location.search.replace /^\?/, '')?['m-id']

    linkedFromCampaign = slug is sd.MARKETING_SIGNUP_MODAL_SLUG
    loggedOut = not sd.CURRENT_USER?

    setTimeout (=> @modal.open()), 3000 if loggedOut and linkedFromCampaign
