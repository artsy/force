Q         = require 'q'
request   = require 'superagent'

# Makes a HEAD request,
# ensures the total_count param is set,
# overrides the page and size params,
# and resolves a promise with the total count
module.exports = (token, url) ->
  dfd = Q.defer()
  request.
    head(url).
    set('X-XAPP-TOKEN': token).
    query(
      size: 1
      page: 1
      total_count: 1
    ).
    end (res) ->
      dfd.resolve res.header['x-total-count']
  dfd.promise
