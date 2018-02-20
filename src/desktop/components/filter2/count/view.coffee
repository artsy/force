_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class CountView extends Backbone.View
  initialize: ({@collection, @params}) ->
    @listenTo @collection, 'sync', @updateMeta, @
    @listenTo @collection, 'sync', @updateCounts, @

  totalCount: ->
    _s.numberFormat @collection.counts.total.value

  updateCounts: ->
    work = if @totalCount() is "1" then 'Work' else 'Works'
    @$el.text "#{@totalCount()} #{work}"

  updateMeta: ->
    return if sd.FAIR
    $('meta[name=description]').remove()
    $('head').append("<meta name='description' content='Collect #{@totalCount()} artworks. Purchase online or connect with over 1,500 top galleries.'>")
