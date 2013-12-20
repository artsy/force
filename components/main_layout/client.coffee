Backbone    = require 'backbone'
Backbone.$  = $
HeaderView  = require './header/view.coffee'
FooterView  = require './footer/view.coffee'
sd          = require('sharify').data
analytics   = require '../../lib/analytics.coffee'

require '../../node_modules/typeahead.js/dist/typeahead.min.js'
require('jquery.transition')($, document)
require 'jquery.fillwidth'
require 'jquery.dotdotdot'

$.ajaxSettings.headers =
  'X-XAPP-TOKEN'  : sd.GRAVITY_XAPP_TOKEN
  'X-ACCESS-TOKEN': sd.CURRENT_USER?.accessToken

$ ->
  new HeaderView el: $('#main-layout-header'), $window: $(window), $body: $('body')
  new FooterView el: $('#main-layout-footer')

  # Initialize analytics & track page view if we included mixpanel
  # (not included in test environment).
  unless typeof mixpanel is 'undefined'
    analytics(mixpanel: mixpanel, ga: ga)
    analytics.trackPageview()

  if sd.AUTO_GRAVITY_LOGIN
    $.ajax
      type: "POST"
      url: "/api/v1/me/trust_token"
      success: (response) ->
        $.ajax
          type: "POST"
          url: "/force/users/sign_in_trust_token?token=#{response.trust_token}&redirect-to=#{window.location.pathname}"
          success: (response) ->
            console.log response
          error: (error) ->
            console.log error
