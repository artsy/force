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
  'X-XAPP-TOKEN'  : sd.ARTSY_XAPP_TOKEN
  'X-ACCESS-TOKEN': sd.CURRENT_USER?.accessToken

# Add global error handler that sends javascript errors to an
# endpoint for New Relic to track.
window.onerror = (msg, url, lineno, linecol, err) ->
  $.ajax
    url: '/force/javascripterr'
    type: 'POST'
    data:
      msg: msg
      fileurl: url
      lineno: lineno
      linecol: linecol
      stack: err.stack
      href: location.href

$ ->
  new HeaderView el: $('#main-layout-header'), $window: $(window), $body: $('body')
  new FooterView el: $('#main-layout-footer')

  # Initialize analytics & track page view if we included mixpanel
  # (not included in test environment).
  unless typeof mixpanel is 'undefined'
    analytics(mixpanel: mixpanel, ga: ga)
    analytics.trackPageview()

  if sd.AUTO_GRAVITY_LOGIN and not sd.CURRENT_USER
    $.ajax
      type: "POST"
      url: "/api/v1/me/trust_token"
      success: (response) ->
        $.ajax
          type: "POST"
          url: "/force/users/sign_in_trust_token?token=#{response.trust_token}&redirect-to=#{window.location.pathname}"
          success: (response) ->
            window.location.reload()
