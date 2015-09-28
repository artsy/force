Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class PartnerCellCarousel extends Backbone.View
  initialize: ({@partners}) ->

  render: ->
    @$el.html template partners: @partners
    this