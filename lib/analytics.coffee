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
  { @mixpanel, @ga, @location } = options
  @location ?= window?.location
  if sd.GOOGLE_ANALYTICS_ID
    @ga? 'create', sd.GOOGLE_ANALYTICS_ID, 'artsy.net'
  if sd.MIXPANEL_ID
    @mixpanel?.init sd.MIXPANEL_ID

module.exports.getUserAgent = ->
  window?.navigator?.userAgent

module.exports.trackPageview = =>
  @ga? 'send', 'pageview'

# Delta tracking pixel
module.exports.delta = (event, data, el) ->
  data.name = event
  data.method = 'import'
  data.pixel = 1
  url = 'https://' + sd.DELTA_HOST + '/?' + qs.stringify(data)
  el.append '<img src="' + url + '" style="display:none;" />'

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

      # Send mixpanel event
      unless typeof mixpanel is 'undefined'
        options.category  = categories[kind] || categories.other

        _.defaults options,
          page: window?.location.pathname
          noninteraction: true

        mixpanel.track? description, options

      # Send google analytics event
      ga? 'send', 'event', options.category, description, options.label
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
  # Send google analytics event
  @ga? 'send', 'event', categories['multi'], description, data

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

module.exports.getProperty = (property) ->
  mixpanel?.get_property property

module.exports.setProperty = (hash) ->
  mixpanel.register_once hash

module.exports.abTest = (key) ->
  property = module.exports.getProperty key
  if property is 'enabled'
    true
  else if property is 'disabled'
    false
  else
    enabledDisabled = if Math.floor(2 * Math.random()) > 0 then 'enabled' else 'disabled'
    hash = {}
    hash[key] = enabledDisabled
    module.exports.setProperty hash
    enabledDisabled == 'enabled'
