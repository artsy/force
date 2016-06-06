{ extend } = require 'underscore'
{ View } = require 'backbone'
{ SHOW_PATH } = require('sharify').data
Form = require '../../../../../components/form/index.coffee'
scrollTo = require '../../../../../components/smooth_scroll/index.coffee'
AuthModalView = require '../../../../../components/auth_modal/view.coffee'
template = -> require('../templates/page.jade') arguments...

module.exports = class ProfessionalBuyerIndexView extends View
  events:
    'click .js-move-to-cta': 'moveToCTA'
    'click .js-login': 'login'
    'click .js-logout': 'logout'
    'submit .js-register-form': 'register'

  initialize: ({ @data, @user }) -> #

  login: (e) ->
    e.preventDefault()
    @authenticate 'login'

  logout: (e) ->
    e.preventDefault()
    $.ajax
      url: '/users/sign_out'
      type: 'DELETE'
      success: =>
        @authenticate 'login'

  moveToCTA: (e) ->
    e.preventDefault()
    scrollTo @$('.js-cta')

  register: (e) ->
    e.preventDefault()

    form = new Form $form: @$('.js-register-form')
    return unless form.isReady()

    form.state 'loading'

    @user.set form.data()
    @user.register
      error: form.error.bind form
      success: =>
        @redirectTo "#{SHOW_PATH}/complete"

  authenticate: (mode) ->
    new AuthModalView
      mode: mode
      width: '500px'
      copy: 'Artsy Professional Buyer Program'
      redirectTo: "#{SHOW_PATH}/complete"

  redirectTo: (path) ->
    location.assign path

  render: ->
    @$el.html template extend {}, @data,
      user: @user
    this
