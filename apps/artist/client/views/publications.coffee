_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
Books = require '../../../../components/artsypedia/collection.coffee'
BiblographyListView = require './bibliography.coffee'
template = -> require('../../templates/sections/publications.jade') arguments...

module.exports = class PublicationsView extends Backbone.View
  initialize: ->
    @listenTo @model.related().bibliography, 'sync', @render
    @model.related().bibliography.fetch()

  postRender: ->
    @subView = new BiblographyListView
      collection: @model.related().bibliography
      group_by: 'publish_date'
      filter_by: 'kind'
      filters:
        book: 'Books'
        article: 'Articles'
        catalogue: 'Exhibition Catalogues'
        review: 'Exhibtion Reviews'
        interview: 'Interviews'
        monograph: 'Monographs'
        biography: 'Biographies'

    @$('#artist-page-bibliography-section').html @subView.render().$el

  render: ->
    books = _.map @model.related().bibliography.where(merchandisable: true), (book) -> book.toJSON()
    books = new Books(books, parse: true)

    @$el.html template
      artist: @model
      books: books.models
      bibliography: @model.related().bibliography

    _.defer => @postRender()

    this

  remove: ->
    @subView?.remove()
