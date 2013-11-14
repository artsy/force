_         = require 'underscore'
Backbone  = require 'backbone'

module.exports = class FooterView extends Backbone.View
  initialize: (options) ->
    _.delay ->
      $(window).scrollTop($(document).height())
    , 200
