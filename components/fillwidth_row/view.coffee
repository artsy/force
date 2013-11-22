_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class FillwidthView extends Backbone.View

  initialize: (options) ->
    { @seeMore, @fetchOptions } = options
    @page = 1
    @listenTo @collection, 'request', @renderSpinner
    @listenTo @collection, 'sync', @render
    @nextPage()

  renderSpinner: ->
    @$('.fillwidth-see-more').attr 'data-state', 'loading'

  render: =>
    @$el.html template artworks: @collection.models, seeMore: @seeMore
    @$('ul').fillwidth()
    if @seeMore and @page is 2
      _.defer @hidePastFirstRow

  hidePastFirstRow: =>
    firstItem = @$('ul li').first()
    firstItemTop = firstItem.offset().top if firstItem.length
    @$('ul li').each ->
      $(@).hide() if $(@).offset().top > firstItemTop

  events:
    'click .fillwidth-see-more': 'nextPage'

  nextPage: ->
    @collection.fetch
      remove: false
      data: _.extend { size: 15, page: @page++ }, @fetchOptions