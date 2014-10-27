_ = require 'underscore'
categoriesMap = require './categories.coffee'
{ CURRENT_USER } = require('sharify').data

debugMixpanel = false
debugGoogle = false
debugSnowplow = false

loggedInAdmin = ->
  CURRENT_USER?.type is 'Admin'

module.exports =
  # Required: action, description
  # Optional: anything else
  mixpanel: (options) ->
    return if loggedInAdmin()
    return unless options.action? and options.description?

    _send = ->
      if debugMixpanel
        console.log arguments...
      else
        mixpanel?.track? arguments...

    _send options.description, _.extend {}, _.omit(options, 'action', 'description'),
      category: categoriesMap[options.action]
      page: window?.location.pathname
      referrer: document?.referrer
      queryString: window?.location.search
      user_id: CURRENT_USER?.id
      lab_features: CURRENT_USER?.lab_features
      collector_level: CURRENT_USER?.collector_level

  # Required: category, action
  # Optional: label, property, value, contexts
  snowplow: (options) ->
    return if loggedInAdmin()
    return unless options.category? and options.action?

    _send = ->
      if debugSnowplow
        console.log arguments...
      else
        snowplow? arguments...

    _send 'trackStructEvent',
      options.category
      options.action
      options.label
      options.property
      options.value or '0.0'
      options.contexts or {}

  # Required: action, description
  # Optional: label
  google: (options) ->
    return if loggedInAdmin()
    return unless options.action? and options.description?

    _send = ->
      if debugGoogle
        console.log arguments...
      else
        ga? arguments...

    _send 'send',
      hitType: 'event'
      eventCategory: categoriesMap[options.action]
      eventAction: options.description
      eventLabel: options.label
      nonInteraction: if options.action in ['funnel', 'impression'] then 1 else 0
