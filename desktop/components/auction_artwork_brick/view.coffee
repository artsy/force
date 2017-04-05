{ invoke } = require 'underscore'
Backbone = require 'backbone'
{ CURRENT_USER } = require('sharify').data
AuthModalView = require '../auth_modal/view'
ArtworkSaveView = require '../artwork_save/view'

module.exports = class AuctionArtworkBrickView extends Backbone.View
  subViews: []

  events:
    'click .js-auction-artwork-brick-bid-button': 'bid'

  initialize: ({ @id, @user, @context_page, @context_module }) -> #

  bid: (e) ->
    if not CURRENT_USER?
      e.preventDefault()

      return new AuthModalView
        width: '500px',
        mode: 'register'
        copy: 'Sign up to bid'
        redirectTo: $(e.currentTarget).attr 'href'

    else
      # Passes through to `href`

  postRender: ->
    view = new ArtworkSaveView
      id: @id
      user: @user
      context_page: @context_page
      context_module: @context_module

    @$(".js-artwork-brick-save-controls[data-id='#{@id}']")
      .html view.render().$el

    @subViews.push view

  remove: ->
    invoke @subViews, 'remove'
    super
