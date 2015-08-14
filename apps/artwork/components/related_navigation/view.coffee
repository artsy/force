_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class RelatedNavigationView extends Backbone.View
  className: 'artwork-related-navigation'

  aspects: ['sales', 'fairs']

  initialize: ->
    _.map @aspects, (aspect) =>
      @listenTo @model.related()[aspect], 'sync', @render

  relevant: ->
    _.pick @model.related(), @aspects

  focus: ->
    _.reduce @relevant(), (memo, collection, name) ->
      memo[name.replace /s$/, ''] = collection.first() if collection.length
      memo
    , {}

  render: ->
    @$el.html template(_.extend {}, @focus(), artwork: @model)
    this
