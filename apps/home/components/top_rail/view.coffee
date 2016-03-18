Q = require 'bluebird-q'
metaphysics = require '../../../../lib/metaphysics.coffee'
Backbone = require 'backbone'
SaveControls = require '../../../../components/artwork_item/save_controls.coffee'
myActiveBidsQuery = require '../../../../components/my_active_bids/query.coffee'
FeaturedArtworks = require './collection.coffee'
User = require '../../../../models/user.coffee'
ArtworkInquiry = require '../../../../models/artwork_inquiry.coffee'
openInquiryQuestionnaireFor = require '../../../../components/inquiry_questionnaire/index.coffee'
template = -> require('./template.jade') arguments...

module.exports = class HomeTopRailView extends Backbone.View
  events:
    'click .js-artwork-item-contact-seller': 'contactGallery'

  initialize: ({ @user }) ->
    @collection = new FeaturedArtworks [], user: @user
    @fetchAndRender()

  attachSaveControls: (artwork) =>
    $el = @$("figure[data-artwork=#{artwork.id}]").find('.overlay-container')
    return unless $el?.length
    new SaveControls
      el: $el
      artworkCollection: @savedArtworks
      model: artwork

  contactGallery: (e)->
    e.stopPropagation()
    e.preventDefault()

    user = User.instantiate()

    analyticsHooks.trigger 'artwork-item:clicked-contact', e

    inquiry = new ArtworkInquiry notification_delay: @delayBy
    artwork = @collection.get $(e.currentTarget).data 'id'

    if artwork
      openInquiryQuestionnaireFor
        user: user
        artwork: artwork
        inquiry: inquiry

  syncArtworks: ->
    @user?.initializeDefaultArtworkCollection()
    @savedArtworks = @user?.defaultArtworkCollection()
    @collection.map @attachSaveControls
    @savedArtworks?.addRepoArtworks @collection
    @savedArtworks?.syncSavedArtworks()

  fetchAndRender: ->
    promises = [@collection.fetch()]
    if @user
      promises.push(
        metaphysics(query: myActiveBidsQuery, req: user: @user)
          .catch(-> me: bidder_positions: [])
      )
    Q.all(promises).then ([c, data]) =>
      @syncArtworks()
      @$el.html template
        artworks: @collection
        myActiveBids: data.me.bidder_positions if @user
