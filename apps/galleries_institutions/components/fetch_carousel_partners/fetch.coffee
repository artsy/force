FilterPartners = require '../../../../collections/filter_partners.coffee'
Partners = require '../../../../collections/partners.coffee'

_ = require 'underscore'
Q = require 'bluebird-q'

desiredTotalPartners = 9
desiredPrimaryPartners = 6
desiredSecondaryPartners = 3

module.exports = (params) ->
  Q.all([

    (new FilterPartners).fetch(
      data: _.extend eligible_for_primary_bucket: true, params
    ),

    (new FilterPartners).fetch(
      data: _.extend eligible_for_secondary_bucket: true, params
    )

  ]).spread (primary, secondary) ->
    if primary.length < desiredPrimaryPartners
      secondary = secondary.slice(0, desiredTotalPartners - primary.length)

    else if secondary.length < desiredSecondaryPartners
      primary = primary.slice(0, desiredTotalPartners - secondary.length)

    else
      primary = primary.slice(0, desiredPrimaryPartners)
      secondary = secondary.slice(0, desiredSecondaryPartners)

    new Partners _.shuffle(primary).concat _.shuffle(secondary)
