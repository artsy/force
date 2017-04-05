sd = require('sharify').data
Backbone = require 'backbone'
Flickity = require 'flickity'
bootstrap = require '../../../components/layout/bootstrap'
ArtworkColumns = require '../../../components/artwork_columns/view'
ShareView = require '../../../components/share/view'
{ seeMoreArtworks } = require '../../../components/show_more_works/index'
RelatedArticlesView = require '../components/related_articles/view'
attachFollowArtists = require '../components/follow_artists/index'
Show = require '../../../models/show'

module.exports.ShowView = class ShowView extends Backbone.View

  events:
    'click .show-more-works__artworks-slider' : seeMoreArtworks

  initialize: (options) ->
    @artworkColumns = new ArtworkColumns el: @$('#show-page-artworks .artwork-columns')
    @renderArtworks()

    @model.related().installShots.reset sd.INSTALL_SHOTS
    if @model.related().installShots.length
      @slideshow = new Flickity '#carousel-track',
        cellAlign: 'left'
        prevNextButtons: false
        imagesLoaded: true

    relatedArticlesView = new RelatedArticlesView
      collection: @model.related().articles
      el: $ '#show-page-related-articles-container'
    @model.related().articles.fetch()

    new ShareView
      el: @$('.show-page-modal-button')
      imageUrl: @model.posterImage()
      description: "See \"#{@model.get('name')}\" at #{@model.partnerName()} on @artsy"

    attachFollowArtists @model.related().artists

  renderArtworks: =>
    # First page fetched on the server
    @artworkColumns.$el.addClass 'is-loading'
    @model.fetchAllArtworks
      data:
        page: 2
        size: 10
      success: (artworks ) =>
        # Update the '# of Works' Displayed if more are fetched
        $('#show-page-artworks .show-page-artworks-title').html "#{sd.ARTWORKS.length + artworks.length} Works"
        @artworkColumns.renderArtworks( artworks.groupByColumnsInOrder() )
        @artworkColumns.$el.removeClass 'is-loading'

module.exports.init = ->
  bootstrap()
  new ShowView
    el: $ '#show-page'
    model: new Show sd.SHOW
