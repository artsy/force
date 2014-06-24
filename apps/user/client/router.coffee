_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Profile = require '../../../models/profile.coffee'
UserEdit = require '../models/user_edit.coffee'
AccountForm = require './account_form.coffee'
ProfileForm = require './profile_form.coffee'
CollectorForm = require './collector_form.coffee'
CurrentUser = require '../../../models/current_user.coffee'
UserSettingsView = require './view.coffee'

module.exports = class UserSettingsRouter extends Backbone.Router
  routes:
    'user/edit': 'user'
    'profile/edit': 'profile'
    'collector/edit': 'collector'

  initialize: (options = {}) ->
    user = new UserEdit sd.USER_EDIT
    user.initializeDefaultArtworkCollection success: (collection, response, options) =>
      user.set 'public_favorites', !collection.get('private')

    @models =
      user: CurrentUser.orNull()
      profile: new Profile sd.PROFILE
      userEdit: user

    @baseView = new UserSettingsView _.extend(el: $('#settings'), @models)

  execute: ->
    @view?.remove()
    @baseView.activateCurrentTab()
    super
    _.defer =>
      @view.$el.addClass 'is-fade-in'

  user: ->
    @view = new AccountForm @models
    @baseView.$('#settings-forms').html @view.render().$el

  profile: ->
    @view = new ProfileForm @models
    @baseView.$('#settings-forms').html @view.render().$el

  collector: ->
    @view = new CollectorForm @models
    @baseView.$('#settings-forms').html @view.render().$el
