_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Show = require '../models/show'
moment = require 'moment'

module.exports = class PartnerShows extends Backbone.Collection

  model: Show

  url: ->
    if @partnerId
      "#{sd.API_URL}/api/v1/partner/#{@partnerId}/shows?sort=-featured,-end_at"
    else
      "#{sd.API_URL}/api/v1/shows"

  initialize: (models, options = {}) ->
    { @partnerId } = options

  current: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.running() and show.renderable() and show not in exclude

  upcoming: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.upcoming() and show.renderable() and show not in exclude

  past: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.closed() and show.renderable() and show not in exclude

  featuredShow: ->
    # If there is a featured show (should only be one), this wins
    featured = @findWhere({ featured: true })
    return featured if featured?

    # Next in line is the first current show that ends closest to now
    featurables = _.filter(@where(status: 'running'), (show) -> show.featurable())
    featurables = _.sortBy featurables, (show) -> moment(show.get('end_at')).unix()
    return featurables[0] if featurables.length > 0

    # Then the first upcoming show by start date
    featurables = _.filter(@where(status: 'upcoming'), (show) -> show.featurable())
    featurables = _.sortBy featurables, (show) -> moment(show.get('start_at')).unix()
    return featurables[0] if featurables.length > 0

    # Finally, we'll take a past show ordered by the default
    featurables = _.filter(@where(status: 'closed'), (show) -> show.featurable())
    return featurables[0] if featurables.length > 0
