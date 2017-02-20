_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap.coffee'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
sd = require('sharify').data
Fair = require '../../../models/fair.coffee'
Artist = require '../../../models/artist.coffee'
Artwork = require '../../../models/artwork.coffee'
Profile = require '../../../models/profile.coffee'
Profiles = require '../../../collections/profiles.coffee'
Artists = require '../../../collections/artists.coffee'
ShowsFeed = require '../../../collections/shows_feed.coffee'
imageNavItemTemplate = -> require('../templates/image_nav_item.jade') arguments...

module.exports.ForYouView = class ForYouView extends Backbone.View

  sortOrder: "-featured"

  initialize: (options) ->
    { @fair, @profile } = options
    @currentUser = CurrentUser.orNull()
    window.user = @currentUser
    @$forYouPersonalized = @$('.fair-for-you-personalized')
    @$forYouExhibitors = @$('.fair-for-you-exhibitors')
    if @currentUser
      @fetchFollowingExhibitors()
      @fetchFollowingArtists()

    @fetchRecommendedExhibitors()
    @updateAndShowTitle()

  fetchRecommendedExhibitors: ->
    new ShowsFeed().fetch
      url: "#{@fair.url()}/shows"
      data:
        size: 6
        artworks: true
        sort: '-featured'
      success: (shows) =>
        html = ''
        for show in shows.models
          html += imageNavItemTemplate(
            href: "/show/#{show.get('id')}"
            imgSrc: show.imageUrl()
            labelTitle: show.get('partner').name
            labelInfo: show.formattedLocation()
          )
        @$forYouExhibitors.html html

  updateAndShowTitle: ->
    if @currentUser
      @$('#fair-page-title').text "#{@currentUser.get('name')}'s Guide"
    @$el.removeClass 'fair-for-you-loading'

  fetchFollowingExhibitors: ->
    followingExhibitors = new Profiles()
    followingExhibitors.fetchUntilEnd
      url: "#{sd.API_URL}/api/v1/me/follow/profiles"
      data:
        fair_id: @fair.get('id')
      success: =>
        for followProfile in followingExhibitors.models
          @fetchExhibitorBooth followProfile.get('profile')

  fetchExhibitorBooth: (profile) ->
    return unless profile.owner?.id
    shows = new ShowsFeed
    shows.fetch
      url: "#{@fair.url()}/shows"
      data:
        artworks: true
        partner: profile.owner.id
        private_partner: false
        size: 3
        sortOrder: @sortOrder
      success: (resposne) =>
        html = ''
        for show in shows.models
          html += imageNavItemTemplate(
            href: "/show/#{show.get('id')}"
            imgSrc: show.imageUrl()
            labelTitle: show.get('partner').name
            labelInfo: show.formattedLocation()
          )
        @$forYouPersonalized.append html

  fetchFollowingArtists: ->
    followingArtists = new Artists()
    followingArtists.fetchUntilEnd
      url: "#{sd.API_URL}/api/v1/me/follow/artists"
      data:
        fair_id: @fair.get('id')
      success: =>
        for artist in followingArtists.pluck('artist')
          @fetchArtistShows new Artist artist

  fetchArtistShows: (artist) ->
    shows = new ShowsFeed
    shows.fetch
      url: "#{@fair.url()}/shows"
      data:
        artist: artist.get 'id'
        artworks: true
        size: 3
        private_partner: false
      success: (res) =>
        artworksCount = 0
        for show in shows.models
          unless imgSrc
            artwork = new Artwork show.get('artworks')[0]
            imgSrc = artwork.defaultImageUrl 'small'
          artworksCount = artworksCount + show.get('artworks').length
        html = imageNavItemTemplate(
          href: "#{@fair.href()}/browse/artist/#{artist.get('id')}"
          imgSrc: imgSrc
          labelTitle: artist.get 'name'
          labelInfo: "#{artworksCount} Works Exhibited"
        )
        # TODO: store these and add to DOM in one callback
        @$forYouPersonalized.append html


module.exports.init = ->
  bootstrap()
  new ForYouView
    fair: new Fair sd.FAIR
    profile: new Profile sd.PROFILE
    el: $('#fair-for-you')
