Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
moment = require 'moment'
PartnerShow = require '../models/partner_show.coffee'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class PartnerShows extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: PartnerShow

  #
  # Get the running partner shows collection.
  #
  # @param {Object} exclude an array of PartnerShow objects to be excluded
  #
  current: (exclude=[]) ->
    new PartnerShows _.filter(@models, (show) ->
      show.running() and show.renderable() and show not in exclude
    )
  upcoming: (exclude=[]) ->
    new PartnerShows _.filter(@models, (show) ->
      show.upcoming() and show.renderable() and show not in exclude
    )
  past: (exclude=[]) ->
    new PartnerShows _.filter(@models, (show) ->
      show.closed() and show.renderable() and show not in exclude
    )

  featured: ->
    # If there is a featured show (should only be one), this wins
    featured = @findWhere({ featured: true })
    return featured if featured?

    # Next in line is the first current show that ends closest to now
    featurables = @current().filter (show) -> show.renderable()
    featurables = _.sortBy featurables, (show) -> moment(show.get('end_at')).unix()
    return featurables[0] if featurables.length > 0

    # Then the first upcoming show by start date
    featurables = @upcoming().filter (show) -> show.renderable()
    featurables = _.sortBy featurables, (show) -> moment(show.get('start_at')).unix()
    return featurables[0] if featurables.length > 0

    # Finally, we'll take a past show ordered by the default
    featurables = @past().filter (show) -> show.renderable()
    return featurables[0] if featurables.length > 0
