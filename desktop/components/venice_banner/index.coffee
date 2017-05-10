_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
analyticsHooks = require '../../lib/analytics_hooks.coffee'

module.exports = class VeniceBanner extends Backbone.View
  events:
    'click .venice-redirect-banner a.icon-close' : 'closeVeniceBanner'
    'click .venice-redirect-banner a:not(.icon-close)' : 'analytics'

  initialize: ->
    @$el.html template

  closeVeniceBanner: (e) ->
    e.preventDefault()
    $('.venice-redirect-banner').fadeOut()

  analytics: ->
    analyticsHooks.trigger 'veniceBannerClick'