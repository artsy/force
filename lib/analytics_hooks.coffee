#
# A simple meditor specifically for providing custom analytics hooks in app code,
# leaving the tracking code inside /analytics.
#

_ = require 'underscore'
Backbone = require 'backbone'

analyticsHooks = _.extend {}, Backbone.Events
module.exports = (window?.analyticsHooks ?= analyticsHooks) or analyticsHooks
