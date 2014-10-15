_ = require 'underscore'
Backbone = require 'backbone'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
template = -> require('../../templates/sections/shows.jade') arguments...

module.exports = class ShowsView extends Backbone.View
  initialize: ->
    @collection = @model.related().shows

  postRender: ->
    @subView = new RelatedShowsView collection: @collection, nUp: 3, maxShows: 20
    @$('#artist-page-content-section').html @subView.render().$el

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    @subView?.remove()
