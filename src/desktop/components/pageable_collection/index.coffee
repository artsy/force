BackbonePageableCollection = require 'backbone.paginator'

module.exports = class PageableCollection extends BackbonePageableCollection
  queryParams:
    currentPage: 'page'
    pageSize: 'size'

  parseState: (response, queryParams, state, options) ->
    if options.xhr?.getResponseHeader('x-total-count')  # for client-side usage
      return totalRecords: parseInt(options.xhr.getResponseHeader('x-total-count') or 0)
    if options.res
      return totalRecords: parseInt(options.res.headers['x-total-count'] or 0)

  fetchUntilEnd: ->
    throw new Error 'fetchUntilEnd is not implemented'
