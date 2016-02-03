{ invoke } = require 'underscore'
Backbone = require 'backbone'
DeleteMyAccountView = require '../components/delete_my_account/view.coffee'
template = -> require('../templates/delete.jade') arguments...

module.exports = class DeleteView extends Backbone.View
  subViews: []

  initialize: ({ @user, @profile }) -> #

  postRender: ->
    deleteMyAccountView = new DeleteMyAccountView user: @user
    @$('.js-settings-section__main--delete-my-account')
      .html deleteMyAccountView.render().$el

    @subViews = [
      deleteMyAccountView
    ]

  render: ->
    @$el.html template
      user: @user
      profile: @profile
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
