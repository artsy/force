_ = require 'underscore'
sd = require('sharify').data
moment = require 'moment'
PageableCollection = require 'backbone-pageable'
PartnerShow = require '../models/partner_show.coffee'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class PartnerShows extends PageableCollection
  _.extend @prototype, Fetch(API_URL)

  model: PartnerShow

  url: "#{sd.API_URL}/api/v1/shows"

  parseState: (response, queryParams, state, options) ->
    if options.res
      totalRecords: parseInt options.res.headers['x-total-count']

  # Get the running partner shows collection.
  #
  # @param {Object} exclude an array of PartnerShow objects to be excluded
  current: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.running() and show.renderable() and show not in exclude

  upcoming: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.upcoming() and show.renderable() and show not in exclude

  past: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.closed() and show.renderable() and show not in exclude

  featured: ->
    # If there is a featured show (should only be one), this wins
    featured = @findWhere featured: true
    return featured if featured?

    # Next in line is the first current show that ends closest to now
    featurables = @current().filter (show) -> show.renderable()
    featurables = _.sortBy featurables, (show) -> moment(show.get('end_at')).unix()
    return featurables[0] if featurables.length

    # Then the first upcoming show by start date
    featurables = @upcoming().filter (show) -> show.renderable()
    featurables = _.sortBy featurables, (show) -> moment(show.get('start_at')).unix()
    return featurables[0] if featurables.length

    # Finally, we'll take a past show ordered by the default
    featurables = @past().filter (show) -> show.renderable()
    return featurables[0] if featurables.length
