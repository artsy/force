_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
FilterableListView = require '../../../../components/filterable_list/view.coffee'
Books = require '../../../../components/artsypedia/collection.coffee'
template = -> require('../../templates/sections/publications.jade') arguments...

class BiblographyListView extends FilterableListView
  itemTemplate: ({ item, filter_by }) ->
    displayString = if item.has('blob')
      item.get('blob')
    else
      _.compact([
        item.get('author').split(' ').reverse().join(', ') if item.has('author')
        item.get('title')
        item.get('publisher_name')
        item.get('publication_name')
        moment(item.get('published_date')).format('D MMMM YYYY') if item.has('published_date')
      ]).join ', '

    template = "<div class='filterable-list-item' data-value='#{item.get(filter_by)}'>"
    template += if item.has('external_url')
      """
        <a href='#{item.get('external_url')}' target='_blank'>
          #{displayString}
        </a>
      """
    else
      displayString
    template += '</div>'

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
