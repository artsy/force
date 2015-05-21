_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
{ STATUSES } = require('sharify').data
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
        review: 'Exhibition Reviews'
        interview: 'Interviews'
        monograph: 'Monographs'
        biography: 'Biographies'

    @$('#artist-page-bibliography-section').html @subView.render().$el

  processBooks: ->
    books = _.map @model.related().bibliography.where(merchandisable: true), (book) -> book.toJSON()
    new Books(books, parse: true)

  render: ->
    @$el.html template
      STATUSES: STATUSES
      artist: @model
      books: @processBooks().models
      bibliography: @model.related().bibliography

    _.defer =>
      @postRender()

    this

  remove: ->
    @subView?.remove()
