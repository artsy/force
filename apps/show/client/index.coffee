_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'

AdditionalImage = require '../../../models/additional_image.coffee'
Artworks        = require '../../../collections/artworks.coffee'
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

    @$showArtworks = @$('.show-artworks')
    @$carousel = @$('.carousel')

    @model.fetchInstallShots
      success: (installShots) =>
        if installShots.length > 0
          @carouselView = new CarouselView
            el        : @$carousel
            collection: installShots
            height    : 400
        else
          @$carousel.remove()
      error: => @$carousel.remove()

    @model.fetchArtworks
      success: (artworks) =>
        if artworks.length > 0
          @collection = artworks
          @$showArtworks.html artworkColumns artworkColumns: artworks.groupByColumnsInOrder(3)
          @setupArtworkSaveControls()
        else
          @$showArtworks.remove()
      error: => @$showArtworks.remove()

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
