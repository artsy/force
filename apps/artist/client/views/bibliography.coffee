_ = require 'underscore'
moment = require 'moment'
FilterableListView = require '../../../../components/filterable_list/view.coffee'

module.exports = class BiblographyListView extends FilterableListView
  hasAny: (item, attrs...) ->
    _.any _.map(attrs, (attr) -> item.has attr)

  formattedTitlte: (item) ->
    return unless item.has('title')
    "<em>#{item.get('title')}.</em>"

  formattedAuthors: (item) ->
    return unless item.has('author_names')
    "#{item.get('author_names')}."

  formattedPublishInformation: (item) ->
    return unless @hasAny item, 'publisher_name', 'publication_name'
    _.compact([
      item.get('publisher_name')
      item.get('publication_name')
    ]).join(', ') + '.'

  formattedPublicationLocationInformation: (item) ->
    return unless @hasAny item, 'page_number', 'issue_number', 'volume_number'
    _.compact([
      "pg. #{item.get('page_number')}" if item.has('page_number')
      "issue #{item.get('issue_number')}" if item.has('issue_number')
      "volume #{item.get('volume_number')}" if item.has('volume_number')
    ]).join(', ') + '.'

  itemTemplate: ({ item, filter_by }) ->
    displayString = if item.has('blob')
      item.get('blob')
    else
      _.compact([
        @formattedAuthors(item)
        @formattedTitlte(item)
        @formattedPublishInformation(item)
        @formattedPublicationLocationInformation(item)
      ]).join ' '

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
