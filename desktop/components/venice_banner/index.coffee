_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class VeniceBanner extends Backbone.View
  events:
    'click .venice-redirect-banner a.icon-close' : 'closeVeniceBanner'

  initialize: ->
    @$el.html template

  closeVeniceBanner: (e) ->
    e.preventDefault()
    $('.venice-redirect-banner').fadeOut()