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
    @$('.save-controls-drop-down-menu-item:not(.save-controls-drop-down-new)').remove()
    @$('.save-controls-drop-down-menu nav').prepend @collections.map((collection) ->
      "<div class='save-controls-drop-down-menu-item #{if collection.get('id') is 'saved-artwork' then 'is-active' else ''}'>
        #{collection.get('name')}
        <span class='icon-check'></span>
      </div>"
    ).join ''

  closeOnClickOff: (e) =>
    return if $(e.currentTarget).closest('.save-controls-drop-down-container')?.attr('data-state') is 'saved'
    @$el.attr 'data-state', 'saved-close'
    $(document).off 'click.save-controls-' + @cid

  addToCollection: (col) ->
    col.saveArtwork @model.get('id')
    @$('.save-controls-drop-down-menu-item').removeClass 'is-active'
    @$(".save-controls-drop-down-menu-item:eq(#{@collections.indexOf col})").addClass 'is-active'

  events:
    'click .overlay-button-save': 'openCollectionModal'
    'click .save-controls-drop-down-menu-item:not(.save-controls-drop-down-new)': 'onClickItem'
    'click form button': 'newCollection'
    'click .save-controls-drop-down-new input': (e) -> e.preventDefault()
    'click': (e) -> e.preventDefault()

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
    @collections.fetch success: =>
      $(document).on 'click', @closeOnClickOff
      @$el.attr 'data-state', 'saved'

  onClickItem: (e) ->
    e.preventDefault()
    @addToCollection @collections.at $(e.currentTarget).index()
    false

  newCollection: (e) ->
    collection = new ArtworkCollection
      name: @$('.save-controls-drop-down-new input').val()
      user_id: @user.get('id')
    @$('.save-controls-drop-down-new').addClass 'is-loading'
    collection.save null, complete: =>
      @collections.add collection
      @$('.save-controls-drop-down-new').removeClass 'is-loading'
      @addToCollection collection
    false