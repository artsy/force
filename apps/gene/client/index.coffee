mediator                    = require '../../../lib/mediator.coffee'
Backbone                    = require 'backbone'
Gene                        = require '../../../models/gene.coffee'
CurrentUser                 = require '../../../models/current_user.coffee'
ArtistFillwidthList         = require '../../../components/artist_fillwidth_list/view.coffee'
{ GENE, CURRENT_USER }      = require('sharify').data
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
ShareView                   = require '../../../components/share/view.coffee'
GeneFilter                  = require './filter.coffee'
RelatedGenesView            = require '../../../components/related_genes/view.coffee'

module.exports.GeneView = class GeneView extends Backbone.View

  initialize: (options) ->
    { @user } = options
    @followButton = new FollowButton
      el: $('.follow-button')
      following: if @user then new Following(null, kind: 'gene') else null
      model: @model
    @shareButtons = new ShareView
      el: @$('#gene-share-buttons')
    @filter = new GeneFilter
      el: @$('#gene-filter')
      model: @model
    @setupArtistFillwidth()
    @setupRelatedGenes()

  setupRelatedGenes: ->
    new RelatedGenesView
      el: @$('.main-layout-container .related-genes')
      model: @model
      modelName: 'gene'

  setupArtistFillwidth: ->
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

module.exports.init = ->
  gene = new Gene GENE
  new GeneView
    user: CurrentUser.orNull()
    el: $ 'body'
    model: gene
  Backbone.history.start pushState: true, root: "/gene/#{gene.id}"
