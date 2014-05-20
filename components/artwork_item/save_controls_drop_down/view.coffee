Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
{ track } = require '../../../lib/analytics.coffee'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'

module.exports = class SaveControls extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    return unless @user
    @collections = new ArtworkCollections [], user: @user
    @collections.on 'add', @renderCollections

  renderCollections: =>
    @$('.save-controls-drop-down-menu li:not(.save-controls-drop-down-new)').remove()
    @$('.save-controls-drop-down-menu ul').prepend @collections.map((collection) ->
      "<li class='#{if collection.get('id') is 'saved-artwork' then 'is-active' else ''}'>
        #{collection.get('name')}
        <span class='icon-check'></span>
      </li>"
    ).join ''

  events:
    'click .overlay-button-save': 'openCollectionModal'
    'click .save-controls-drop-down-menu ul li:not(.save-controls-drop-down-new)': 'addToCollection'
    'submit .save-controls-drop-down-new form': 'newCollection'
    'focus .save-controls-drop-down-new form': (e) -> e.preventDefault()
    'click .save-controls-drop-down-new input': (e) -> e.preventDefault()

  showSignupModal: ->
    track.funnel 'Triggered sign up form via save button'
    mediator.trigger 'open:auth',
      mode: 'register'
      copy: 'Sign up to save artworks'
      destination: "#{@model.href()}/save"
    false

  openCollectionModal: ->
    return @showSignupModal() unless @user
    @$el.attr 'data-state', 'saving'
    @collections.fetch success: => @$el.attr 'data-state', 'saved'
    false

  addToCollection: (e) ->
    col = @collections.at $(e.currentTarget).index()
    col.saveArtwork @model.get('id')
    @$el.attr 'data-state', 'saved-close'
    false

  newCollection: (e) ->
    e.preventDefault()
    collection = new ArtworkCollection
      name: @$('.save-controls-drop-down-new input').val()
      user_id: @user.get('id')
    @collections.add collection
    collection.save()
    false