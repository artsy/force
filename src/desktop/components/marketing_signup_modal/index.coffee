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
      image: @data.image
      photoCredit: @data.photoCredit
      textColor: @data.textColor
      textOpacity: @data.textOpacity
      copy: @data.copy
      slug: @data.slug
    this

  openLogin: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth',
      mode: 'login'
      signupIntent: 'marketing modal'
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
        flash = new FlashMessage message: 'Thank you for joining Artsy', href: '/personalize'
      complete: =>
        @$('form button').removeClass 'is-loading'

module.exports = class MarketingSignupModal extends Backbone.View

  initialize: ->
    slug = qs.parse(location.search.replace /^\?/, '')?['m-id']

    # Launches marketing signup modal for targeted url
    slug = 'ca3' if !slug and sd.CURRENT_PATH is sd.TARGET_CAMPAIGN_URL

    return unless sd.MARKETING_SIGNUP_MODALS?
    modalData = _.findWhere(sd.MARKETING_SIGNUP_MODALS, { slug: slug })
    @inner = new MarketingSignupModalInner
      data: modalData

    @modal = modalize @inner, backdropCloses: false, dimensions: width: ''
    className = 'marketing-signup-modal-container'
    className += '-mobile' if sd.IS_MOBILE
    @modal.view.$el.addClass className
    @inner.on 'close', => @modal.close()

    loggedOut = not sd.CURRENT_USER?
    delayDuration = if modalData?.duration then modalData?.duration else 2000

    setTimeout @open, delayDuration if loggedOut and modalData?

  open: =>
    @modal.open()
    @inner.$('input:first').focus()
