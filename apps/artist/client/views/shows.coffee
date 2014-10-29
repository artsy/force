_ = require 'underscore'
Backbone = require 'backbone'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
FilterableListView = require '../../../../components/filterable_list/view.coffee'
template = -> require('../../templates/sections/shows.jade') arguments...

class ExhibitionHistoryListView extends FilterableListView
  itemTemplate: ({ item, filter_by }) ->
    showFragment = if item.has('show_id')
      "<a class='faux-underline' href=/show/#{item.get('show_id')}>#{item.get('title')}</a>"
    else
      item.get 'title'
    partnerFragment = if item.has('partner_id')
      "<a class='faux-underline' href=/#{item.get('partner_id')}>#{item.get('partner_name')}</a>"
    else
      item.get 'partner_name'
    displayFragment = _.compact([
      showFragment
      partnerFragment
      item.get('city')
      item.get('country')
    ]).join ', '
    """
      <div class='filterable-list-item' data-value='#{item.get(filter_by)}'>
        #{displayFragment}.
      </div>
    """

module.exports = class ShowsView extends Backbone.View
  subViews: []

  postRender: ->
    relatedShowsSubView = new RelatedShowsView collection: @model.related().shows, nUp: 3, maxShows: 20
    @subViews.push relatedShowsSubView

    exhibitionHistoryListSubView = new ExhibitionHistoryListView
      collection: @model.related().exhibitions
      group_by: 'start_date'
      filter_by: 'kind'
      filters:
        solo: 'Solo Shows'
        'two-person': 'Two-person Shows'
        group: 'Group Shows'
        screening: 'Screenings'
    @subViews.push exhibitionHistoryListSubView
    @model.related().exhibitions.fetch()

    @$('#artist-page-content-section').html [
      relatedShowsSubView.render().$el
      exhibitionHistoryListSubView.render().$el
    ]

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
