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
    'click .auth-mode-toggle a': 'openLogin'
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
    queryData =
      'signup-intent': @signupIntent
      'signup-referer': location.href
      'redirect-to': '/personalize'
      'acquisition_initiative': "Marketing Modal #{@acquisitionInitiative}"
    queryString = $.param(queryData)
    fbUrl = sd.AP.facebookPath + '?' + queryString
    return window.location.href = fbUrl

  showFormError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @showError(msg)

  showError: (msg) =>
    @$('.auth-errors').text msg

  submit: (e) ->
    e.preventDefault()
    @$('form button').addClass 'is-loading'
    formData = @serializeForm()
    userData =
      'name': formData['name']
      'email': formData['email']
      'password': formData['password']
    analyticsData =
      'signup_intent': @signupIntent
      'acquisition_initiative': "Marketing Modal #{@acquisitionInitiative}"
    body = Object.assign {}, userData, analyticsData, formData
    $.ajax
      url: sd.AP.signupPagePath
      method: 'POST'
      data: body
      error: (e) =>
        err = e.responseJSON?.error or e.toString()
        @showFormError err
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

    return unless modalData
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
