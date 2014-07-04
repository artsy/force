Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
SaveControlsModal = require './modal.coffee'
CurrentUser = require '../../../models/current_user.coffee'
{ track } = require '../../../lib/analytics.coffee'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'

module.exports = class SaveControls extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    @savedArtworks = new ArtworkCollection id: 'saved-artwork', user_id: @user.get('id')
    { @collections } = options
    @collections ?= new ArtworkCollections [], user: @user

  showSignupModal: ->
    track.funnel 'Triggered sign up form via save button'
    mediator.trigger 'open:auth',
      mode: 'register'
      copy: 'Sign up to save artworks'
      destination: "#{@model.href()}/save"
    true

  events:
    'click .overlay-button-save:not([data-state=saved]), .circle-icon-button-save': 'save'
    'click .overlay-button-save[data-state=saved], .circle-icon-button-save[data-state=saved]': 'remove'
    'click .save-controls-two-btn-add-to-collection, .circle-icon-button-add': 'openCollectionModal'

  save: (e) ->
    e?.preventDefault()
    return @showSignupModal() unless @user
    @savedArtworks.saveArtwork @model
    @$('.overlay-button-save, .circle-icon-button-save').attr 'data-state', 'saved'

  remove: (e) ->
    e?.preventDefault()
    @savedArtworks.removeArtwork @model
    @$('.overlay-button-save, .circle-icon-button-save').attr 'data-state', null

  openCollectionModal: (e) ->
    e?.preventDefault()
    return @showSignupModal() unless @user
    new SaveControlsModal width: 500, model: @model, collections: @collections