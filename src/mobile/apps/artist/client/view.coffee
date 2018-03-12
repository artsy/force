_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Artworks = require '../../../collections/artworks.coffee'
Articles = require '../../../collections/articles.coffee'
FollowArtists = require '../../../collections/follow_artists.coffee'
FollowButtonView = require '../../../components/follow_button/view.coffee'
hideArtistsWithoutImages = require '../../../components/artist_list/hide_without_image.coffee'
ShareView = require '../../../components/share/view.coffee'
artworksTemplate = -> require('../../../components/artwork_columns/template.jade') arguments...
articlesTemplate = -> require('../../../components/featured_items/template.jade') arguments...
suggestedArtists = -> require('../../../components/artist_list/template.jade') arguments...
articleFigureTemplate = -> require('../../../components/article_figure/template.jade') arguments...

module.exports = class ArtistPageView extends Backbone.View

  el: 'body'

  artworkParams:
    page: 1
    size: 6

  artworkColumnsCount: 2

  initialize: (options) ->
    @user = options.user
    @artworks = new Artworks
    queryParams = qs.parse location.search.replace(/^\?/, '')
    @artworkParams.artist_id = @model.id
    _.extend @artworkParams, _.pick(queryParams, 'sort', 'for_sale')
    @artworks.on 'reset add', @renderArtworks
    if @artworkParams.for_sale?
      @swapArtworks target: $('.artist-page-artworks-tab').last()
    else
      @swapArtworks target: $('.artist-page-artworks-tab').first()
    @renderSuggestedArtists()
    @renderArticles()
    @followArtists = new FollowArtists []
    @setupFollowButton()
    @followArtists.syncFollows [ @model.get 'id' ]
    new ShareView
      el:  @$('.artist-share'),
      imageUrl: @model.imageUrl('large'),
      description: if @model.get('name') then '' + @model.get('name')

  setupFollowButton: ->
    @followButtonView = new FollowButtonView
      collection: @followArtists
      el: @$ '.artist-actions-container .artist-follow'
      type: 'Artist'
      followId: @model.get 'id'
      isLoggedIn: not _.isNull CurrentUser.orNull()
      _id: @model.get '_id'
      context_module: 'Artist page'

  renderArtworks: =>
    @$('#artist-page-sort').show()
    @$('#artist-page-artworks-list').html artworksTemplate
      artworkColumns: @artworks.groupByColumnsInOrder @artworkColumnsCount
    if (@artworks.length >= @model.get('forsale_artworks_count') and @artworkParams.for_sale?) or
       (@artworks.length >= @model.get('published_artworks_count'))
      @$('.artist-page-artwork-see-more-container').hide()
    else
      @$('.artist-page-artwork-see-more-container').show()

    if @artworks.length is 0
      @$('#artist-page-sort').hide()
      @$('#artist-page-artworks-list').html(
        '<div class="artist-page-artworks-default-text">No available artworks</div>'
      )

  renderArticles: ->
    (articles = new Articles).fetch
      data: artist_id: @model.get('_id'), published: true, limit: 5
      success: =>
        @$('#artist-page-featured-articles').html articles.map((article) ->
          articleFigureTemplate article: article
        ).join ''
      complete: =>
        @$('#artist-page-featured-articles-header, \
            #artist-page-featured-articles').hide() unless articles.length

  renderSuggestedArtists: ->
    @model.fetchRelatedArtists success: (artists) =>
      if artists.length > 0
        @$('#artist-page-suggested-artists').html suggestedArtists(artists: artists.models)
        hideArtistsWithoutImages()
      else
        @$('#artist-page-suggested-artists-header, #artist-page-suggested-artists').hide()

  resetArtworks: ->
    @$('#artist-page-artworks-list').html "<div class='loading-spinner'></div>"
    @model.fetchFilteredArtworks data: @artworkParams, success: (artworks) =>
      @artworks.reset artworks.models

  events:
    'click .artist-page-artworks-tab': 'swapArtworks'
    'click .artist-page-artwork-see-more': 'seeMoreArtworks'
    'change #artist-page-sort select': 'sortArtworks'

  swapArtworks: (e) ->
    @$('.artist-page-artworks-tab').removeClass('artist-page-artworks-tab-active')
    $(e.target).addClass('artist-page-artworks-tab-active')
    @artworkParams.page = 1
    if $(e.target).hasClass('artist-page-artworks-tab-for-sale')
      @artworkParams.for_sale = true
    else
      delete @artworkParams.for_sale
    @resetArtworks()

  seeMoreArtworks: ->
    @artworkParams.page++
    @$('.artist-page-artwork-see-more').addClass 'loading-spinner'
    @model.fetchFilteredArtworks data: @artworkParams, success: (artworks) =>
      @artworks.add artworks.models
      @$('.artist-page-artwork-see-more').removeClass 'loading-spinner'

  sortArtworks: ->
    val = @$('#artist-page-sort select').val()
    if val then @artworkParams.sort = val else delete @artworkParams.sort
    @resetArtworks()

