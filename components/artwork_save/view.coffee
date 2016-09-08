Backbone = require 'backbone'
AuthModalView = require '../auth_modal/view.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'

module.exports = class ArtworkSaveView extends Backbone.View
  tagName: 'a'
  className: 'artwork-save js-artwork-brick-save'
  events: click: 'toggle'
  saved: false

  initialize: ({ @user, @context_page, @context_module }) ->
    { @savedArtworks } = @user.related()

    @listenTo @savedArtworks, 'remove', @reRender false
    @listenTo @savedArtworks, 'add', @reRender true

  attributes: (saved) ->
    'data-id': @id
    'data-saved': @saved = if saved?
      saved
    else if @savedArtworks?
      @savedArtworks.get(@id)?

  toggle: (e) ->
    e.preventDefault()

    if not @user.isLoggedIn()
      return new AuthModalView
        width: '500px',
        mode: 'register'
        copy: 'Sign up to save artworks'
        redirectTo: "/artwork/#{@id}/save"

    if @saved
      save = @savedArtworks.get @id
      @savedArtworks.remove save
      save.destroy
        processData: true
        data: user_id: @user.id

      analyticsHooks.trigger 'save:remove-artwork',
        entity_id: save._id
        entity_slug: save.id
        context_page: @context_page
        context_module: @context_module

    else
      save = @savedArtworks.add
        id: @id
        user_id: @user.id

      clone = save.clone()
      clone.save {}, type: 'post'

      analyticsHooks.trigger 'save:save-artwork',
        entity_id: save._id
        entity_slug: save.id
        context_page: @context_page
        context_module: @context_module

  reRender: (saved) -> ({ id }) =>
    @render saved if id is @id

  render: (saved) ->
    @$el.attr @attributes saved
    this
