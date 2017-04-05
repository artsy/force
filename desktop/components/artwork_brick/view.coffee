{ invoke } = require 'underscore'
Backbone = require 'backbone'
ArtworkSaveView = require '../artwork_save/view'

module.exports = class ArtworkBrickView extends Backbone.View
  subViews: []

  initialize: ({ @id, @user, @context_page, @context_module }) -> #

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
