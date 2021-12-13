_ = require 'underscore'
Backbone = require 'backbone'
markdown = require '../util/markdown.coffee'
{ Page } = require '../../models/page'
template = -> require('./template.jade') arguments...

module.exports = class MultiPageView extends Backbone.View
  className: 'multi-page-view'

  events:
    'click .js-page': 'change'

  initialize: ({ @title, @description, @pages, @defaultPageId }) ->
    @collection = new Backbone.Collection _.map @pages, (id, title) ->
      new Page id: id, title: title

    @state = new Backbone.Model active: if @collection.get(@defaultPageId) then @defaultPageId else @collection.first().id

    @listenTo @state, 'change:active', @render

    @collection.each (page) =>
      @listenTo page, 'sync', @render

  change: (e) ->
    e.preventDefault()
    @state.set 'active', $(e.currentTarget).data 'id'

  render: ->
    @$el.html template
      title: @title
      description: markdown @description
      pages: @collection
      active: @collection.get(@state.get('active'))
    this
