_ = require 'underscore'
Backbone = require 'backbone'
Embedly = require '../embedly/index.coffee'
template = -> require('./template.jade') arguments...

module.exports = class MerchandisableView extends Backbone.View
  urlAttr: 'external_url'

  initialize: ->
    @urls = @collection.pluck(@urlAttr)
    @embedly = new Embedly
    @listenTo @embedly, 'sync', @render
    @embedly.fetch data: urls: @urls

  mergeCollections: ->
    @embedly.reset _.compact @embedly.map (model, i) =>
      if (reference = @collection.findWhere(external_url: model.get 'url'))
        model.set reference.toJSON()
    @embedly

  render: ->
    @$el.html template(items: @mergeCollections().models)
    this
