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
    'click #signup-fb': 'fbSignup'
    'change #accepted_terms_of_service': 'checkAcceptedTerms'

  initialize: ({@data}) ->
    @acquisitionInitiative = @data?.slug
    $('#accepted_terms_of_service').on('invalid', @checkAcceptedTerms)

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
      'redirect-to': '/personalize'
      'acquisition_initiative': "Marketing Modal #{@acquisitionInitiative}"
    queryString = $.param(queryData)
    fbUrl = sd.AP.facebookPath + '?' + queryString
    console.log('fbUrl', fbUrl)
    return window.location.href = fbUrl if @DISABLE_GDPR

    if @checkAcceptedTerms()
      gdprString = $.param(@gdprData(@serializeForm()))
      gdprFbUrl = fbUrl + "&" + gdprString
      window.location.href = gdprFbUrl

  gdprData: (formData) ->
    return {} if @gdprDisabled
    if sd.GDPR_COMPLIANCE_TEST == 'separated_checkboxes'
      'receive-emails': !!formData['receive_emails']
      'accepted-terms-of-service': !!formData['accepted_terms_of_service']
    else if sd.GDPR_COMPLIANCE_TEST == 'combined_checkboxes'
      'receive-emails': !!formData['accepted_terms_of_service']
      'accepted-terms-of-service': !!formData['accepted_terms_of_service']

  showFormError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @showError(msg)

  showError: (msg) =>
    @$('.auth-errors').text msg

  checkAcceptedTerms: () ->
    input = $('input#accepted_terms_of_service').get(0)
    input.setCustomValidity? ''
    if $(input).prop('checked')
      $('.tos-error').text ''
      $boxContainer = $('.gdpr-signup__form__checkbox__accept-terms')
      $boxContainer.attr('data-state', null)
      true
    else
      $boxContainer = $('.gdpr-signup__form__checkbox__accept-terms')
      $boxContainer.attr('data-state', 'error')
      input = $('input#accepted_terms_of_service').get(0)
      input.setCustomValidity('')
      $('.tos-error').text 'Please agree to our terms to continue'
      false

  submit: (e) ->
    e.preventDefault()
    @$('form button').addClass 'is-loading'
    formData = @serializeForm()
    body =
      'name': formData['name']
      'email': formData['email']
      'password': formData['password']
      'signup_intent': @signupIntent
      'receive_emails': !!formData['receive_emails']
      'accepted_terms_of_service': !!formData['accepted_terms_of_service']
      'acquisition_initiative': "Marketing Modal #{@acquisitionInitiative}"
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
