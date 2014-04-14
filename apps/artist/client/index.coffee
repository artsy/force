_                             = require 'underscore'
Backbone                      = require 'backbone'
Artworks                      = require '../../../collections/artworks.coffee'
Artist                        = require '../../../models/artist.coffee'
sd                            = require('sharify').data
FillwidthView                 = require '../../../components/fillwidth_row/view.coffee'
ArtistFillwidthList           = require '../../../components/artist_fillwidth_list/view.coffee'
BlurbView                     = require '../../../components/blurb/view.coffee'
RelatedPostsView              = require '../../../components/related_posts/view.coffee'
RelatedGenesView              = require '../../../components/related_genes/view.coffee'
CurrentUser                   = require '../../../models/current_user.coffee'
ShareView                     = require '../../../components/share/view.coffee'
BorderedPulldown              = require '../../../components/bordered_pulldown/view.coffee'
RelatedAuctionResultsView     = require '../../../components/related_auction_results/view.coffee'
{ Following, FollowButton }   = require '../../../components/follow_button/index.coffee'

artistSort = -> require('../templates/sort.jade') arguments...

module.exports.ArtistView = class ArtistView extends Backbone.View
  events:
    'click .artist-related-see-more' : 'nextRelatedPage'
    'click .artist-works-sort a'     : 'onSortChange'

  initialize: (options) ->
    { @sortBy } = options

    @setupCurrentUser()
    @setupFollowButton()
    @setupArtworks()
    @setupRelatedArtists()
    @setupRelatedPosts()
    @setupShareButtons()
    @setupAuctionResults()
    @setupHeader()

  setupHeader: ->
    @setupBlurb()
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

  setupBlurb: ->
    if ($blurb = @$('.blurb')).length
      new BlurbView
        updateOnResize : true
        lineCount      : 5
        el             : $blurb
      $blurb.css maxHeight: 'none'

  setupRelatedGenes: ->
    new RelatedGenesView
      modelName : 'artist'
      model     : @model
      el        : @$('.artist-related-genes')

  pendRemovalOfEmptyNotice: (collection) ->
    @listenTo collection, 'sync', (collection) =>
      @$('.artist-header-empty').remove() if collection.length

  setupArtworks: ->
    new BorderedPulldown el: $('.bordered-pulldown')

    # Available Works
    $availableWorks = @$('#artist-available-works')
    @availableArtworks = new Artworks
    @availableArtworks.url = @model.url() + '/artworks'
    @pendRemovalOfEmptyNotice @availableArtworks
    new FillwidthView(
      artworkCollection: @artworkCollection
      fetchOptions: { 'filter[]': 'for_sale', 'sort': @sortBy or undefined }
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
      fetchOptions: { 'filter[]': 'not_for_sale', 'sort': @sortBy or undefined }
      collection: @institutionArtworks
      seeMore: true
      empty: (-> @$el.parent().remove() )
      el: $institutionalWorks
    ).nextPage(false, 10)

  setupRelatedPosts: ->
    new RelatedPostsView
      el         : @$('.artist-related-posts')
      numToShow  : 5
      model      : @model
      modelName  : 'artist'
      mode       : 'grid'
      canBeEmpty : false

  setupAuctionResults: ->
    new RelatedAuctionResultsView
      el       : @$('.artist-auction-results')
      amount   : 4
      artistId : @model.id

  setupRelatedArtists: ->
    @relatedArtistsPage = 1
    @relatedContemporaryPage = 1
    @model.relatedArtists.on 'sync', => @renderRelatedArtists 'Artists'
    @model.relatedContemporary.on 'sync', => @renderRelatedArtists 'Contemporary'
    @nextRelatedArtistsPage 'Artists'
    @nextRelatedArtistsPage 'Contemporary'

  renderRelatedArtists: (type) =>
    $artistContainer = @$("#artist-related-#{type.toLowerCase()}")
    if @model["related#{type}"]?.models.length > 0
      new ArtistFillwidthList(
        el: @$("#artist-related-#{type.toLowerCase()}")
        collection: @model["related#{type}"]
        user: @currentUser
      ).fetchAndRender()
    else
      $artistContainer.parent().remove()

  onSortChange: (e) ->
    @sortBy = $(e.currentTarget).data('sort')
    @setupArtworks()

  nextRelatedArtistsPage: (e) ->
    type = if _.isString(e) then e else $(e).data 'type'
    @model.fetchRelatedArtists type, data: { page: @["related#{type}Page"]++ }

module.exports.init = ->
  new ArtistView
    model  : new Artist sd.ARTIST
    el     : $('body')
    sortBy : sd.sortBy
