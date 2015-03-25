#
# The edit request function used in Backbone Super Sync
#

{ API_REQUEST_TIMEOUT } = require '../config'
artsyXappMiddleware = require 'artsy-xapp-middleware'

module.exports = (req) ->
  req
    .set('X-XAPP-TOKEN': artsyXappMiddleware.token or '')
    .timeout(API_REQUEST_TIMEOUT)
    .on 'error', -> req.abort()
