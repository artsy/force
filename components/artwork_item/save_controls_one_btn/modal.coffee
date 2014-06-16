_ = require 'underscore'
Backbone = require 'backbone'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ModalView = require '../../modal/view.coffee'
CollectionList = require '../../favorites2/client/collection_list.coffee'
template = -> require('./templates/modal.jade') arguments...
{ API_URL } = require('sharify').data

module.exports = class SaveControlsModal extends ModalView

  template: (locals) ->
    template _.extend locals, artwork: @model, collections: @collections.models

  initialize: ->
    @user = CurrentUser.orNull()
    @collections = new ArtworkCollections [], user: @user
    @collections.on 'add', @renderInner
    new CollectionList
      el: @$el
      collections: @collections
      user: @user
      collection: null
      artwork: @model
    @collections.fetch success: =>
      @updatePosition()
      @isLoaded()
    super

  postRender: ->
    @isLoading()

  events: -> _.extend super,
    'click .save-controls-one-btn-modal-done': 'close'