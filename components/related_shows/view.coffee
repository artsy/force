_         = require 'underscore'
Backbone  = require 'backbone'
template  = -> require('./template.jade') arguments...

module.exports = class RelatedShowsView extends Backbone.View
  initialize: ->
    @fetchThenRender()

  fetchThenRender: ->
    @listenTo @collection, 'sync', @render
    @collection.fetch()

  render: ->
    if @collection.length
      @$el.show()
      _.defer =>
        @$el.
          addClass('is-fade-in').
          html template
            artist : @model
            shows  : @collection
      this
    else
      @remove()
