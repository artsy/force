_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
Partner       = require '../../../models/partner.coffee'
PartnerShows  = require '../../../collections/partner_shows.coffee'
PartnerArtists = require '../../../collections/partner_artists.coffee'
template      = -> require('../templates/overview.jade') arguments...
showsTemplate = -> require('../templates/_shows.jade') arguments...
artistsGridTemplate = -> require('../templates/_artists_grid.jade') arguments...

module.exports = class PartnerOverviewView extends Backbone.View

  defaults:
    numberOfFeatured  : 1 # number of featured shows needed
    numberOfShows     : 6 # number of other shows needed

  initialize: (options={}) ->
    { @profile, @partner, @numberOfShows, @numberOfFeatured } = _.defaults options, @defaults
    @initializeShows()
    @initializeArtists()
    @render()

  render: ->
    @$el.html template()

  initializeShows: ->
    @isRenderFull = @partner.get 'has_full_profile'
    @fetchAndOrganizeShows()

  #
  # Recursively fetch enough featured/other shows to display.
  #
  fetchAndOrganizeShows: (featured=[], shows=[], page=1, size=30) ->
    partnerShows = new PartnerShows()
    partnerShows.url = "#{@partner.url()}/shows"
    partnerShows.fetch
      data: { sort: "-featured,-end_at", page: page, size: size }
      success: =>
        if @numberOfFeatured - featured.length > 0
          f = partnerShows.featured()
          featured.push f

        exclude = if @isRenderFull then [f] else []

        if (need = @numberOfShows - shows.length) > 0
          current   = partnerShows.current(exclude).models
          upcoming  = partnerShows.upcoming(exclude).models
          past      = partnerShows.past(exclude).models
          # order of getting shows: current -> upcoming -> past
          shows = shows.concat (current.concat upcoming, past).slice(0, need)

        if (shows.length >= @numberOfShows and
           featured.length >= @numberOfFeatured) or
           partnerShows.length is 0

          return @renderShows featured, shows

        return @fetchAndOrganizeShows featured, shows, ++page

  renderShows: (featured, shows) ->
    @ensurePosterImages featured.concat shows
    @$('.partner-overview-shows').html showsTemplate
      partner: @partner
      featured: featured[0]
      current: shows

  ensurePosterImages: (shows) ->
    _.each shows, (show) =>
      @listenTo show, "fetch:posterImageUrl", (url) =>
        @renderShowPosterImage(show, url)

  renderShowPosterImage: (show, imageUrl) ->
    @$(".partner-show[data-show-id='#{show.get('id')}'] .partner-show-cover-image").css
      "background-image": "url(#{imageUrl})"

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
