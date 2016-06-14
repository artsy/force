Q = require 'bluebird-q'
Backbone = require 'backbone'
SaveControls = require '../../../../components/artwork_item/save_controls.coffee'
FeaturedArtworks = require './collection.coffee'
User = require '../../../../models/user.coffee'
ArtworkInquiry = require '../../../../models/artwork_inquiry.coffee'
openInquiryQuestionnaireFor = require '../../../../components/inquiry_questionnaire/index.coffee'
template = -> require('./template.jade') arguments...
MyActiveBids = require '../../../../components/my_active_bids/view.coffee'

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
      context_page: 'Home page'
      context_module: 'Home top rail module'

  syncArtworks: ->
    @user?.initializeDefaultArtworkCollection()
    @savedArtworks = @user?.defaultArtworkCollection()
    @collection.map @attachSaveControls
    @savedArtworks?.addRepoArtworks @collection
    @savedArtworks?.syncSavedArtworks()

  fetchAndRender: ->
    promises = [@collection.fetch()]
    if @user
      mabView = new MyActiveBids(user: @user)
      promises.push mabView.fetch()
    Q.all(promises).then ([c, data]) =>
      @$el.html template
        artworks: @collection
        activeBids: activeBids = mabView?.bidderPositions.length
      @syncArtworks()
      if activeBids
        mabView.$el = @$('.home-top-rail-right-mab')
        mabView.render().poll()
