window._ = require 'underscore'
window.Cookies = require 'cookies-js'
Events = require('@artsy/reaction/dist/Utils/Events.js').default

require '../lib/analytics_hooks.coffee'
require '../analytics/before_ready.js'

# All Reaction events are sent directly to Segment
Events.onEvent (data) =>
  if data.action
    # Old analytics schema
    analytics.track data.action, _.omit data, 'action'
  else if data.action_type
    # New analytics schema
    analytics.track data.action_type, _.omit data, 'action_type'
  else
    console.error("Unknown analytics schema being used: #{JSON.stringify(data)}")


$ -> analytics.ready ->

  if  sd.CURRENT_USER?.id
    allowedList = ['collector_level', 'default_profile_id', 'email', 'id', 'name', 'phone', 'type']
    traits = _.extend _.pick(sd.CURRENT_USER, allowedList), session_id: sd.SESSION_ID
    analytics.identify sd.CURRENT_USER.id, traits
    analyticsHooks.on 'auth:logged-out', -> analytics.reset()

  require '../analytics/global.js'
  require '../analytics/show_page.js'
  require '../analytics/bidding.js'
  require '../analytics/commercial_filter.js'
  require '../analytics/auth.js'
  require '../analytics/fairs.js'
  require '../analytics/following.js'
  require '../analytics/save.js'
  require '../analytics/partners.js'
  require '../analytics/personalize.js'
