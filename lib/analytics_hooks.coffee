#
# A simple meditor specifically for providing custom analytics hooks in app code,
# leaving the tracking code inside /analytics.
#

_ = require 'underscore'
Backbone = require 'backbone'
module.exports = _.extend({}, Backbone.Events)
