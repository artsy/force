{ extend } = require 'underscore'
{ View } = require 'backbone'
{ SHOW_PATH } = require('sharify').data
Form = require '../../../../../components/form/index'
scrollTo = require '../../../../../components/smooth_scroll/index'
AuthModalView = require '../../../../../components/auth_modal/view'
analyticsHooks = require '../../../../../lib/analytics_hooks'
template = -> require('../templates/page.jade') arguments...

module.exports = class ProfessionalBuyerIndexView extends View
  events:
    'click .js-move-to-cta': 'moveToCTA'
    'click .js-login': 'login'
    'click .js-logout': 'logout'
    'click .js-forgot': 'forgot'
    'submit .js-register-form': 'register'

  initialize: ({ @data, @user }) -> #

  forgot: (e) ->
    e.preventDefault()
    @authenticate 'forgot'

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
      error: ->
        if form.errors.__parse__(arguments...) is 'User Already Exists'
          form.error '''
            Forgot your password?
            Click <a href='#' class='js-forgot'>here</a>.
          '''
        else
          form.error arguments...

      success: =>
        @redirectTo "#{SHOW_PATH}/complete"
        analyticsHooks.trigger 'auth:register'

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
