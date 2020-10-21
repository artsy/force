_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "../../../../v2/Components/Authentication/Types"
{ Intent, ContextModule } = require "@artsy/cohesion"

module.exports = class FooterView extends Backbone.View
  events:
    'click .mlf-specialist': 'openSpecialist'
    'click .mlf-login': 'login'
    'click .mlf-signup': 'signup'

  initialize: ->
    @listenTo mediator, 'infinite:scroll:start', @hide
    @listenTo mediator, 'infinite:scroll:end', @show

  hide: ->
    @$el.hide()

  show: ->
    @$el.show()

  signup: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.signup, {
      contextModule: ContextModule.footer
      destination: location.href
      intent: Intent.signup
    })

  login: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.login, {
      contextModule: ContextModule.footer
      destination: location.href
      intent: Intent.login
    })

