_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
User      = require './user.coffee'

module.exports = class LoggedOutUser extends User
  url: ->
    "#{sd.API_URL}/api/v1/me"

  login: (options = {}) ->
    settings = _.defaults options,
      url     : '/users/sign_in'
      success : -> location.reload()
    new Backbone.Model().save (@pick 'email', 'password'), settings

  signup: (options = {}) ->
    settings = _.defaults options,
      url     : '/users/invitation/accept'
      success : -> location.reload()
    new Backbone.Model().save (@pick 'name', 'email', 'password'), settings

  # Alias #signup
  register: @::signup

  forgot: (options = {}) ->
    settings = _.defaults options,
      url : "#{sd.API_URL}/api/v1/users/send_reset_password_instructions"
    new Backbone.Model().save (@pick 'email'), settings

  # Since this model gets initialized in a logged out state,
  # to persist any changes to it we have to manually inject
  # the access token after a login takes place
  save: (attributes, options = {}) ->
    options.beforeSend = (xhr) =>
      xhr.setRequestHeader('X-ACCESS-TOKEN', @get 'accessToken')
    Backbone.Model::save.call this, attributes, options
