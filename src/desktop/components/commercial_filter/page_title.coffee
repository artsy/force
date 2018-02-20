_ = require 'underscore'
{ capitalize } = require 'underscore.string'

module.exports = (query, filters) ->
  queriedFilter = {}
  if query.medium
    queriedFilter.medium = query.medium
  else
    queriedFilter.medium = '*'

  if query.gene_id
    queriedFilter.gene_id = query.gene_id
  else
    queriedFilter.gene_id = '*'

  pageTitle = _.find(filters, (filter) ->
    filter.gene_id is queriedFilter.gene_id and
    filter.medium is queriedFilter.medium
  )

  if pageTitle
    pageTitle.title.split(' ').map((word) -> capitalize(word)).join(' ') + ' for Sale'
  else
    'Collect | Artsy'