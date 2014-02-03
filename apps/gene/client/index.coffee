mediator = require '../../../lib/mediator.coffee'
Backbone = require 'backbone'
Gene = require '../../../models/gene.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistFillwidthList = require '../../../components/artist_fillwidth_list/view.coffee'
{ GENE, CURRENT_USER } = require('sharify').data
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
ShareView = require '../../../components/share/view.coffee'

module.exports.GeneView = class GeneView extends Backbone.View

  initialize: (options) ->
    { @user } = options
    @setupFollowButton()
    @setupArtistFillwidth()
    @shareView = new ShareView el: @$('#gene-share-buttons')

  setupArtistFillwidth: ->
    @user.initializeDefaultArtworkCollection success: =>
      @model.fetchArtists 'related', success: (artists) =>
        new ArtistFillwidthList(
          collection: artists
          el: $('#gene-artists')
          user: @user
        ).fetchAndRender()

  setupFollowButton: ->
    new FollowButton
      el: $('#gene-artists')
      following: if @user then new Following(null, kind: 'gene') else null
      model: @model

module.exports.init = ->
  new GeneView
    user: CurrentUser.orNull()
    el: $ 'body'
    model: new Gene GENE