_               = require 'underscore'
sd              = require('sharify').data
AdditionalImage = require '../../../models/additional_image.coffee'
Artworks        = require '../../../collections/artworks.coffee'
Backbone        = require 'backbone'
CarouselView    = require '../../../components/carousel/view.coffee'
CurrentUser     = require '../../../models/current_user.coffee'
SaveControls    = require '../../../components/fillwidth_row/save_controls.coffee'
PartnerShow     = require '../../../models/partner_show.coffee'
ShareView       = require '../../../components/share/view.coffee'

module.exports.PartnerShowView = class PartnerShowView extends Backbone.View

  initialize: (options) ->
    @shareView = new ShareView
      el        : @$('.show-share')
    @carouselView = new CarouselView
      el        : @$('.carousel')
      collection: new Backbone.Collection sd.INSTALL_SHOTS, { model: AdditionalImage }
    @setupCurrentUser()
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
    el        : $('#show')
    model     : new PartnerShow sd.SHOW
    collection: new Artworks sd.ARTWORKS
