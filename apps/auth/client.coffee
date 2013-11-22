_               = require 'underscore'
Backbone        = require 'backbone'
mediator        = require '../../lib/mediator.coffee'
AuthModalView   = require '../../components/auth_form/view.coffee'

_.mixin(require 'underscore.string')

module.exports.AuthModalRouter = class AuthModalRouter extends Backbone.Router
  routes:
    'log_in': 'openAuth'
    'sign_up': 'openAuth'
    'forgot': 'openAuth'

  initialize: ->
    mediator.on 'modal:closed', =>
      @navigate '/', { trigger: false, replace: true }

  openAuth: ->
    unless @alreadyHasHandler()
      mode    = Backbone.history.fragment.replace(/_/g, '')
      @modal  = new AuthModalView(mode: mode, width: '900px')

  alreadyHasHandler: ->
    _.has(mediator?._events, 'open:auth') if mediator?._events?

module.exports.init = ->
  router = new AuthModalRouter

  $('.mlh-login, .mlh-signup').on 'click', (e) ->
    e.preventDefault()
    route = $(e.target).attr('href').split('/').pop()
    router.navigate route, { trigger: false, replace: true }

  Backbone.history.start(pushState: true)
