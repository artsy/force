_ = require 'underscore'
Backbone = require 'backbone'
Gene = require '../../models/gene.coffee'
scrollFrame = require 'scroll-frame'
qs = require 'querystring'
CurrentUser = require '../../models/current_user.coffee'
FilterArtworks = require '../../collections/filter_artworks.coffee'
FilterView = require '../../components/filter2/view.coffee'
FilterRouter = require '../../components/filter2/router/index.coffee'
BlurbView = require '../../components/blurb/view.coffee'
ShareView = require '../../components/share/view.coffee'
RelatedGenesView = require '../../components/related_links/types/gene_genes.coffee'
{ Following, FollowButton } = require '../../components/follow_button/index.coffee'
{ GENE, CURRENT_USER, API_URL, FILTER_ROOT } = require('sharify').data

RelatedArtistsTemplate = -> require('./templates/related_artists.jade') arguments...

module.exports.GeneView = class GeneView extends Backbone.View

  initialize: ({ @user, @relatedArtists }) ->
    @listenTo @relatedArtists, 'sync', @renderRelatedArtists

  renderRelatedArtists: (artists) ->
    @$('.related-artists').html(
      RelatedArtistsTemplate
        artists: artists.models[...10]
      ).addClass 'is-fade-in'

module.exports.init = ->
  gene = new Gene GENE
  user = CurrentUser.orNull()

  view = new GeneView
    user: user
    el: $ 'body'
    model: gene
    relatedArtists: gene.relatedArtists

  gene.fetchArtists 'related',
    success: (artists) ->
      triggered = view.trigger 'relatedArtistsFetched', artists

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

  queryParams = qs.parse(location.search.replace(/^\?/, ''))
  params = new Backbone.Model _.extend queryParams, { page: 1, size: 10, gene_id: gene.id }

  collection = new FilterArtworks

  view = new FilterView
    el: $ '#gene-filter'
    collection: collection
    params: params
    stuckFacet: gene

  router = new FilterRouter
    params: params
    urlRoot: FILTER_ROOT
    stuckParam: 'gene'

  collection.fetch
    data: params.toJSON()
    success: ->
      collection.trigger 'initial:fetch'

  Backbone.history.start pushState: true


