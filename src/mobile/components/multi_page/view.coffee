_ = require 'underscore'
Backbone = require 'backbone'
markdown = require '../util/markdown.coffee'
{ Page } = require '../../../desktop/models/page'
{ mediator } = require '../../../lib/mediator'
template = -> require('./template.jade') arguments...

module.exports = class MultiPageView extends Backbone.View
  className: 'multi-page-view'

  events:
    'click .js-page': 'change'

  initialize: ({ @title, @description, @pages }) ->
    pages = _.map @pages, (id, title) ->
      new Page id: id, title: title

    @collection = new Backbone.Collection pages

    @state = new Backbone.Model active: @collection.first().id
    @listenTo @state, 'change:active', @render

    @collection.each (page) =>
      @listenTo page, 'sync', @render

  change: (e) ->
    e.preventDefault()
    $target = $(e.currentTarget)
    @state.set 'active', $target.data 'id'
    _.defer @fireScrollEvent

  fireScrollEvent: =>
    mediator.trigger 'scrollto:element',
      $targetDiv: @$('.mpv-content.is-active').first()

  render: ->
    @$el.html template
      title: @title
      description: markdown @description
      pages: @collection
      active: @collection.get(@state.get('active'))
    this
