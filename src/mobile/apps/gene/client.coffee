_ = require 'underscore'
sd = require('sharify').data
qs = require 'querystring'
bootstrap = require '../../components/layout/bootstrap.coffee'
Backbone = require 'backbone'
Gene = require '../../models/gene.coffee'
FilterArtworks = require '../../collections/filter_artworks.coffee'
Artists = require '../../collections/artists.coffee'
PoliteInfiniteScrollView = require '../../components/polite_infinite_scroll/client/view.coffee'
{ setupFilter } = require '../../components/filter2/index.coffee'
FollowGene = require '../../collections/follow_genes.coffee'
FollowButtonView = require '../../components/follow_button/view.coffee'
CurrentUser = require '../../models/current_user.coffee'
artworkColumnsTemplate = -> require('../../components/artwork_columns/template.jade') arguments...
artistTemplate = -> require('./templates/artist_list.jade') arguments...

module.exports.GeneArtworksView = class GeneArtworksView extends PoliteInfiniteScrollView

  events:
    'click .gene-read-more-button': 'readMore'

  initialize: (options) ->
    { collection } = setupFilter
      el: $ '.gene-artworks-filters'
      aggregations: ['price_range', 'total']
      stuckFacet: new Gene sd.GENE
      stuckParam: 'gene_id'

    @listenTo @collection, 'initial:fetch', @hideSpinner

    super

  readMore: (e) ->
    e.preventDefault()
    totalHeight = 0
    paragraphs = @$('.gene-description-text p')
    paragraphs.each (i, element)=>
      totalHeight += $(element).height()
    @$('.gene-description-text')
      .css { "height" : @$('.gene-description-text').height(),"max-height" : 9999}
      .animate { "height" : totalHeight }
    @$('.gene-read-more-fade').hide()
    @$('.gene-read-more-button').hide()

    false

module.exports.GeneArtistsView = class GeneArtistsView extends PoliteInfiniteScrollView

  events:
    'click a.gene-read-more-button': 'readMore'

  initialize: (options) ->
    @page = 1
    super

  onInfiniteScroll: ->
    return if @finishedScrolling
    @addItemsToCollection()

  onInitialFetch: ->
    @showShowMoreButton()
    @hideSpinner()
    @addItemsToCollection() #20 items
    @onSync()

  addItemsToCollection: ->
    @page++
    @collection.fetch
      data: _.extend(@params, page: @page)
      remove: false
      success: (artists, res) =>
        @onFinishedScrolling() if res.length is 0

  onSync: =>
    if @collection.length > 0
      @$('#gene-artists-container').html artistTemplate artists: @collection.models
      @$('#gene-artists-container img').error -> $(@).closest('a').hide()
      @$('#gene-artists-empty-message').hide()
    else
      @$('#gene-artists-empty-message').show()

  readMore: (e) ->
    e.preventDefault()
    totalHeight = 0
    paragraphs = @$('.gene-description-text p')
    paragraphs.each (i, element)=>
      totalHeight += $(element).height()
    @$('.gene-description-text')
      .css { "height" : @$('.gene-description-text').height(),"max-height" : 9999}
      .animate { "height" : totalHeight }
    @$('.gene-read-more-fade').hide()
    @$('.gene-read-more-button').hide()

    false

module.exports.init = ->
  bootstrap()
  gene = new Gene sd.GENE
  follows = new FollowGene []
  follows.syncFollows [ gene.get('id') ]
  new FollowButtonView
    collection: follows
    el: $('#gene-page-header .follow-button')
    type: 'Gene'
    followId: gene.get 'id'
    isLoggedIn: not _.isNull CurrentUser.orNull()
    _id: gene.get '_id'
    context_module: 'Gene page'

  if gene.isSubjectMatter()
    artworks = new FilterArtworks
    artworks.fetch
      data: gene_id: gene.get 'id'
      success: (artworks) ->
        new GeneArtworksView
          collection: artworks
          el: $ 'body'
          model: gene
          params: sd.PARAMS
  else
    artists = new Artists
    artists.url = "#{sd.API_URL}/api/v1/gene/#{gene.get('id')}/artists"
    artists.fetch().then ->
      new GeneArtistsView
        collection: artists
        el: $ 'body'
        model: gene
        params: sd.PARAMS
