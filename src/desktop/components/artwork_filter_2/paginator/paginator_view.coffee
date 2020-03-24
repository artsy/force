Backbone = require 'backbone'

template = -> require('./index.jade') arguments...

module.exports = class PaginatorView extends Backbone.View
  maxPage: 100
  pagesInterval: 2

  events:
    'click li a' : 'setPage'

  initialize: ({ @params, @filter, @hidePageNumbers = false }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires a filter model' unless @filter?

    @listenTo @params, 'change:page', @render
    @listenTo @filter, 'change:total', @render

  setPage: (e) ->
    e.preventDefault()
    @params.set page: $(e.currentTarget).data('value')

  totalPages: ->
    calculated = Math.ceil(@filter.get('total') / @params.get('size'))
    Math.min calculated, @maxPage

  adjustedTotal: ->
    Math.max @totalPages(), 2

  render: ->
    @$el.html template
      current: parseInt @params.get('page')
      total: @adjustedTotal()
      pagesInterval: @pagesInterval
    @_postRender()

  _postRender: ->
    @$('.bordered-pagination').addClass('bordered-pagination__hide-next') if @totalPages() is 1

    if @hidePageNumbers
      @$el.find('ul,li').css('list-style', 'none')
      @$el.find('ul').css('display', 'none')
      @$el.find('ul:last-child').css('display', 'inline-block')

      if Number(@params.get 'page') > 1
        @$el.find('ul:first-child').css('display', 'inline-block')

        if Number(@params.get 'page') is @adjustedTotal()
          @$el.find('ul:last-child').hide()
