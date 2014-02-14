Backbone      = require 'backbone'
BoothsView    = require './booths.coffee'
ArtistView    = require './artist.coffee'
ArtworksView  = require './artworks.coffee'

module.exports = class BrowseRouter extends Backbone.Router

  routes:
    ':id/browse/artists'                   : 'artists'
    ':id/browse/artist/:artist_id'         : 'artist'
    ':id/browse/booths'                    : 'booths'
    ':id/browse/booths/region/:region'     : 'boothsRegion'
    ':id/browse/booths/section/:section'   : 'boothsSection'
    ':id/browse/category/:category'        : 'category'
    ':id/browse/exhibitors'                : 'exhibitors'
    ':id/browse'                           : 'browse'

  initialize: (options) ->
    { @model, @fair } = options

    $('.garamond-tab:first').removeClass('is-inactive').addClass('is-active')
    Backbone.history.start pushState: true

  artist: (id, artistId)->
    $('.browse-section').hide()
    @artist = new ArtistView
      el        : $('.browse-section.artist')
      fair      : @fair
      model     : @model
      artistId  : artistId

  booths: (id, params={})->
    $('.browse-section').hide()
    @artist = new BoothsView
      el      : $('.browse-section.booths')
      fair    : @fair
      model   : @model
      filter  : params

  artworks: (id, params={})->
    $('.browse-section').hide()
    @artist = new ArtworksView
      el      : $('.browse-section.artworks')
      fair    : @fair
      model   : @model
      filter  : params

  category: (id, category)->
    @artworks id, category: category

  boothsSection: (id, section)->
    @booths id, section: section

  boothsRegion: (id, region)->
    @booths id, partner_region: region

  exhibitors: ->
    $('.browse-section').hide()
    $('.exhibitors-a-to-z').show()

  artists: ->
    $('.browse-section').hide()
    $('.artists-a-to-z').show()

  browse: (id) ->
    @navigate "#{id}/browse/booths", trigger: true
