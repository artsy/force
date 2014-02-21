_             = require 'underscore'
Backbone      = require 'backbone'
BoothsView    = require '../components/booths/view.coffee'
ArtistView    = require './artist.coffee'
qs            = require 'querystring'
FilterArtworksView = require '../../../components/filter/artworks/view.coffee'
FeedView = require '../../../components/feed/client/feed.coffee'
{ ARTSY_URL, SECTION } = require('sharify').data

class FilterHeader extends Backbone.View

  initialize: (options) ->
    _.extend @, options

  events:
    'click #fair-filter-all-artists'    : 'allArtists'

  allArtists: ->
    @router.navigate "#{@profile.get 'id'}/browse/artists", trigger: true
    @$('#fair-filter-all-artists').addClass("is-active")

module.exports = class BrowseRouter extends Backbone.Router

  routes:
    ':id/browse/artists'                   : 'artists'
    ':id/browse/artist/:artist_id'         : 'artist'
    ':id/browse/booths'                    : 'booths'
    ':id/browse/booths/region/:region'     : 'boothsRegion'
    ':id/browse/booths/section/:section'   : 'boothsSection'
    ':id/browse/exhibitors'                : 'exhibitors'
    ':id/browse'                           : 'browse'

  initialize: (options) ->
    _.extend @, options
    $('.garamond-tab:eq(1)').removeClass('is-inactive').addClass('is-active') if SECTION is 'browse'
    @filterArtworks = new FilterArtworksView
      el: $ '.fair-page-content'
      artworksUrl : "#{ARTSY_URL}/api/v1/search/filtered/fair/#{@fair.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/fair/#{@fair.get 'id'}/suggest"
      urlRoot: "#{@profile.id}/browse"
    @filterArtworks.params.on 'change', @artworks
    @filterBooths = new BoothsView
      el: $ '.fair-page-content'
      fair: @fair
      profile: @profile
      router: @
    @filterBooths.params.on 'change', =>
      $('.browse-section').hide()
      $('.browse-section.booths').show()
    @filterHeader = new FilterHeader
      el: '#fair-filter'
      fair: @fair
      profile: @profile
      router: @
    @booths()
    Backbone.history.start pushState: true

  route: (route, name, callback) =>
    Backbone.Router::route.call @, route, name, =>
      $('.browse-section').hide()
      (callback or @[name])? arguments...

  artist: (id, artistId)=>
    @artistView ?= new ArtistView
      el: $('.browse-section.artist')
      fair: @fair
      artistId: artistId
    @artistView.$el.show()

  booths: =>
    @filterBooths.params.trigger('change')

  boothsSection: (id, section) =>
    @filterBooths.params.set section: section

  boothsRegion: (id, region) =>
    @filterBooths.params.set section: region

  exhibitors: =>
    $('.browse-section').hide()
    $('.exhibitors-a-to-z').show()

  artists: =>
    $('.browse-section').hide()
    $('.artists-a-to-z').show()

  browse: (id) =>
    @navigate "#{id}/browse/booths", trigger: true
