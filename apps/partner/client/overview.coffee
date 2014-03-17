_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
Partner       = require '../../../models/partner.coffee'
PartnerShows  = require '../../../collections/partner_shows.coffee'
PartnerArtists = require '../../../collections/partner_artists.coffee'
PartnerShowsGrid = require './shows_grid.coffee'
template      = -> require('../templates/overview.jade') arguments...
artistsGridTemplate = -> require('../templates/_artists_grid.jade') arguments...

module.exports = class PartnerOverviewView extends Backbone.View

  defaults:
    numberOfFeatured  : 1 # number of featured shows needed
    numberOfShows     : 6 # number of other shows needed

  initialize: (options={}) ->
    { @profile, @partner, @numberOfShows, @numberOfFeatured } = _.defaults options, @defaults
    @$el.html template()
    @initializeShows()
    @initializeArtists()

  initializeShows: ->
    new PartnerShowsGrid
      el: @$('.partner-overview-shows')
      partner: @partner
      numberOfFeatured: @numberOfFeatured
      isCombined: true
      numberOfShows: @numberOfShows

  #
  # Fetch all partner artists at once and group them.
  #
  initializeArtists: ->
    partnerArtists = new PartnerArtists()
    partnerArtists.url = "#{@partner.url()}/partner_artists"
    partnerArtists.fetchUntilEnd
      cache: true
      success: =>
        # Display represented artists or non- ones who have published artworks
        displayables = partnerArtists.filter (pa) ->
          pa.get('represented_by') or
          pa.get('published_artworks_count') > 0

        groups = _.groupBy displayables, (pa) -> pa.get 'represented_by'
        represented = label: "represented artists", list: groups.true or []
        nonrepresented = label: "works available by", list: groups.false or []

        groups = _.filter [represented, nonrepresented], (g) -> g.list.length > 0
        groups[0].label = "artists" if groups.length is 1

        @renderArtists groups

  renderArtists: (groups) ->
    @$('.partner-overview-artists').html artistsGridTemplate
      partner: @partner
      groups: groups
