_                           = require 'underscore'
Backbone                    = require 'backbone'
Gene                        = require '../../models/gene.coffee'
CurrentUser                 = require '../../models/current_user.coffee'
ArtistFillwidthList         = require '../../components/artist_fillwidth_list/view.coffee'
{ Following, FollowButton } = require '../../components/follow_button/index.coffee'
ShareView                   = require '../../components/share/view.coffee'
RelatedGenesView            = require '../../components/related_genes/view.coffee'
FilterArtworksView          = require '../../components/filter/artworks/view.coffee'
{ GENE, CURRENT_USER, ARTSY_URL } = require('sharify').data

module.exports.GeneView = class GeneView extends Backbone.View

  initialize: (options) ->
    { @user } = options
    @$window = $ window
    @document = document.documentElement
    @mainHeaderHeight = $('#main-layout-header').height()
    new FollowButton
      el: $('.follow-button')
      following: if @user then new Following(null, kind: 'gene') else null
      model: @model
    new ShareView
      el: @$('#gene-share-buttons')
    new RelatedGenesView
      el: @$('.main-layout-container .related-genes')
      model: @model
      modelName: 'gene'
    { @router } = new FilterArtworksView
      el: $ '#gene-filter'
      artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}/suggest"
    @setupMode()
    @onFollowRoute()

  setupMode: ->
    if @model.isSubjectMatter() or location.pathname.match('/artworks')
      @artworksMode()
    else
      @artistMode()

  onFollowRoute: ->
    @$('.follow-button').click() if location.pathname.match('/follow')

  setupArtistFillwidth: _.once ->
    if @user and not @model.isSubjectMatter()
      @user.initializeDefaultArtworkCollection().always @renderArtistFillwidth
    else if not @model.isSubjectMatter()
      @renderArtistFillwidth()

  renderArtistFillwidth: =>
    @model.fetchArtists 'related', success: (artists) =>
      new ArtistFillwidthList(
        collection: artists
        el: $('#gene-artists')
        user: @user
      ).fetchAndRender()

  events:
    'click #gene-filter-all-artists': 'artistMode'
    'click #gene-filter-artworks-nav': 'artworksMode'

  artistMode: ->
    @$el.removeClass 'body-infinite-scroll'
    @$('#gene-filter').attr 'data-state', 'artists'
    @router.navigate '/'
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
  Backbone.history.start pushState: true, root: "/gene/#{gene.id}"
