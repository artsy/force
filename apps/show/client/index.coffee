_               = require 'underscore'
sd              = require('sharify').data
AdditionalImage = require '../../../models/additional_image.coffee'
Artworks        = require '../../../collections/artworks.coffee'
Backbone        = require 'backbone'
CarouselView    = require '../../../components/carousel/view.coffee'
CurrentUser     = require '../../../models/current_user.coffee'
SaveControls    = require '../../../components/artwork_item/save_controls.coffee'
PartnerShow     = require '../../../models/partner_show.coffee'
ShareView       = require '../../../components/share/view.coffee'
artworkColumns  = -> require('../../../components/artwork_columns/template.jade') arguments...

module.exports.PartnerShowView = class PartnerShowView extends Backbone.View

  initialize: (options) ->
    @shareView = new ShareView
      el        : @$('.show-share')
    @setupCurrentUser()

    @model.fetchInstallShots
      success: (installShots) =>
        @carouselView = new CarouselView
          el        : @$('.carousel')
          collection: installShots
          height    : 400

    @model.fetchArtworks
      success: (artworks) =>
        @collection = artworks
        @$('.show-artworks').html artworkColumns artworkColumns: artworks.groupByColumnsInOrder(3)
        @setupArtworkSaveControls()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  setupArtworkSaveControls: ->
    listItems =
      for artwork, index in @collection.models
        overlay = @$(".artwork-item[data-artwork='#{artwork.get('id')}']").find('.overlay-container')
        new SaveControls
          artworkCollection: @artworkCollection
          el               : overlay
          model            : artwork
    if @artworkCollection
      @artworkCollection.addRepoArtworks @collection
      @artworkCollection.syncSavedArtworks()

module.exports.init = ->

  new PartnerShowView
    el   : $('#show')
    model: new PartnerShow sd.SHOW
