_ = require 'underscore'

module.exports =

  # Are there comparable artworks;
  # such that we can display a link to auction results
  #
  # return {Boolean}
  isComparable: ->
    (@get('comparables_count') > 0) and (@get('category') isnt 'Architecture')

  # Can we display a price?
  #
  # return {Boolean}
  isPriceDisplayable: ->
    (@has('price')) and
    not @isMultipleEditions() and
    (@get('inquireable') or @get('sold')) and
    not @isUnavailableButInquireable() and
    @get('sale_message') isnt 'Contact For Price'

  # Should we include a button to contact the partner?
  #
  # return {Boolean}
  isContactable: ->
    @get('forsale') and @has('partner') and not @get('acquireable')

  # Should we render a full set of editions,
  # as opposed to a single string? (See: #editionStatus)
  #
  # return {Boolean}
  isMultipleEditions: ->
    @get('edition_sets')?.length > 1

  # The work is not for sale but a buyer may be interested
  # in related works
  #
  # return {Boolean}
  isUnavailableButInquireable: ->
    not @get('forsale') and @get('inquireable') and not @get('sold')