_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
Partner = require '../../../models/partner.coffee'
{ PartnerArtistArtworks } = require '../../../collections/partner_artist_artworks'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
BlurbView = require '../../../components/blurb/view.coffee'
template = -> require('../templates/artists_artist.jade') arguments...
{ Following, FollowButton } = require '../../../components/follow_button/index'
{ ContextModule } = require "@artsy/cohesion"

module.exports = class PartnerArtistsArtistView extends Backbone.View

  defaults:
    scroll: false # scroll to the top of the view
    allArtworks: false # infinite scrolling to show all artworks
    pageSize: 10
    nextPage: 1

  initialize: (options={}) ->
    { @scroll, @noArtworks, @pageSize, @nextPage, @allArtworks } = _.defaults options, @defaults
    @partnerArtist = @model
    @artist = new Artist @model.get('artist')
    @partner = new Partner @model.get('partner')
    @initializeElement()
    @listenTo @artist, "sync", @render
    @fetchArtist()
    @fetchNextPageArtworks()
    @initializeFollowButton()

  # Self initialize the element with the template at the beginning
  # Hide it for now until we have info we need, e.g. blurb, nationality
  initializeElement: ->
    # Couldn't just .hide() it, since we need its `height` for other components.
    (@$el.html $( template artist: @artist )).css "visibility", "hidden"

  render: ->
    brief = (_.compact [@artist.get('nationality'), @artist.get('years')]).join(", ")
    @$('.partner2-artist-brief').html brief
    @$('.partner2-artist-name').html @artist.get('name')
    @initializeBio()

    @$el.css "visibility", "visible"
    @scrollToMe() if @scroll

  scrollToMe: ->
    $('html, body').animate scrollTop: @$el.offset().top - 100

  fetchArtist: -> @artist.fetch cache: true

  fetchNextPageArtworks: ->
    return if @isFetching
    @isFetching = true

    artworks = new PartnerArtistArtworks()
    artworks.url = "#{@partner.url()}/artist/#{@artist.get('id')}/partner_artist_artworks"
    artworks.fetch
      data: { page: @nextPage, size: @pageSize }
      success: =>
        @isFetching = false
        return @noArtworks?() if @nextPage is 1 and artworks.length is 0

        if @nextPage is 1 and @allArtworks
          $(window).on 'scroll.artist.partner', _.throttle(@infiniteScroll, 150)

        if artworks.length is 0
          $(window).off 'scroll.artist'
        else
          @artworkColumns.appendArtworks artworks.models if @artworkColumns?
          @artworkColumns ?= new ArtworkColumnsView
            el: @$('.partner2-artist-artworks')
            collection: artworks
            numberOfColumns: 4
            gutterWidth: 60
            allowDuplicates: true
            artworkSize: 'tall'
            context_page:'Partner profile page'
            context_module: ContextModule.artistsTab

          ++@nextPage

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.partner2-artist-artworks')
    @fetchNextPageArtworks() unless fold < $lastItem.offset()?.top + $lastItem.height()

  initializeBio: ->
    if @partnerArtist.get('use_default_biography')
      @$('.partner2-artist-blurb').html @artist.mdToHtml('blurb')
    else if not _s.isBlank(@partnerArtist.get('biography'))
      @$('.partner2-artist-blurb').html @partnerArtist.mdToHtml('biography')
        .after "<div class='partner2-artist-blurb-postfix'>&mdash; Submitted by #{@partner.get('name')}</div>"
    @initializeBlurb()

  initializeBlurb: ->
    $blurb = @$('.partner2-artist-blurb')
    if $blurb.length > 0
      new BlurbView el: $blurb, updateOnResize: true, lineCount: 4

  initializeFollowButton: ->
    $button = @$('.follow-button')
    following = new Following null, kind: 'artist' if sd.CURRENT_USER?
    new FollowButton
      context_page: "Partner profile page"
      context_module: ContextModule.artistsTab
      following: following
      model: @artist
      modelName: 'artist'
      el: $button
    following?.syncFollows [@artist.get('id')]
