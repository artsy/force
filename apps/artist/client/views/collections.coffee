_ = require 'underscore'
Backbone = require 'backbone'
FilterableListView = require '../../../../components/filterable_list/view.coffee'
template = -> require('../../templates/sections/collections.jade') arguments...

class CollectionsListView extends FilterableListView
  itemTemplate: ({ item, column }) ->
    displayString = _.compact([
      item.get('name')
      item.get('city')
      item.get('country')
    ]).join ', '
    innerTemplate = if item.has 'partner_id'
      "<a class='faux-underline' href='/#{item.get('partner_id')}' target='_blank'>#{displayString}</a>"
    else
      displayString
    """
      <li class='filterable-list-item' data-value='#{item.get(column)}'>
        #{innerTemplate}
      </li>
    """

module.exports = class CollectionsView extends Backbone.View
  initialize: ->
    @model.related().collections.fetch()

  postRender: ->
    @subView = new CollectionsListView
      collection: @model.related().collections
      filter_by: 'kind'
      filters:
        public: 'Public Collections'
        private: 'Private Collections'

    @$('#artist-page-content-section').html @subView.render().$el

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    @subView?.remove()
