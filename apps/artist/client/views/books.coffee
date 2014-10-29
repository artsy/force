_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
template = -> require('../../templates/sections/books.jade') arguments...

module.exports = class BooksView extends Backbone.View
  render: ->
    @$el.html template(artist: @model, books: @model.related().merchandisable.models)
    this
