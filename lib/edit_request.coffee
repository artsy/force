#
# The edit request function used in Backbone Super Sync
#

{ API_REQUEST_TIMEOUT } = require '../config'
artsyXappMiddlware = require 'artsy-xapp-middleware'

module.exports = (req) ->
  req
    .set('X-XAPP-TOKEN': artsyXappMiddlware.token)
    .timeout(API_REQUEST_TIMEOUT)
    .on 'error', -> req.abort()
