_              = require 'underscore'
sd             = require('sharify').data
Backbone       = require 'backbone'
CurrentUser    = require '../../../models/current_user.coffee'
Artist         = require '../../../models/artist.coffee'
Partner        = require '../../../models/partner.coffee'
Artworks       = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
BlurbView      = require '../../artist/client/blurb.coffee'
template       = -> require('../templates/artists_artist.jade') arguments...
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports = class PartnerArtistsArtistView extends Backbone.View

  defaults:
    scroll: false # scroll to the top of the view

  initialize: (options={}) ->
    { @scroll } = _.defaults options, @defaults
    @artist = new Artist @model.get('artist')
    @partner = new Partner @model.get('partner')
    @initializeElement()
    @listenTo @artist, "sync", @render
    @fetchArtist()
    @fetchArtworks()
    @initializeFollowButton()

  # Self initialize the element with the template at the beginning
  # Hide it for now until we have info we need, e.g. blurb, nationality
  initializeElement: ->
    # Couldn't just .hide() it, since we need its `height` for other components.
    (@$el.html $( template artist: @artist )).css "visibility", "hidden"

  render: ->
    brief = (_.compact [@artist.get('nationality'), @artist.get('years')]).join(", ")
    @$('.partner-artist-brief').html brief
    @$('.partner-artist-name').html @artist.get('name')
    @$('.partner-artist-blurb').html @artist.mdToHtml('blurb')

    @initializeBlurb()

    @$el.css "visibility", "visible"
    @scrollToMe() if @scroll

  scrollToMe: ->
    $('html').animate scrollTop: @$el.offset().top - 100

  fetchArtist: -> @artist.fetch cache: true

  fetchArtworks: ->
    artworks = new Artworks()
    artworks.url = "#{@partner.url()}/artist/#{@artist.get('id')}/artworks"
    artworks.fetch
      success: =>
        new ArtworkColumnsView
          el: @$('.partner-artist-artworks')
          collection: artworks
          numberOfColumns: 4
          gutterWidth: 60
          allowDuplicates: true

  initializeBlurb: ->
    $blurb = @$('.partner-artist-blurb')
    if $blurb.length > 0
      new BlurbView el: $blurb, updateOnResize: true, lineCount: 4

  initializeFollowButton: ->
    $button = @$('.follow-button')
    following = new Following null, kind: 'artist' if sd.CURRENT_USER?
    new FollowButton
      analyticsFollowMessage   : 'Followed artist from /:id/artists'
      analyticsUnfollowMessage : 'Unfollowed artist from /:id/artists'
      following : following
      model     : @artist
      el        : $button
    following?.syncFollows [@artist.get('id')]
