_ = require 'underscore'
Backbone = require 'backbone'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ModalView = require '../../modal/view.coffee'
template = -> require('./templates/modal.jade') arguments...
{ API_URL } = require('sharify').data

module.exports = class SaveControlsModal extends ModalView

  template: (locals) ->
    template _.extend locals, artwork: @model, collections: @collections.models

  initialize: ->
    @user = CurrentUser.orNull()
    @collections = new ArtworkCollections [], user: @user
    @collections.on 'add', @renderInner
    @collections.fetch success: => @isLoaded()
    super

  postRender: ->
    @isLoading()

  events: -> _.extend super,
    'submit .save-controls-two-btn-modal-new-collection': 'newCollection'
    'click .save-controls-two-btn-modal-collections li': 'toggleSelected'
    'click .save-controls-two-btn-modal-done': 'done'

  newCollection: (e) ->
    e.preventDefault()
    collection = new ArtworkCollection
      name: @$('.save-controls-two-btn-modal-new-collection input').val()
      user_id: @user.get('id')
    @collections.add collection
    collection.save()
    false

  toggleSelected: (e) ->
    @$('.save-controls-two-btn-modal-collections li').removeClass 'is-selected'
    $(e.currentTarget).addClass('is-selected')

  done: ->
    col = @collections.at @$('.save-controls-two-btn-modal-collections li.is-selected').index()
    col.saveArtwork @model.get('id')
    @close()