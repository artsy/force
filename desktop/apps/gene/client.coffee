_ = require 'underscore'
Backbone = require 'backbone'
Gene = require '../../models/gene'
scrollFrame = require 'scroll-frame'
CurrentUser = require '../../models/current_user'
blurb = require '../../components/gradient_blurb/index'
ShareView = require '../../components/share/view'
ArtistFillwidthList = require '../../components/artist_fillwidth_list/view'
RelatedGenesView = require '../../components/related_links/types/gene_genes'
{ Following, FollowButton } = require '../../components/follow_button/index'
{ GENE, CURRENT_USER, API_URL, MODE } = sd = require('sharify').data
{ setupFilter } = require '../../components/filter2/index'
aggregationParams = require './aggregations'

RelatedArtistsTemplate = -> require('./templates/related_artists.jade') arguments...

module.exports.GeneView = class GeneView extends Backbone.View

  initialize: ({ @user, @relatedArtists, @mode, @params }) ->
    @listenTo @relatedArtists, 'sync', @renderRelatedArtists
    @listenTo @params, 'change', => @mode.set mode: 'artworks'
    @listenTo @mode, 'change', =>
      @$('#gene-filter').attr 'data-state', @mode.get('mode')

  renderRelatedArtists: (artists) ->
    @$('.related-artists').html(
      RelatedArtistsTemplate
        artists: artists.models[...10]
      ).addClass 'is-fade-in'

    if @model.mode() is 'artist'
      new ArtistFillwidthList(
        collection: @relatedArtists
        el: $('#gene-artists')
        user: @user
      ).fetchAndRender()

module.exports.init = ->
  gene = new Gene GENE
  user = CurrentUser.orNull()

  { params } = setupFilter
    el: $ '#gene-filter'
    defaultHeading: gene.displayName()
    stuckParam: { 'gene_id': gene.id }
    aggregations: aggregationParams
    filterRoot: gene.href() + '/artworks'
    includeMediumFilterInAggregation: { include_medium_filter_in_aggregation: true }

  view = new GeneView
    user: user
    el: $ 'body'
    model: gene
    relatedArtists: gene.relatedArtists
    mode: new Backbone.Model
    params: params

  view.mode.set mode: MODE

  gene.fetchArtists 'related'

  new ShareView el: $('.js-gene-share-buttons')

  following = if user then new Following(null, kind: 'gene') else null
  new FollowButton
    el: $('.follow-button')
    following: following
    modelName: 'gene'
    model: gene
    context_page: "Gene page"
  following?.syncFollows [ gene.id ]

  blurb $('.js-gene-blurb'), limit: 250

  new RelatedGenesView
    el: $('.main-layout-container .related-genes')
    id: gene.id

  scrollFrame '#gene-filter-content a' unless sd.EIGEN
