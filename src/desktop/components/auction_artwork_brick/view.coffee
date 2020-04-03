{ invoke } = require 'underscore'
Backbone = require 'backbone'
{ CURRENT_USER } = require('sharify').data
ArtworkSaveView = require '../artwork_save/view.coffee'
{ openAuthModal } = require '../../lib/openAuthModal'
{ ModalType } = require "@artsy/reaction/dist/Components/Authentication/Types"
{ AuthIntent } = require "@artsy/reaction/dist/Artsy/Analytics/v2/Schema"

module.exports = class AuctionArtworkBrickView extends Backbone.View
  subViews: []

  events:
    'click .js-auction-artwork-brick-bid-button': 'bid'

  initialize: ({ @id, @user, @context_page, @context_module }) -> #

  bid: (e) ->
    # FIXME: Maybe not used?
    if not CURRENT_USER?
      e.preventDefault()
      openAuthModal(ModalType.signup, {
        copy: 'Sign up to bid'
        intent: AuthIntent.bid
        redirectTo: $(e.currentTarget).attr 'href'
        contextModule: @context_module
      })
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
