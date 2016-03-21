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
