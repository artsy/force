_ = require 'underscore'
Backbone = require 'backbone'
openFeedbackModal = require '../../feedback_modal/index.coffee'
openMultiPageModal = require '../../multi_page_modal/index.coffee'
mediator = require '../../../lib/mediator.coffee'
{ setupRail, shouldShowRVARail, reInitRVARail } = require '../../recently_viewed_artworks/index.coffee'

module.exports = class FooterView extends Backbone.View
  events:
    'click .mlf-feedback': 'openFeedback'
    'click .mlf-specialist': 'openSpecialist'
    'click .mlf-collector-faq': 'openCollectorModal'
    'click .mlf-auction-faq': 'openAuctionModal'
    'click .mlf-login': 'login'
    'click .mlf-signup': 'signup'
    'mouseover .mlf-icon-wechat': 'showWeChatQrCode'
    'mouseout .mlf-icon-wechat': 'hideWeChatQrCode'

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

  openFeedback: (e) ->
    e.preventDefault()
    openFeedbackModal()

  openCollectorModal: (e) ->
    e.preventDefault()
    openMultiPageModal 'collector-faqs'

  openAuctionModal: (e) ->
    e.preventDefault()
    openMultiPageModal 'auction-faqs'

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'signup'

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'login'

  showWeChatQrCode: (e) ->
    e.preventDefault()
    $('.mlf-wechat-qr-code-container').css('display', 'flex')

  hideWeChatQrCode: (e) ->
    e.preventDefault()
    $('.mlf-wechat-qr-code-container').css('display', 'none')
