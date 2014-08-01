_ = require 'underscore'
Backbone = require 'backbone'
Gene = require '../../models/gene.coffee'
CurrentUser = require '../../models/current_user.coffee'
ArtistFillwidthList = require '../../components/artist_fillwidth_list/view.coffee'
{ Following, FollowButton } = require '../../components/follow_button/index.coffee'
ShareView = require '../../components/share/view.coffee'
RelatedGenesView = require '../../components/related_genes/view.coffee'
FilterArtworksView = require '../../components/filter/artworks/view.coffee'
{ GENE, CURRENT_USER, API_URL } = require('sharify').data
scrollFrame = require 'scroll-frame'
BlurbView = require '../../components/blurb/view.coffee'
RelatedArtistsTemplate = -> require('./templates/related_artists.jade') arguments...

module.exports.GeneView = class GeneView extends Backbone.View

  initialize: (options) ->
    { @user } = options
    @$window = $ window
    @document = document.documentElement
    @mainHeaderHeight = $('#main-layout-header').height()
    following = if @user then new Following(null, kind: 'gene') else null
    new FollowButton
      el: $('.follow-button')
      following: following
      modelName: 'categorie' # followButton pluralizes by adding 's'
      model: @model
    following?.syncFollows [@model.get('id')]
    new ShareView
      el: @$('#gene-share-buttons')
    new RelatedGenesView
      el: @$('.main-layout-container .related-genes')
      model: @model
      modelName: 'gene'
    { @router, @params } = new FilterArtworksView
      el: $ '#gene-filter'
      artworksUrl: "#{API_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
      countsUrl: "#{API_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}/suggest"
      urlRoot: "gene/#{@model.id}"
      title: @model.get('name')

    @setupMode()
    @onFollowRoute()
    @setupBlurb()
    @fetchRelatedArtists()

  setupBlurb: ->
    if ($blurb = @$('.blurb')).length
      new BlurbView el: $blurb, lineCount: 7, updateOnResize: true
      $blurb.css maxHeight: 'none'
    @on 'relatedArtistsFetched', =>
      @$('.related-artists').html(RelatedArtistsTemplate(artists: @relatedArtists.models[...10])).addClass 'is-fade-in'

  setupMode: ->
    if @model.isSubjectMatter() or location.pathname.match('/artworks')
      @params.trigger('reset') if @model.isSubjectMatter()
      @artworksMode()
    else
      @artistMode()

  onFollowRoute: ->
    @$('.follow-button').click() if location.pathname.match('/follow')

  setupArtistFillwidth: _.once ->
    @on 'relatedArtistsFetched', =>
      if @user and not @model.isSubjectMatter()
        @user.initializeDefaultArtworkCollection().always @renderArtistFillwidth
      else if not @model.isSubjectMatter()
        @renderArtistFillwidth()

  fetchRelatedArtists: ->
    data = { exclude_artists_without_artworks: true }
    @model.fetchArtists 'related', data: data, success: (artists) =>
      @relatedArtists = artists
      @trigger 'relatedArtistsFetched'

  renderArtistFillwidth: =>
    new ArtistFillwidthList(
      collection: @relatedArtists
      el: $('#gene-artists')
      user: @user
    ).fetchAndRender()

  events:
    'click #gene-filter-all-artists': 'artistMode'
    'click #gene-filter-artworks-nav': 'artworksMode'

  artistMode: ->
    @$el.removeClass 'body-infinite-scroll'
    @$('#gene-filter').attr 'data-state', 'artists'
    @router.navigate "/gene/#{@model.get 'id'}"
    @setupArtistFillwidth()
    return unless @$window.scrollTop() > @$('#gene-filter').offset().top
    _.defer => @document.scrollTop = @$('#gene-artists').offset().top - @$('#gene-filter-nav').height() - 45

  artworksMode: =>
    @$el.addClass 'body-infinite-scroll'
    @$('#gene-filter').attr 'data-state', 'artworks'
    return unless @$window.scrollTop() > @$('#gene-filter').offset().top
    _.defer => @document.scrollTop = @$('#gene-artworks').offset().top - @$('#gene-filter-nav').height() - 50

module.exports.init = ->
  gene = new Gene GENE
  new GeneView
    user: CurrentUser.orNull()
    el: $ 'body'
    model: gene
  Backbone.history.start pushState: true
  scrollFrame '#gene-filter a'
