_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "../../../../v2/Components/Authentication/Types"
{ setupRail, shouldShowRVARail, reInitRVARail } = require '../../recently_viewed_artworks/index.coffee'
{ Intent, ContextModule } = require "@artsy/cohesion"

module.exports = class FooterView extends Backbone.View
  events:
    'click .mlf-specialist': 'openSpecialist'
    'click .mlf-login': 'login'
    'click .mlf-signup': 'signup'

  initialize: ->
    @listenTo mediator, 'infinite:scroll:start', @hide
    @listenTo mediator, 'infinite:scroll:end', @show
    @$recentlyViewedArtworks = $('#recently-viewed-artworks')
    if shouldShowRVARail() && @$recentlyViewedArtworks.length > 0
      setupRail @$recentlyViewedArtworks
      @$('.mlf-upper').css('border', 'none')

  hide: ->
    @$el.hide()

  show: ->
    @$el.show()
    reInitRVARail(@$recentlyViewedArtworks) if shouldShowRVARail() && @$recentlyViewedArtworks.length > 0

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

