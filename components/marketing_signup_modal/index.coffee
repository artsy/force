Backbone = require 'backbone'
qs = require 'querystring'
sd = require('sharify').data
_ = require('underscore')
FlashMessage = require '../flash/index.coffee'
modalize = require '../modalize/index.coffee'
mediator = require '../../lib/mediator.coffee'
template = -> require('./index.jade') arguments...

class MarketingSignupModalInner extends Backbone.View
  className: 'marketing-signup-modal'

  events:
    'submit form': 'submit'
    'click .marketing-signup-modal-have-account a': 'openLogin'

  initialize: ({@data}) ->

  render: ->
    @$el.html template
      modal: @data
    this

  openLogin: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'login'
    @trigger 'close'

  submit: (e) ->
    e.preventDefault()
    @$('.marketing-signup-modal-error').hide()
    @$('form button').addClass 'is-loading'
    $.ajax
      url: sd.AP.signupPagePath
      method: 'POST'
      data:
        name: @$('[name=name]').val()
        email: @$('[name=email]').val()
        password: @$('[name=password]').val()
        acquisition_initiative: sd.MARKETING_SIGNUP_MODAL_SLUG
      error: (e) =>
        err = e.responseJSON?.error or e.toString()
        @$('.marketing-signup-modal-error').show().text err
      success: =>
        @trigger 'close'
        flash = new FlashMessage message: 'Thank you for joining Artsy'
        flash.$el.on 'transitionend', -> setTimeout (-> location.reload()), 500
      complete: =>
        @$('form button').removeClass 'is-loading'

module.exports = class MarketingSignupModal extends Backbone.View

  initialize: ->
    slug = qs.parse(location.search.replace /^\?/, '')?['m-id']
    modalData = _.findWhere(sd.MARKETING_SIGNUP_MODALS, { slug: slug })
    @inner = new MarketingSignupModalInner
      data: modalData

    @modal = modalize @inner, backdropCloses: false, dimensions: width: ''
    className = 'marketing-signup-modal-container'
    className += '-mobile' if sd.IS_MOBILE
    @modal.view.$el.addClass className
    @inner.on 'close', => @modal.close()

    loggedOut = not sd.CURRENT_USER?
    setTimeout @open, 2000 if loggedOut and modalData?

  open: =>
    @modal.open()
    @inner.$('input:first').focus()
