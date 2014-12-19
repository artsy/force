_ = require 'underscore'
Backbone = require 'backbone'
FilterableListView = require '../../../../components/filterable_list/view.coffee'
template = -> require('../../templates/sections/collections.jade') arguments...

class CollectionsListView extends FilterableListView
  formattedName: (item) ->
    return unless item.has('name')
    if item.has('partner_id')
      "<a class='faux-underline' href=/#{item.get('partner_id')}>#{item.get('name')}</a>"
    else
      item.get 'name'

  itemTemplate: ({ item, column }) ->
    displayString = _.compact([
      @formattedName(item)
      item.get('city')
      item.get('country')
    ]).join ', '

    """
      <li class='filterable-list-item' data-value='#{item.get(column)}'>
        #{displayString}
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
