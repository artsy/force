BackbonePageableCollection = require 'backbone-pageable'

module.exports = class PageableCollection extends BackbonePageableCollection
  queryParams:
    currentPage: 'page'
    pageSize: 'size'

  parseState: (response, queryParams, state, options) ->
    if options.res
      totalRecords: parseInt(options.res.headers['x-total-count'] or 0)

  fetchUntilEnd: ->
    throw new Error 'fetchUntilEnd is not implemented'
