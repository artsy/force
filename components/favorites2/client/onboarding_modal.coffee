_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
template = -> require('../templates/onboarding_modal.jade') arguments...
Cookies = require 'cookies-js'

module.exports = class OnboardingModal extends ModalView

  template: template

  close: ->
    count = parseInt Cookies.get 'favorites_onboarding_dismiss_count'
    count ||= 0
    Cookies.set 'favorites_onboarding_dismiss_count', count + 1
    super

  events: -> _.extend super,
    'click a[href*=favorites]': 'clickedThrough'

  clickedThrough: ->
    Cookies.set 'favorites_onboarding_dismiss_count', 2