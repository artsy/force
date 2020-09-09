Backbone = require 'backbone'
{ openAuthModal } = require '../../lib/openAuthModal'
{ ModalType } = require "../../../v2/Components/Authentication/Types"
{ Intent } = require "@artsy/cohesion"

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
      openAuthModal(ModalType.signup, {
        copy: 'Sign up to save artworks'
        afterSignUpAction: {
          action: 'save',
          objectId: @id
        }
        intent: Intent.saveArtwork
        destination: location.href
        contextModule: @context_module
      })

    if @saved
      save = @savedArtworks.get @id
      @savedArtworks.remove save
      save.destroy
        processData: true
        data: user_id: @user.id

      window.analytics.track "Removed Artwork",
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
      window.analytics.track "Saved Artwork",
        entity_id: save._id
        entity_slug: save.id
        context_page: @context_page
        context_module: @context_module

  reRender: (saved) -> ({ id }) =>
    @render saved if id is @id

  render: (saved) ->
    @$el.attr @attributes saved
    this
