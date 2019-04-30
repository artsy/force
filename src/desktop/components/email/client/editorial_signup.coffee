{ once } = require 'lodash'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
Cookies = require '../../cookies/index.coffee'
qs = require 'querystring'

module.exports = class EditorialSignupView extends Backbone.View

  initialize: () ->
    return if @fromSailthru() or sd.IS_MOBILE or sd.CURRENT_USER

    @params = qs.parse(location.search.replace(/^\?/, ''))
    mediator.on 'modal:closed', @setDismissCookie
    mediator.on 'auth:sign_up:success', @setDismissCookie
    @revealArticlePopup = once(@revealArticlePopup)
    @showCTA()

  fromSailthru: ->
    @params.utm_source is 'sailthru' or
    @params.utm_content?.includes('st-', 0)

  showCTA: ->
    if !Cookies.get('editorial-signup-dismissed')
      $(window).on 'scroll', () =>
        setTimeout(@revealArticlePopup, 2000)

  revealArticlePopup: ->
    mediator.trigger('open:auth', {
      mode: 'signup'
      intent: 'Viewed editorial'
      signupIntent: 'signup'
      trigger: 'timed'
      triggerSeconds: 2
      copy: 'Sign up for the Best Stories in Art and Visual Culture'
      destination: location.href
    })

  setDismissCookie: ->
    Cookies.set 'editorial-signup-dismissed', 1, expires: 31536000
