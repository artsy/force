{ API_URL } = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
GenericFormView = require '../generic_form/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class SettingsPasswordView extends GenericFormView
  className: 'settings-password'

  events: _.extend GenericFormView::events,
    'click .js-settings-password__toggle': 'toggle'

  initialize: ({ @user }) ->
    @model = new Backbone.Model id: 1 # Forces PUT
    @model.url = "#{API_URL}/api/v1/me/password"

    @listenTo @model, 'sync', @logoutAndRedirect

  toggleable: ->
    @$('.js-settings-password--toggleable')

  toggle: (e) ->
    e.preventDefault()
    @toggleable().toggle()

  # Changing your password logs you out
  # so we redirect to login after changing password
  logoutAndRedirect: -> _.delay ->
    $.ajax
      method: "DELETE"
      url: "/users/sign_out",
      complete: ->
        return location.assign '/log_in?redirect_uri=/user/edit'
  , 300

  render: ->
    @$el.html template()
    this
