Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
{ track } = require '../../../lib/analytics.coffee'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'

module.exports = class SaveControls extends Backbone.View

  initialize: (options) ->
    { @collections } = options
    @user = CurrentUser.orNull()
    return unless @user
    @collections ?= new ArtworkCollections [], user: @user
    @collections.on 'add sync add:artwork remove:artwork', @renderCollections

  renderCollections: =>
    @$('.save-controls-drop-down-menu-item:not(.save-controls-drop-down-new)').remove()
    @$('.save-controls-drop-down-menu nav').prepend @collections.map((collection) =>
      """
      <div class='save-controls-drop-down-menu-item \
                  #{if collection.artworks.get(@model.get 'id')? then 'is-active' else ''}' \
           style='#{if collection.get('id') is 'saved-artwork' then 'display: none' else ''}' \
           data-id='#{collection.get('id')}'>
        #{collection.get('name')}
        <span class='icon-check'></span>
        <span class='icon-close'></span>
      </div>
      """
    ).join ''

  closeOnClickOff: (e) =>
    return if $(e.target).closest('.save-controls-drop-down-menu').length
    @rollup()

  addToCollection: (col) ->
    col.saveArtwork @model
    mediator.trigger 'create:artwork:collection', col

  showSignupModal: ->
    track.funnel 'Triggered sign up form via save button'
    mediator.trigger 'open:auth',
      mode: 'register'
      copy: 'Sign up to save artworks'
      destination: "#{@model.href()}/save"

  rollup: =>
    return if @$('.save-controls-drop-down-new input').is(':focus')
    @rollingUp = true
    setTimeout (=> @rollingUp = false), if @$('.circle-icon-button-save').length then 100 else 400
    @$el.attr('data-state', 'saved-close') if @$el.attr('data-state') in ['saved', 'saved-reopen']
    @clearRollup()

  events:
    'click .overlay-button-save, .circle-icon-button-save': 'openDropDown'
    'click .save-controls-drop-down-menu-item:not(.save-controls-drop-down-new):not(.is-active)': 'onAddToCollection'
    'click .save-controls-drop-down-menu-item.is-active': 'onRemoveFromCollection'
    'click form button': 'newCollection'
    'click .save-controls-drop-down-new input': (e) -> e.preventDefault()
    'click': (e) -> e.preventDefault()
    'mouseover .icon-plus-small': -> @$('.save-controls-drop-down-new').addClass 'is-hover'
    'mouseout .icon-plus-small': -> @$('.save-controls-drop-down-new').removeClass 'is-hover'
    'mouseenter': 'onMouseOver'

  clearRollup: ->
    clearTimeout @rollupTimeout
    $(window).off 'scroll.view-' + @cid
    $(document).off 'click.save-controls-' + @cid

  openDropDown: (e) ->
    e.preventDefault()
    return @showSignupModal() unless @user
    return if @$el.attr('data-state') in ['saved-close', 'saved-reopen']
    @$el.attr 'data-state', 'saving'
    @collections.fetchUntilEnd success: =>
      @collections.injectArtwork @model, success: =>
        @$el.attr 'data-state', 'saved'
        $menu = @$('.save-controls-drop-down-menu')
        if $menu.offset().left + $menu.width() > $(window).width()
          $menu.css left: 'inherit', right: 32
        @addToCollection @collections.get('saved-artwork')
        $(document).on 'click', @closeOnClickOff

  onAddToCollection: (e) ->
    e.preventDefault()
    @addToCollection @collections.at $(e.currentTarget).index()
    setTimeout @rollup, 300

  onRemoveFromCollection: (e) ->
    e.preventDefault()
    col = @collections.at $(e.currentTarget).index()
    col.removeArtwork @model

  newCollection: (e) ->
    return unless val = @$('.save-controls-drop-down-new input').val()
    collection = new ArtworkCollection
      name: val
      user_id: @user.get('id')
    @$('.save-controls-drop-down-new').addClass 'is-loading'
    collection.save null, complete: =>
      @collections.add collection
      @$('.save-controls-drop-down-new').removeClass 'is-loading'
      @addToCollection collection
    @$('form input').val ''

  onMouseOver: ->
    @clearRollup()
    if not @rollingUp and @$el.attr('data-state') is 'saved-close'
      @$el.attr 'data-state', 'saved-reopen'
