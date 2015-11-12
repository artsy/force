Backbone = require 'backbone'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
Q = require 'bluebird-q'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCell extends Backbone.View
  initialize: ->
    @listenTo @model, 'sync', @render

  render: =>
    @$el.html template profile:@model, partner:@model.related().owner

  fetchMetadata: ->
    @model.fetch()

