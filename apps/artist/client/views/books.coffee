_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
MerchandisableView = require '../../../../components/merchandisable/view.coffee'
template = -> require('../../templates/sections/books.jade') arguments...

module.exports = class BooksView extends Backbone.View
  subViews: []

  postRender: ->
    merchandisableView = new MerchandisableView collection: @model.related().bibliography
    @$('#artist-page-merchandisable-section').html merchandisableView.render().$el
    @subViews.push merchandisableView

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
