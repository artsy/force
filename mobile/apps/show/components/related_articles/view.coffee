_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
{ crop } = require '../../../../components/resizer/index'

module.exports = class RelatedArticlesView extends Backbone.View

  defaults:
    numToShow: 4

  initialize: (options = {}) ->
    { @numToShow } = _.defaults options, @defaults
    @listenTo @collection, 'sync', @render

  render: ->
    if @collection.length
      @$el.html template
        articles: @collection.take(@numToShow)
        remaining: Math.max((@collection.length - @numToShow), 0)
        crop: crop
    this

  events:
    'click .related-articles-show-all': 'showAll'

  showAll: (e) ->
    e.preventDefault()
    @numToShow = @collection.length
    @render()
