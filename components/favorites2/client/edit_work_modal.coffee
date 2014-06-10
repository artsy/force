_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
CurrentUser = require '../../../models/current_user.coffee'
template = -> require('../templates/edit_work_modal.jade') arguments...
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'

module.exports = class EditWorkModal extends ModalView

  template: (locals) =>
    template _.extend locals,
      { currentCollection: @collection, otherCollections: @collections.models }

  initialize: (options) ->
    { @artwork, @collection } = options
    @user = CurrentUser.orNull()
    @collections = new ArtworkCollections [], user: @user
    @collections.fetch success: =>
      @renderInner()
      @updatePosition()
      @isLoaded()
    super

  postRender: ->
    @isLoading()

  events: -> _.extend super,
    'click .favorites2-edit-modal-delete, .favorites2-edit-modal-cancel-delete': 'toggleDelete'
    'click .favorites2-edit-modal-delete-confirm': 'delete'
    'click .favorites2-edit-work-modal-move-to-list li': 'moveTo'

  toggleDelete: ->
    @$('.favorites2-edit-modal-delete-container, .favorites2-edit-modal-init').toggle()

  delete: ->
    console.log @artwork
    @collection.removeArtwork @artwork
    @close()

  moveTo: (e) ->
    @collection.removeArtwork @artwork
    @collections.get($(e.target).data 'id').saveArtwork @artwork
    @close()