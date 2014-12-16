_ = require 'underscore'
FilterableListView = require '../../../../components/filterable_list/view.coffee'

module.exports = class ExhibitionHistoryListView extends FilterableListView
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
