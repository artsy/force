_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
FilterableListView = require '../../../../components/filterable_list/view.coffee'
template = -> require('../../templates/sections/bibliography.jade') arguments...

class BiblographyListView extends FilterableListView
  itemTemplate: ({ item, filter_by }) ->
    displayString = _.compact([
      item.get('author').split(' ').reverse().join(', ') if item.has('author')
      "“#{item.get('name')}”"
      item.get('publisher')
      item.get('publication')
      moment(item.get('published_date')).format('D MMMM YYYY') if item.has('published_date')
    ]).join ', '
    """
      <div class='filterable-list-item' data-value='#{item.get(filter_by)}'>
        <a class='faux-underline' href='#{item.get('external_url')}' target='_blank'>
          #{displayString}.
        </a>
      </div>
    """

module.exports = class BibliographyView extends Backbone.View
  postRender: ->
    @subView = new BiblographyListView
      collection: @model.related().bibliography
      group_by: 'published_date'
      filter_by: 'type'
      filters:
        catalogue: 'Exhibition Catalogues'
        review: 'Exhibtion Reviews'
        interview: 'Interviews'
        monograph: 'Monographs'
        biography: 'Biographies'

    @$('#artist-page-content-section').html @subView.render().$el

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    @subView?.remove()
