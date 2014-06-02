#
# Simple wrapper around mixpanel to simplify common analytics actions.
# This should also provide a central place to put analytics logic when/if other
# services like Google Analytics are integrated.
#

_          = require 'underscore'
sd         = require('sharify').data
createHash = require('crypto').createHash
qs         = require('querystring')

_.mixin(require 'underscore.string')

module.exports = (options) =>
  return if module.exports.getUserAgent()?.indexOf?('PhantomJS') > -1
  { @ga, @location } = options
  @location ?= window?.location
  if sd.GOOGLE_ANALYTICS_ID
    googleAnalyticsParams = cookieDomain: 'artsy.net'

    if sd.CURRENT_USER?.id
      googleAnalyticsParams.userId = sd.CURRENT_USER?.id

    @ga? 'create', sd.GOOGLE_ANALYTICS_ID, googleAnalyticsParams

module.exports.getUserAgent = ->
  window?.navigator?.userAgent

module.exports.trackPageview = =>
  # Don't send pageviews for admins
  return if sd.CURRENT_USER?.type == 'Admin'

  @ga? 'send', 'pageview'

# Delta tracking pixel
module.exports.delta = (event, data, el) ->
  data.name = event
  data.method = 'import'
  data.pixel = 1
  url = 'https://' + sd.DELTA_HOST + '/?' + qs.stringify(data)
  el.append '<img src="' + url + '" style="display:none;" />'

module.exports.registerCurrentUser = ->
  # Don't track admins
  return if sd.CURRENT_USER?.type == 'Admin'

  userType = if sd.CURRENT_USER then "Logged In" else "Logged Out"

  ga?('set', 'dimension1', userType)
  mixpanel?.register "User Type": userType

# This basically just sets some defaults loosely based on the
# Analytics wrapper class from Gravity
categories =
  impression: 'Impressions'
  hover:      'UI Interactions'
  click:      'UI Interactions'
  funnel:     'Funnel Progressions'
  segment:    'UI A/B Test Segments'
  error:      'UI Errors'
  multi:      'Multi-object Events'
  other:      'Other Events'

module.exports.track =
  _.reduce(Object.keys(categories), (memo, kind) ->
    memo[kind] = (description, options={}) ->

      # Don't track admins
      return if sd.CURRENT_USER?.type == 'Admin'

      # Format and Send mixpanel event
      unless typeof mixpanel is 'undefined'
        options.category  = categories[kind] || categories.other

        _.defaults options,
          queryString: window?.location.search
          page: window?.location.pathname
          referrer: document?.referrer
          collector_level: sd.CURRENT_USER?.collector_level
          user_id: sd.CURRENT_USER?.id

        mixpanel.track? description, options

      # Send google analytics event
      ga? 'send', {
        hitType: 'event'
        eventCategory: options.category
        eventAction: description
        eventLabel: options.label
        nonInteraction: (if options.category in ['Funnel Progressions', 'Impressions'] then 1 else 0)
      }
    memo
  , {})

module.exports.modelNameAndIdToLabel = (modelName, id) ->
  throw new Error('Requires modelName and id') unless modelName? and id?
  "#{_.capitalize(modelName)}:#{id}"

# Special multi-event
#
# GA imposes a 500 byte limit on event labels
# For multis, each id is hashed to 8 characters + event id, leaving room for 55 ids
# Going with 50 to be conservative and account for the model name
maxTrackableMultiIds = 50

module.exports.encodeMulti = (ids) ->
  ids = _.compact(ids)
  (_.map ids, (id) -> createHash('md5').update(id).digest('hex').substr(0, 8)).join("-")

module.exports.trackMulti = (description, data) =>
  ga? 'send', 'event', categories['multi'], description, data

module.exports.multi = (description, modelName, ids) ->
  return unless ids?.length > 0

  # chunk ids by maxTrackableMultiIds
  chunkedIds = _.groupBy(ids, (a, b) => return Math.floor(b / maxTrackableMultiIds))

  for chunk, index in _.toArray(chunkedIds)
    # Fire log events at 1/2 second intervals
    ((encodedIds) =>
      _.delay( =>
        @trackMulti description, @modelNameAndIdToLabel(modelName, encodedIds)
      , (500 * index) + 1)
    )(@encodeMulti(chunk))

module.exports.getProperty = (property) =>
  mixpanel.get_property property

module.exports.setProperty = (hash) =>
  mixpanel.register_once hash

# Conduct an A/B test by using this helper to determine what path to take.
# Returns true if the user is in the new feature, returns false if the user
# is testing the old feature.
#
# @param {String} key Mixpanel key
# @param {Number} percentToNew What percent of users do you want to direct to the new feature?

module.exports.abTest = (key, percentToNew = 0.5) ->
  return false unless sd.ENABLE_AB_TEST

  property = module.exports.getProperty key
  if property is 'enabled'
    true
  else if property is 'disabled'
    false
  else
    enabledDisabled = if Math.random() < percentToNew then 'enabled' else 'disabled'
    hash = {}
    hash[key] = enabledDisabled
    module.exports.setProperty hash
    enabledDisabled == 'enabled'

# Conduct an A/B/C/D/etc... test by using this helper to determine what path to take.
# `paths` is a hash of { label: percent } pairs. e.g. An A/B/C test that tests 20% of users
# going down "C" and 40% of users take "A" and "B" would be...
# ````
# splitTest 'favoriting', { a: 0.4, b: 0.4, c: 0.2 }
# # returns "a", "b", or "c"
# ````
# the keys represent  mixpanel values and can be anything, e.g.
# ````
# splitTest 'favoriting', { "hover menu": 0.4, "new modal": 0.4, "old modal": 0.2 }
# # returns "hover menu", "new modal", or "old modal"
# ````
#
# @param {String} key Mixpanel key
# @param {Object} paths Mixpanel label: percent pairs
# @return {String} The label the user is assigned for the split test

module.exports.splitTest = (key, paths) ->
  return false unless sd.ENABLE_AB_TEST

  sum = _.reduce paths, (m, percent, label) -> m + percent
  return throw new Error("Your percent values for paths must add up to 1.0") if sum isnt 1

  path = module.exports.getProperty key
  return path if path

  path = _.sample _.flatten (for label, percent of paths
    _.times(Math.round(percent * 100), -> label)
  )
  hash = {}
  hash[key] = path
  module.exports.setProperty hash
  path

# Calls back when mixpanel has loaded. Useful for pages that do testing on
# load. Such as AB testing the way a certain page looks.
module.exports.load = (callback) ->
  called = false
  cb = ->
    return if called
    called = true
    callback()
  if mixpanel.__loaded then cb() else mixpanel.set_config(loaded: cb)
  setTimeout cb, 5000 # Ensure we callback whether mixpanel is working or not
