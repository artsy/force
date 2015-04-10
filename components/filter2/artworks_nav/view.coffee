_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'

filterTemplate = -> require('./template.jade') arguments...

module.exports = class FilterArtworksNav extends Backbone.View
  initialize: ({@collection, @params})->
    @listenTo @collection, 'sync', @renderFilter

  renderFilter: ->
    html = filterTemplate counts: @collection.counts
    @$el.html html

    @renderActiveParams()

  renderActiveParams: =>
    for attr in @params.keys()
      continue unless ($a = @$("a[data-attr='#{attr}'][data-val='#{@params.get(attr)}']")).length
      $a.addClass('is-active')
        .closest('.filter-dropdown')
        .addClass('is-active')
        .children('.filter-nav-active-text')
        .text $a.children('.filter-dropdown-text').text()