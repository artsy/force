_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
Partner       = require '../../../models/partner.coffee'
PartnerShows  = require '../../../collections/partner_shows.coffee'
template      = -> require('../templates/overview.jade') arguments...
showsTemplate = -> require('../templates/_shows.jade') arguments...

module.exports = class PartnerOverviewView extends Backbone.View

  defaults:
    numberOfFeatured  : 1 # number of featured shows needed
    numberOfShows     : 6 # number of other shows needed

  initialize: (options={}) ->
    { @profile, @partner, @numberOfShows, @numberOfFeatured } = _.defaults options, @defaults
    @initializeShows()
    @initializeArtists()
    @initializePosts()
    @render()

  render: ->
    @$el.html template()

  initializeShows: ->
    @isRenderFull = @partner.get 'has_full_profile'
    @fetchAndOrganizeShows()

  #
  # Recursively fetch 1 featured show (if needed) and enough shows to display.
  #
  fetchAndOrganizeShows: (featured=[], shows=[], page=1, size=30) ->
    partnerShows = new PartnerShows()
    partnerShows.url = "#{@partner.url()}/shows"
    partnerShows.fetch
      data: { sort: "-featured,-end_at", page: page, size: size }
      success: =>
        if (need = @numberOfFeatured - featured.length) > 0
          f = partnerShows.featured()
          featured = featured.concat [f].slice(0, need)

        exclude = if @isRenderFull then [f] else []

        if (need = @numberOfShows - shows.length) > 0
          current   = partnerShows.current(exclude).models
          upcoming  = partnerShows.upcoming(exclude).models
          past      = partnerShows.past(exclude).models
          shows = shows.concat (current.concat upcoming, past).slice(0, need)

        if (shows.length >= @numberOfShows and
           featured.length >= @numberOfFeatured) or
           partnerShows.length is 0

          return @renderShows featured, shows

        return @fetchAndOrganizeShows featured, shows, ++page

  renderShows: (featured, shows) ->
    @ensurePosterImages featured.concat shows
    @$('.partner-overview-shows').html showsTemplate
      featured: featured[0]
      current: shows
      upcoming: []
      past: []

  ensurePosterImages: (shows) ->
    _.each shows, (show) =>
      @listenTo show, "fetch:posterImageUrl", (url) =>
        @renderShowPosterImage(show, url)

  renderShowPosterImage: (show, imageUrl) ->
    @$(".partner-show[data-show-id='#{show.get('id')}'] .partner-show-cover-image").css
      "background-image": "url(#{imageUrl})"

  initializeArtists: -> return

  initializePosts: -> return

  renderLoading: ->
    unless @$loadingSpinner?
      @$el.after( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()

  hideLoading: -> @$loadingSpinner.hide()
