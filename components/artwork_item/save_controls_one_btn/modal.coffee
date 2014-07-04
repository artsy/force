_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
ModalView = require '../../modal/view.coffee'
CollectionList = require '../../favorites2/client/collection_list.coffee'
template = -> require('./templates/modal.jade') arguments...
{ API_URL } = require('sharify').data

module.exports = class SaveControlsModal extends ModalView

  template: (locals) ->
    template _.extend locals, artwork: @model, collections: @collections.models

  initialize: (options) ->
    @user = CurrentUser.orNull()
    { @collections } = options
    new CollectionList
      el: @$el
      collections: @collections
      user: @user
      collection: null
      artwork: @model
    @collections.on 'add', @renderInner
    @collections.fetchUntilEnd success: =>
      @collections.injectArtwork @model, success: =>
        @updatePosition()
        @isLoaded()
    super

  postRender: ->
    @isLoading()

  events: -> _.extend super,
    'click .save-controls-one-btn-modal-done': 'close'