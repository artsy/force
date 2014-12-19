_ = require 'underscore'
FilterableListView = require '../../../../components/filterable_list/view.coffee'

module.exports = class ExhibitionHistoryListView extends FilterableListView
  formattedTitle: (item) ->
    return unless item.has('title')
    title = "<em>#{item.get('title')}</em>"
    if item.has('show_id')
      "<a class='faux-underline' href=/show/#{item.get('show_id')}>#{title}</a>"
    else
      title

  formattedPartner: (item) ->
    return unless item.has('partner_name')
    if item.has('partner_id')
      "<a class='faux-underline' href=/#{item.get('partner_id')}>#{item.get('partner_name')}</a>"
    else
      item.get 'partner_name'

  formattedTraveling: (item) ->
    return unless item.has('traveling') or item.has('key')
    '(Traveling Exhibition)'

  itemTemplate: ({ item, filter_by }) ->
    displayString = _.compact([
      @formattedTitle(item)
      @formattedPartner(item)
      item.get('city')
      item.get('country')
      @formattedTraveling(item)
    ]).join ', '

    """
      <div class='filterable-list-item' data-value='#{item.get(filter_by)}'>
        #{displayString}.
      </div>
    """
