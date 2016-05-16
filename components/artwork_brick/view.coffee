{ invoke } = require 'underscore'
Backbone = require 'backbone'
ArtworkSaveView = require '../artwork_save/view.coffee'

module.exports = class ArtworkBrickView extends Backbone.View
  subViews: []

  initialize: ({ @id, @user }) -> #

  postRender: ->
    view = new ArtworkSaveView id: @id, user: @user

    @$(".js-artwork-brick-save-controls[data-id='#{@id}']")
      .html view.render().$el

    @subViews.push view

  remove: ->
    invoke @subViews, 'remove'
    super
