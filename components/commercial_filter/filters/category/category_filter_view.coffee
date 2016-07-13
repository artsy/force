Backbone = require 'backbone'

template = -> require('./index.jade') arguments...

module.exports = class CategoryFilterView extends Backbone.View
  events:
    'click .cf-categories__category' : 'toggleCategory'

  initialize: ({ @params, @aggregations, @categoryMap }) ->
    throw new Error "Requires a params model" unless @params
    throw new Error "Requires an aggregations collection" unless @aggregations

    @listenTo @params, 'change:medium change:gene_id', @render
    @listenTo @aggregations, 'reset', @render
    @listenTo @params, 'change:include_artworks_by_followed_artists', @toggleDisplay

  setCategory: (e) ->
    @params.set gene_id: $(e.currentTarget).data('id')

  toggleDisplay: ->
    if @params.get('include_artworks_by_followed_artists')
      @params.unset('gene_id')
      @$el.hide()
    else
      @$el.show()

  toggleCategory: (e) ->
    category = $(e.currentTarget).data('id')
    if @params.get('gene_id') is category
      @params.unset('gene_id')
    else
      @params.set gene_id: category, page: 1

  hasResults: (counts, id) ->
    _.any counts, (count) -> count.id is id

  render: ->
    return if @params.get('include_artworks_by_followed_artists')
    @$el.html template
      categories: @categoryMap[@params.get('medium') || 'global']
      selectedCategory: @params.get('gene_id')
      hasResults: @hasResults
      counts: @aggregations.get('MEDIUM')?.get('counts')


