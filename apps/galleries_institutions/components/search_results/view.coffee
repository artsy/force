Backbone = require 'backbone'
FilterPartners = require '../../../../collections/filter_partners.coffee'
template = -> require('./template.jade') arguments...

module.exports = class ResultsView extends Backbone.View

  initialize: ({ params }) ->
    @partners = new FilterPartners
    @listenTo params, 'change firstLoad', @paramsUpdated
    @listenTo @partners, 'sync', @render

  render: ->
    @$el.html template partners: @partners.models
    @$el.show()

  paramsUpdated: (params) ->
    if params.hasSelection()
      @partners.fetch data: params.toJSON()
    else
      @$el.hide()

