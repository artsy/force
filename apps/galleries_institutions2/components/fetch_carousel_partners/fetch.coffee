Partners = require '../../../../collections/partners.coffee'
_ = require 'underscore'
Q = require 'bluebird-q'

desiredTotalPartners = 9
desiredPrimaryPartners = 6
desiredSecondaryPartners = 3

module.exports =

  defaults:
    cache: true
    has_full_profile: true
    sort: '-random_score'
    size: desiredTotalPartners

  galleries: (options) ->
    options = _.extend {}, @defaults, options

    Q.all([

      new Partners().fetch {
        cache: true,
        data: _.extend eligible_for_primary_bucket: true, options
      }

      new Partners().fetch {
        cache: true
        data: _.extend eligible_for_secondary_bucket: true, options
      }

    ]).spread (primary, secondary) ->

      console.log primary, secondary
      if primary.length < desiredPrimaryPartners
        secondary = secondary.slice(0, desiredTotalPartners - primary.length)

      else if secondary.length < desiredSecondaryPartners
        primary = primary.slice(0, desiredTotalPartners - secondary.length)

      else
        primary = primary.slice(0, desiredPrimaryPartners)
        secondary = secondary.slice(0, desiredSecondaryPartners)

      new Partners _.shuffle(primary).concat _.shuffle(secondary)

  institutions: (options) ->
    options = _.extend {}, @defaults, options
    new Partners().fetch(data: options).then (p) ->
      new Partners _.shuffle p