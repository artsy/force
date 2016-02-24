_ = require 'underscore'

desiredTotalPartners = 9
desiredPrimaryPartners = 6
desiredSecondaryPartners = 3

module.exports = (primary, secondary) ->
  if primary.length < desiredPrimaryPartners
    secondary = secondary.slice(0, desiredTotalPartners - primary.length)

  else if secondary.length < desiredSecondaryPartners
    primary = primary.slice(0, desiredTotalPartners - secondary.length)

  else
    primary = primary.slice(0, desiredPrimaryPartners)
    secondary = secondary.slice(0, desiredSecondaryPartners)

  _.shuffle(primary).concat _.shuffle(secondary)
