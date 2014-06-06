_ = require 'underscore'
Backbone = require 'backbone'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ModalView = require '../../modal/view.coffee'
template = -> require('./templates/modal.jade') arguments...
{ API_URL } = require('sharify').data

module.exports = class SaveControlsModal extends ModalView

  template: (locals) ->
    template _.extend locals,
      artwork: @model,
      collections: @collections.reject (c) -> c.id is 'saved-artwork'

  initialize: ->
    @user = CurrentUser.orNull()
    @collections = new ArtworkCollections [], user: @user
    @collections.on 'add', @renderInner
    @collections.fetch success: =>
      @isLoaded()
      @updatePosition()
    super

  postRender: ->
    @isLoading()

  events: -> _.extend super,
    'submit .save-controls-two-btn-modal-new-collection': 'newCollection'
    'click .save-controls-two-btn-modal-collections li': 'toggleSelected'
    'click .save-controls-two-btn-modal-collections li.is-selected': 'removeFromCollection'
    'click .save-controls-two-btn-modal-done': 'done'

  newCollection: (e) ->
    e.preventDefault()
    collection = new ArtworkCollection
      name: @$('.save-controls-two-btn-modal-new-collection input').val()
      user_id: @user.get('id')
    @collections.add collection
    collection.save()
    @$('.save-controls-two-btn-modal-collections li:last-child').click()
    false

  toggleSelected: (e) ->
    $target = $(e.currentTarget)
    @$('.save-controls-two-btn-modal-collections li').removeClass 'is-selected'
    $target.addClass('is-selected is-init-click')
    $target.one 'mouseout', -> $target.removeClass('is-init-click')

  removeFromCollection: (e) ->
    col = @collections.at $(e.currentTarget).index()
    col.removeArtwork @model.get 'id'
    $(e.currentTarget).removeClass 'is-selected'
    $removed = $(e.currentTarget).find('.save-controls-removed')
    $removed.show()
    setTimeout (-> $removed.fadeOut 'fast'), 1000

  done: ->
    col = @collections.at @$('.save-controls-two-btn-modal-collections li.is-selected').index()
    col.saveArtwork @model
    @close()