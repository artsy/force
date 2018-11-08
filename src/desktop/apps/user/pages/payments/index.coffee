{ invoke } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...
sd = require('sharify').data

module.exports = class PaymentsView extends Backbone.View
  subViews: []

  className: 'settings-page__payments'

  initialize: ({ @user }) -> #

  render: ->
    @$el.html template
      user: @user
      stitch: sd.stitch
    this
