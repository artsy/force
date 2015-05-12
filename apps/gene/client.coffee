_ = require 'underscore'
Backbone = require 'backbone'
Gene = require '../../models/gene.coffee'
scrollFrame = require 'scroll-frame'
qs = require 'querystring'
_s = require 'underscore.string'
CurrentUser = require '../../models/current_user.coffee'
FilterArtworks = require '../../collections/filter_artworks.coffee'
FilterView = require '../../components/filter2/view.coffee'
FilterRouter = require '../../components/filter2/router/index.coffee'
BlurbView = require '../../components/blurb/view.coffee'
ShareView = require '../../components/share/view.coffee'
ArtistFillwidthList = require '../../components/artist_fillwidth_list/view.coffee'
RelatedGenesView = require '../../components/related_links/types/gene_genes.coffee'
{ Following, FollowButton } = require '../../components/follow_button/index.coffee'
{ GENE, CURRENT_USER, API_URL, FILTER_ROOT, MODE, FILTER_COUNTS } = require('sharify').data

RelatedArtistsTemplate = -> require('./templates/related_artists.jade') arguments...
ContentTemplate = -> require('./templates/filter.jade') arguments...

module.exports.GeneView = class GeneView extends Backbone.View

  initialize: ({ @user, @relatedArtists, @mode, @params }) ->
    @listenTo @relatedArtists, 'sync', @renderRelatedArtists
    @listenTo @mode, 'change', @renderContent, @

  renderRelatedArtists: (artists) ->
    @$('.related-artists').html(
      RelatedArtistsTemplate
        artists: artists.models[...10]
      ).addClass 'is-fade-in'

  renderContent: ->
    @$('#gene-filter').html(
      ContentTemplate
        gene: @model
        filterRoot: FILTER_ROOT
        counts: FILTER_COUNTS
        numberFormat: _s.numberFormat
        params: @params
        activeText: ''
        mode: @mode.get('mode')
      )

    # "hi" -cab
    @["#{@mode.get('mode')}Setup"]()

  artistsSetup: ->


  artworksSetup: ->
    collection = new FilterArtworks

    view = new FilterView
      el: $ '#gene-filter'
      collection: collection
      params: @params
      stuckFacet: @model

    router = new FilterRouter
      params: @params
      urlRoot: FILTER_ROOT
      stuckParam: 'gene'

    collection.fetch
      data: @params.toJSON()
      success: ->
        collection.trigger 'initial:fetch'

module.exports.init = ->

  #
  # Setup universal gene components
  #

  gene = new Gene GENE
  user = CurrentUser.orNull()

  queryParams = qs.parse(location.search.replace(/^\?/, ''))

  params = new Backbone.Model _.extend queryParams,
    page: 1
    size: 10
    gene_id: gene.id

  view = new GeneView
    user: user
    el: $ 'body'
    model: gene
    relatedArtists: gene.relatedArtists
    mode: new Backbone.Model
    params: params

  view.mode.set mode: MODE

  gene.fetchArtists 'related'

  new ShareView el: $('#gene-share-buttons')

  following = if user then new Following(null, kind: 'gene') else null
  new FollowButton
    el: $('.follow-button')
    following: following
    modelName: 'categorie'
    model: gene
  following?.syncFollows [ gene.id ]

  if ($blurb = $('.blurb')).length
    new BlurbView
      el: $blurb
      lineCount: 7
      updateOnResize: true

    $blurb.css maxHeight: 'none'

  new RelatedGenesView
    el: $('.main-layout-container .related-genes')
    id: gene.id

  scrollFrame '#gene-filter a'
