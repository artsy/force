{ compact } = require 'underscore'

pluralize = (word, count, irregular = null) ->
  if count is 1
    "#{count} #{word}"
  else
    "#{count} #{irregular or word + 's'}"

module.exports =
  count: ({ counts, reserve_message }) ->
    compact [
      pluralize 'bid', counts.bidder_positions if counts.bidder_positions
      reserve_message
    ]
      .join ', '
