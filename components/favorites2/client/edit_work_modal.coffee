_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
CurrentUser = require '../../../models/current_user.coffee'
CollectionList = require './collection_list.coffee'
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
    new CollectionList
      el: @$el
      collections: @collections
      user: @user
      collection: @collection
      artwork: @artwork
    @collections.on 'add', @renderInner
    @collections.fetch success: =>
      @collections.remove @collection.get 'id'
      @renderInner()
      @updatePosition()
      @isLoaded()
    super

  postRender: ->
    @isLoading()

  events: -> _.extend super,
    'click .favorites2-edit-modal-cancel': 'close'
    'click .favorites2-edit-modal-delete, .favorites2-edit-modal-cancel-delete': 'toggleDelete'
    'click .favorites2-edit-modal-delete-confirm': 'delete'
    'click .favorites2-collection-list li': 'close'

  toggleDelete: ->
    @$('.favorites2-edit-modal-delete-container, .favorites2-edit-modal-init').toggle()

  delete: ->
    @collection.removeArtwork @artwork
    @close()