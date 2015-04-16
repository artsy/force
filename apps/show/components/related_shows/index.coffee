_ = require 'underscore'
Backbone = require 'backbone'
PartnerShows = require '../../../../collections/partner_shows.coffee'
template = -> require('./template.jade') arguments...
{ Cities, FeaturedCities } = require 'places'

module.exports = class RelatedShowsView extends Backbone.View

  # options
  # maybe have a default number of shows that it will add to each section

  initialize: (show) ->
    # determine what city the show is in
    city = _.findWhere(Cities, slug: 'new-york')
    # make sure that we're getting a collection of shows, otherwise throw an error
    @relatedShows = new PartnerShows
    @relatedShows.fetch 
      data:
        near: city.coords.toString()
        sort: '-start_at'
        displayable: true
        limit: 3
      success: (relatedShows) =>
        @render()
  render: -> 
    @$el.html template
      shows: @relatedShows
    this
