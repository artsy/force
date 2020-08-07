_ = require 'underscore'
sd = require('sharify').data
moment = require 'moment'
PartnerShow = require '../models/partner_show.coffee'

Backbone = require 'backbone'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class PartnerShows extends Backbone.Collection
  _.extend @prototype, Fetch(API_URL)

  model: PartnerShow

  url: "#{sd.API_URL}/api/v1/shows"

  # Get the running partner shows collection.
  #
  # @param {Object} exclude an array of PartnerShow objects to be excluded
  current: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.running() and show.get('displayable') and show not in exclude

  upcoming: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.upcoming() and show.get('displayable') and show not in exclude

  past: (exclude = []) ->
    new PartnerShows _.filter @models, (show) ->
      show.closed() and show.get('displayable') and show not in exclude

  featured: ->
    # If there is a featured show (should only be one), this wins
    featured = @findWhere featured: true
    return featured if featured?

    # Next in line is the first current show that ends closest to now
    featurables = @current().filter (show) -> show.get('displayable')
    featurables = _.sortBy featurables, (show) -> moment(show.get('end_at')).unix()
    return featurables[0] if featurables.length

    # Then the first upcoming show by start date
    featurables = @upcoming().filter (show) -> show.get('displayable')
    featurables = _.sortBy featurables, (show) -> moment(show.get('start_at')).unix()
    return featurables[0] if featurables.length

    # Finally, we'll take a past show ordered by the default
    featurables = @past().filter (show) -> show.get('displayable')
    return featurables[0] if featurables.length

  getShowsRelatedImages: ->
    Promise.allSettled(
      @map (show) ->
        show.related().installShots.fetch data: size: 1, default: false
        show.related().artworks.fetch data: size: 5
    ).then =>
      @trigger 'shows:fetchedRelatedImages'
