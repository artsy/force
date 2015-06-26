_ = require 'underscore'
_s = require 'underscore.string'
moment = require 'moment'
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
    return '' unless @isTravelingParent(item) and item.has('children')

    '<div class="filterable-list-item-travel">Traveled to ' +
    _.map(item.get('children'), (child) => @childTemplate(item, child)).join('; ') +
    '</div>'

  isTravelingParent: (item) ->
    item.has('key')

  isTravelingChild: (item) =>
    item.has('traveling') and (item.get('traveling') isnt item.get('key'))

  childTemplate: (parent, child) =>
    parentYear = moment(parent.get 'start_date').format('YYYY')
    childYear = moment(child.get 'start_date').format('YYYY')

    _.compact([
      @formattedPartner(child)
      child.get('city')
      child.get('country')
      childYear if childYear isnt parentYear
    ]).join ', '

  itemTemplate: ({ item, filter_by }) ->
    return if @isTravelingChild(item)

    displayString = _.compact([
      @formattedTitle(item)
      @formattedPartner(item)
      _s.capitalize(item.get 'city')
      _s.capitalize(item.get 'country')
    ]).join ', '

    "<div class='filterable-list-item' data-value='#{item.get(filter_by)}'>#{displayString}." +
    @formattedTraveling(item) +
    '</div>'

  setChildren: (item) =>
    parent = @filter.get('collection').findWhere(key: item.get 'traveling')
    if parent.has('children')
      parent.get('children').push item
    else
      parent.set 'children', [item]

  preprocessTraveling: ->
    @filter.get('collection').chain()
      .filter(@isTravelingChild)
      .each(@setChildren)
      .value()

  itemsRender: ->
    @preprocessTraveling()
    super
