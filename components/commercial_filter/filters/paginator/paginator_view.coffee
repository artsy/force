Backbone = require 'backbone'

template = -> require('./index.jade') arguments...

module.exports = class PaginatorView extends Backbone.View
  maxPage: 100

  events:
    'click li a' : 'setPage'

  initialize: ({ @params, @filter }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires a filter model' unless @filter?

    @listenTo @params, 'change:page', @render
    @listenTo @filter, 'change:total', @render

  setPage: (e) ->
    e.preventDefault()
    @params.set page: $(e.currentTarget).data('value')

  totalPages: ->
    calculated = Math.floor(@filter.get('total') / @params.get('size'))
    total = Math.min calculated, @maxPage

  render: ->
    @$el.html template
      current: @params.get('page')
      total: @totalPages()
