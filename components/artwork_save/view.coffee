Backbone = require 'backbone'
AuthModalView = require '../auth_modal/view.coffee'

module.exports = class ArtworkSaveView extends Backbone.View
  tagName: 'a'
  className: 'artwork-save js-artwork-brick-save'
  events: click: 'toggle'
  saved: false

  initialize: ({ @user }) ->
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
        destination: "/artwork/#{@id}/save"

    if @saved
      save = @savedArtworks.get @id
      @savedArtworks.remove save
      save.destroy
        processData: true
        data: user_id: @user.id

    else
      save = @savedArtworks.add
        id: @id
        user_id: @user.id

      clone = save.clone()
      clone.save {}, type: 'post'

  reRender: (saved) -> ({ id }) =>
    @render saved if id is @id

  render: (saved) ->
    @$el.attr @attributes saved
    this
