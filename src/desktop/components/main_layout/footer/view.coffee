_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
openFeedbackModal = require '../../feedback_modal/index.coffee'
openMultiPageModal = require '../../multi_page_modal/index.coffee'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "@artsy/reaction/dist/Components/Authentication/Types"
{ setupRail, shouldShowRVARail, reInitRVARail } = require '../../recently_viewed_artworks/index.coffee'

module.exports = class FooterView extends Backbone.View
  events:
    'click .mlf-feedback': 'openFeedback'
    'click .mlf-specialist': 'openSpecialist'
    'click .mlf-collector-faq': 'openCollectorModal'
    'click .mlf-auction-faq': 'openAuctionModal'
    'click .mlf-login': 'login'
    'click .mlf-signup': 'signup'

  initialize: ->
    @listenTo mediator, 'infinite:scroll:start', @hide
    @listenTo mediator, 'infinite:scroll:end', @show
    @listenTo mediator, 'openCollectorFAQModal', @openCollectorModal
    @listenTo mediator, 'openAuctionFAQModal', @openAuctionModal
    @listenTo mediator, 'openFeedbackModal', @openFeedback
    @$recentlyViewedArtworks = $('#recently-viewed-artworks')
    if shouldShowRVARail() && @$recentlyViewedArtworks.length > 0
      setupRail @$recentlyViewedArtworks
      @$('.mlf-upper').css('border', 'none')

  hide: ->
    @$el.hide()

  show: ->
    @$el.show()
    reInitRVARail(@$recentlyViewedArtworks) if shouldShowRVARail() && @$recentlyViewedArtworks.length > 0

  openFeedback: (e) ->
    e?.preventDefault()
    openFeedbackModal()

  openCollectorModal: (e) ->
    e?.preventDefault()
    openMultiPageModal 'collector-faqs'

  openAuctionModal: (e) ->
    e?.preventDefault()
    openMultiPageModal 'auction-faqs'

  signup: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.signup, {
      contextModule: 'Footer'
      destination: location.href
      intent: 'signup'
    })

  login: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.login, {
      contextModule: 'Footer'
      destination: location.href
      intent: 'signup'
    })

