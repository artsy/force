_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
Artist = require '../../../models/artist.coffee'
sd = require('sharify').data
FillwidthView = require '../../../components/fillwidth_row/view.coffee'
ArtistFillwidthList = require '../../../components/artist_fillwidth_list/view.coffee'
RelatedPostsView = require '../../../components/related_posts/view.coffee'
RelatedGenesView = require '../../../components/related_genes/view.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ShareView = require '../../../components/share/view.coffee'
BorderedPulldown = require '../../../components/bordered_pulldown/view.coffee'
RelatedAuctionResultsView = require '../../../components/related_auction_results/view.coffee'
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
RelatedShowsView = require '../../../components/related_shows/view.coffee'
analytics = require '../../../lib/analytics.coffee'
ArtistCarouselView = require '../../../components/artist_carousel/view.coffee'
ArtworkFilter = require '../../../components/artwork_filter/index.coffee'
splitTestInterface = require './split_test.coffee'

module.exports.ArtistView = class ArtistView extends Backbone.View
  events:
    'click .artist-related-see-more': 'nextRelatedPage'
    'click .artist-works-sort a': 'onSortChange'

  initialize: (options) ->
    { @sortBy } = options

    @setupCurrentUser()

    # Header
    @setupHeader()
    @setupFollowButton()
    @setupShareButtons()

    # Main section
    @setupSplitTest()

    # Bottom sections
    @setupRelatedArtists()
    @setupRelatedShows()
    @setupRelatedPosts()

    # Track pageview
    analytics.track.impression 'Artist page', { id: @model.id }

  setupHeader: ->
    @setupRelatedGenes()

  setupShareButtons: ->
    new ShareView el: @$('.artist-share')

  setupFollowButton: ->
    if @currentUser
      @following = new Following null, kind: 'artist'
    new FollowButton
      analyticsFollowMessage: 'Followed artist, via artist header'
      analyticsUnfollowMessage: 'Unfollowed artist, via artist header'
      el: @$('#artist-follow-button')
      following: @following
      modelName: 'artist'
      model: @model
    @following?.syncFollows [@model.id]

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  setupSplitTest: ->
    switch splitTestInterface()
      when 'fillwidth'
        @setupArtworksFillwidth()
      when 'filter'
        @setupArtworkFilter()
      when 'filter_carousel'
        @setupCarousel()
        @setupArtworkFilter()

  setupCarousel: ->
    new ArtistCarouselView el: @$('#artist-carousel'), model: @model

  setupArtworkFilter: ->
    ArtworkFilter.init el: @$('#artwork-section'), model: @model

  setupArtworksFillwidth: ->
    @fadeInSection @$('#artist-fillwidth-section')

    new BorderedPulldown el: @$('.bordered-pulldown')

    # Available Works
    $availableWorks = @$('#artist-available-works')
    @availableArtworks = new Artworks
    @availableArtworks.url = @model.url() + '/artworks'
    @pendRemovalOfEmptyNotice @availableArtworks
    new FillwidthView(
      artworkCollection: @artworkCollection
      fetchOptions: { 'filter[]': 'for_sale', sort: @sortBy or undefined, published: true }
      collection: @availableArtworks
      seeMore: true
      empty: (-> @$el.parent().remove() )
      el: $availableWorks
    ).nextPage(false, 10)

    # Works at Museums/Institutions
    $institutionalWorks = @$('#artist-institution-works')
    @institutionArtworks = new Artworks
    @institutionArtworks.url = @model.url() + '/artworks'
    @pendRemovalOfEmptyNotice @institutionArtworks
    new FillwidthView(
      artworkCollection: @artworkCollection
      fetchOptions: { 'filter[]': 'not_for_sale', sort: @sortBy or undefined, published: true }
      collection: @institutionArtworks
      seeMore: true
      empty: (-> @$el.parent().remove() )
      el: $institutionalWorks
    ).nextPage(false, 10)

  onSortChange: (e) ->
    @sortBy = $(e.currentTarget).data('sort')
    @setupArtworksFillwidth()

  setupRelatedShows: ->
    new RelatedShowsView
      collection: @model.relatedShows
      model: @model
      el: @$('#artist-related-shows')

  setupRelatedGenes: ->
    new RelatedGenesView
      modelName: 'artist'
      model: @model
      el: @$('.artist-related-genes')

  pendRemovalOfEmptyNotice: (collection) ->
    @listenTo collection, 'sync', (collection) =>
      @$('.artist-header-empty').remove() if collection.length

  setupRelatedPosts: ->
    new RelatedPostsView
      el: @$('#artist-related-posts-section')
      numToShow: 4
      model: @model
      modelName: 'artist'
      mode: 'extended'
      canBeEmpty: false

  fadeInSection: ($el) ->
    $el.show()
    _.defer => $el.addClass 'is-fade-in'
    $el

  setupRelatedArtists: ->
    @relatedArtistsPage = 1
    @relatedContemporaryPage = 1
    @model.relatedArtists.on 'sync', => @renderRelatedArtists 'Artists'
    @model.relatedContemporary.on 'sync', => @renderRelatedArtists 'Contemporary'
    @nextRelatedArtistsPage 'Artists'
    @nextRelatedArtistsPage 'Contemporary'

  renderRelatedArtists: (type) =>
    $section = @$("#artist-related-#{type.toLowerCase()}-section")
    if @model["related#{type}"]?.models.length
      @fadeInSection $section
      new ArtistFillwidthList(
        el: @$("#artist-related-#{type.toLowerCase()}")
        collection: @model["related#{type}"]
        user: @currentUser
      ).fetchAndRender()
    else
      $section.remove()

  nextRelatedArtistsPage: (e) ->
    type = if _.isString(e) then e else $(e).data 'type'
    @model.fetchRelatedArtists type, data: page: @["related#{type}Page"]++

module.exports.init = ->
  new ArtistView
    model: new Artist sd.ARTIST
    el: $('body')
    sortBy: sd.sortBy
