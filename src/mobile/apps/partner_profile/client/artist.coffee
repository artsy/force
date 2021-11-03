_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
{ Artist } = require '../../../models/artist'
{ Partner } = require '../../../models/partner'
{ PartnerArtistArtworks } = require '../../../collections/partner_artist_artworks'
{ FollowArtists } = require '../../../collections/follow_artists'
{ FollowButtonView } = require '../../../components/follow_button/view'
bootstrap = require '../../../components/layout/bootstrap'
{ ShareView } = require '../../../components/share/view'

artworksTemplate = -> require('../../../components/artwork_columns/template.jade') arguments...

module.exports.PartnerArtistView = class PartnerArtistView extends Backbone.View

  events:
    'click .artist-page-artwork-see-more': 'seeMoreArtworks'
    'click .artist-share-toggle': 'toggleShare'

  el: 'body'

  artworkParams:
    page: 1
    size: 6

  artworkColumnsCount: 2

  initialize: (options) ->
    { @user, @artist, @partner } = options
    @artworks = new PartnerArtistArtworks
    @artworks.on 'reset add', @renderArtworks
    @resetArtworks()
    @followArtists = new FollowArtists []
    @setupFollowButton()
    @followArtists.syncFollows [ @artist.get 'id' ]
    new ShareView
      el:  @$('.partner-artist-share'),
      imageUrl: @artist.imageUrl('large'),
      description: if @artist.get('name') then '' + @artist.get('name')

  setupFollowButton: ->
    @followButtonView = new FollowButtonView
      collection: @followArtists
      el: @$ '.artist-actions-container .artist-follow'
      followId: @artist.get 'id'
      type: 'Partner'
      isLoggedIn: not _.isNull CurrentUser.orNull()
      _id: @artist.get '_id'
      context_module: 'Artist page in partner profile'

  fetchArtworks: (reset = false) ->
    url = "#{sd.API_URL}/api/v1/partner/#{@partner.get 'id'}/artist/#{@artist.get 'id'}/partner_artist_artworks"
    new PartnerArtistArtworks().fetch
      url: url
      data: @artworkParams
      success: (artworks) =>
        # We have to manually check this since we don't have this artist's
        # accurate published_artworks_count *with this partner*.
        if artworks.length is 0
          @$('.artist-page-artwork-see-more-container').hide()
        if reset then @artworks.reset artworks.models
        else @artworks.add artworks.models

  renderArtworks: =>
    @$('#artist-page-artworks-list').html artworksTemplate artworkColumns: @artworks.groupByColumnsInOrder @artworkColumnsCount
    @$('.artist-page-artwork-see-more').removeClass 'loading-spinner'

    # TODO: This is not accurate. We should use the artist's
    # published_artworks_count *with this partner*. However,
    # the API doesn't support retrieving a single partner artist
    # without an authorized user.
    if @artworks.length >= @artist.get('published_artworks_count')
      @$('.artist-page-artwork-see-more-container').hide()
    else
      @$('.artist-page-artwork-see-more-container').show()
    if @artworks.length is 0
      @$('#artist-page-artworks-list').html '<div class="artist-page-artworks-default-text">No available artworks</div>'

  resetArtworks: ->
    @$('#artist-page-artworks-list').html "<div class='loading-spinner'></div>"
    @fetchArtworks(true)

  seeMoreArtworks: ->
    @artworkParams.page++
    @$('.artist-page-artwork-see-more').addClass 'loading-spinner'
    @fetchArtworks()

  toggleShare: (e) ->
    e.preventDefault()
    $menu = @$('.artist-share-menu')
    if $menu.hasClass 'is-visible'
      $menu.toggleClass 'is-visible'
      _.delay (-> $menu.toggle()), 250
    else
      $menu.toggle()
      _.defer -> $menu.toggleClass('is-visible')

module.exports.init = ->
  bootstrap()
  new PartnerArtistView
    artist: new Artist sd.ARTIST
    partner: new Partner sd.PARTNER
    user: CurrentUser.orNull()
