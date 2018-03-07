Backbone = require 'backbone'
qs = require 'querystring'
sd = require('sharify').data
_ = require('underscore')
FlashMessage = require '../flash/index.coffee'
modalize = require '../modalize/index.coffee'
mediator = require '../../lib/mediator.coffee'
template = -> require('./index.jade') arguments...
Form = require('../mixins/form.coffee')

class MarketingSignupModalInner extends Backbone.View
  _.extend @prototype, Form

  className: 'marketing-signup-modal'

  signupIntent: 'marketing modal'

  events:
    'click .marketing-signup-modal-have-account a': 'openLogin'
    'click #signup-fb': 'fbSignup'
    'submit form': 'submit'

  initialize: ({@data}) ->
    @acquisitionInitiative = @data?.slug

  render: ->
    @$el.html template
      image: @data.image
      photoCredit: @data.photoCredit
      textColor: @data.textColor
      textOpacity: @data.textOpacity
      copy: @data.copy
    this

  openLogin: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth',
      mode: 'login'
      signupIntent: @signupIntent
    @trigger 'close'

  fbSignup: (e) ->
    e.preventDefault()
    formData = @serializeForm()
    if $('input#accepted_terms_of_service')[0].checkValidity()
      queryData = {
        'redirect-to': '/personalize'
        'signup-intent': @signupIntent
        'receive-emails': !!formData['receive_emails']
        'accepted-terms-of-service': !!formData['accepted_terms_of_service']
        'acquisition_initiative': sd.MARKETING_SIGNUP_MODAL_SLUG || @acquisitionInitiative
      }
      queryString = $.param(queryData)
      redirectUrl = sd.AP.facebookPath + '?'
      redirectUrl += queryString
      window.location.href = sd.AP.facebookPath
    else
      @showError('Please accept the Terms of Service.')

  showError: (msg) =>
    @$('.auth-errors').text msg

  submit: (e) ->
    e.preventDefault()
    @$('.marketing-signup-modal-error').hide()
    @$('form button').addClass 'is-loading'
    formData = @serializeForm()
    body =
      'name': formData['name']
      'email': formData['email']
      'password': formData['password']
      'signup_intent': @signupIntent
      'receive_emails': !!formData['receive_emails']
      'accepted_terms_of_service': !!formData['accepted_terms_of_service']
      'acquisition_initiative': sd.MARKETING_SIGNUP_MODAL_SLUG || @acquisitionInitiative
    $.ajax
      url: sd.AP.signupPagePath
      method: 'POST'
      data: body
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
