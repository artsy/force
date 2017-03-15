_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../../../components/mixins/form.coffee'

module.exports.LoginView = class LoginView extends Backbone.View
  _.extend @prototype, Form

  events:
    'click button': 'submit'

  initialize: ->
    @model = new Backbone.Model
    @model.url = "#{API_URL}/api/v1/users/reset_password"
