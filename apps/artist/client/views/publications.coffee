_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
FilterableListView = require '../../../../components/filterable_list/view.coffee'
template = -> require('../../templates/sections/publications.jade') arguments...

class BiblographyListView extends FilterableListView
  itemTemplate: ({ item, filter_by }) ->
    displayString = _.compact([
      item.get('author').split(' ').reverse().join(', ') if item.has('author')
      "“#{item.get('title')}”"
      item.get('publisher_name')
      item.get('publication_name')
      moment(item.get('published_date')).format('D MMMM YYYY') if item.has('published_date')
    ]).join ', '
    """
      <div class='filterable-list-item' data-value='#{item.get(filter_by)}'>
        <a class='faux-underline' href='#{item.get('external_url')}' target='_blank'>
          #{displayString}.
        </a>
      </div>
    """

module.exports = class PublicationsView extends Backbone.View
  initialize: ->
    @collection = @model.related().bibliography

  postRender: ->
    @subView = new BiblographyListView
      collection: @collection
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
    @$el.html template
      artist: @model
      books: @collection.where(merchandisable: true)
      bibliography: @collection
    _.defer => @postRender()
    this

  remove: ->
    @subView?.remove()
