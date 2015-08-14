#
# The edit request function used in Backbone Super Sync
#

{ API_REQUEST_TIMEOUT } = require '../config'
artsyXapp = require 'artsy-xapp'

module.exports = (req) ->
  req.set('X-XAPP-TOKEN': artsyXapp.token) if artsyXapp.token
  req.timeout(API_REQUEST_TIMEOUT).on 'error', -> req.abort()
