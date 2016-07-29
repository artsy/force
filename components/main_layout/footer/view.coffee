_ = require 'underscore'
Backbone = require 'backbone'
openFeedbackModal = require '../../feedback_modal/index.coffee'
mediator = require '../../../lib/mediator.coffee'
{ setupRail, shouldShowRVARail, reInitRVARail } = require '../../recently_viewed_artworks/index.coffee'

module.exports = class FooterView extends Backbone.View
  events:
    'click .mlf-feedback': 'openFeedback'
    'click .mlf-specialist': 'openSpecialist'

  initialize: ->
    @listenTo mediator, 'infinite:scroll:start', @hide
    @listenTo mediator, 'infinite:scroll:end', @show
    @$recentlyViewedArtworks = $('#recently-viewed-artworks')

    if shouldShowRVARail()
      setupRail @$recentlyViewedArtworks
      @$('.mlf-upper').css('border', 'none')

  hide: ->
    @$el.hide()

  show: ->
    @$el.show()
    reInitRVARail(@$recentlyViewedArtworks) if shouldShowRVARail()

  openFeedback: (e) ->
    e.preventDefault()
    openFeedbackModal()
