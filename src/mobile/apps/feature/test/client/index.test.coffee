Backbone = require 'backbone'
sinon = require 'sinon'
_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
Feature = require '../../../../models/feature'
Sale = require '../../../../models/sale'
Artworks = require '../../../../collections/artworks'
Videos = require '../../../../collections/videos'
FeaturedLinks = require '../../../../collections/featured_links'
SaleArtwork = require '../../../../models/sale_artwork'
CurrentUser = require '../../../../models/current_user.coffee'
benv = require 'benv'
{ resolve } = require 'path'

xdescribe 'Feature page client-side code', ->
  # FIXME: errors setting up due to react-flickity jquery errors
  # Uncaught TypeError: Cannot set property 'imagesLoaded' of undefined
  beforeEach (done) ->
    benv.setup =>
      benv.expose {
        $: benv.require 'jquery'
        jQuery: require 'jquery'
        matchMedia: () ->
          media: ""
          matches: false
          addListener: () -> null
          removeListener: () -> null
      }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/page.jade'), {
        feature: new Feature fabricate 'feature'
        sd: { API_URL: 'foo/bar' }
      }, =>
        { @FeatureView, @init } = benv.requireWithJadeify resolve(__dirname, '../../client'), [
            'artworkListTemplate'
            'featuredItemsTemplate'
            'itemsTemplate'
            'auctionArtworksTemplate'
            'videoTemplate'
            'auctionDetailTemplate'
          ]
        @view = new @FeatureView
          el: $ 'body'
          model: new Feature fabricate 'feature',
            sale: new Sale(fabricate 'sale', is_auction: true)
            start_at: new Date(2000,1,1).getTime()
            end_at: new Date(3000,1,1).getTime()
          user: new CurrentUser fabricate 'user'
        @view.sale = @view.model.get('sale')
        @view.sets = new FeaturedLinks([
          {
            type: 'featured link'
            title: 'Featured Link 1'
          }
          {
            type: 'featured link'
            title: 'Featured Link 2'
          }
          {
            type: 'artworks'
            title: 'Some Artworks!'
            data: new Artworks [fabricate 'artwork',
              sale_artwork: fabricate 'sale_artwork', display_low_estimate_dollars: '$3,000', display_high_estimate_dollars: '$7,000'
            ]
          }
          {
            type: 'video'
            title: 'Cat videos!'
            data: new Videos [ fabricate 'video' ]
          }
        ]).models
        @view.render()
        @view.doneFetchingSaleArtworks()
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#init', ->

    it 'renders the featured content', ->
      @init()
      _.last(Backbone.sync.args)[2].success([fabricate 'set', display_on_martsy: true])
      _.last(Backbone.sync.args)[2].success([
        fabricate 'featured_link', title: 'Featured link for this awesome page', display_on_martsy: true
      ])
      _.last(Backbone.sync.args)[2].success([])
      $('#feature-page-items').html().should.containEql 'Featured link for this awesome page'

  describe 'FeatureView', ->

    describe 'open', ->

      beforeEach ->
        @view.sale.set
          auction_state: 'open'

      it 'does not render the register button if you are not registered', ->
        @view.user.registeredForAuction = (id, options = {}) -> options.success false
        @view.renderAuction()
        @view.$('#feature-page-auction-clock').prop('class').should.not.containEql('feature-auction-section-unregistered')
        @view.$('#feature-page-auction-register-link').prop('href').should.not.containEql 'auction-registration/whtney-art-party'

      it 'does not render the register button if you are logged out', ->
        @view.renderAuction()
        _.last(Backbone.sync.args)[2].error { responseText: "A user is required" }
        @view.$('#feature-page-auction-clock').prop('class').should.not.containEql('feature-auction-section-unregistered')
        @view.$('#feature-page-auction-register-link').prop('href').should.not.containEql 'auction-registration/whtney-art-party'

    describe '#renderAuction', ->

      beforeEach ->
        @view.renderAuction()

      it 'truncates to the first item and the artworks in the sale', ->
        @view.$el.html().should.not.containEql 'Featured link 2'

      it 'renames the artworks title', ->
        @view.$el.html().should.not.containEql 'Some Artworks!'
        @view.$el.html().should.containEql 'Works for bidding'

      it 'displays the artwork estimate', ->
        @view.$('.aali-estimate').text().should.containEql 'Estimate: $3,000–$7,000'

      it 'displays the bid related links', ->
        @view.$('#feature-page-auction-register-link').should.have.lengthOf 1
        @view.$('#feature-page-auction-bidding-information-link').should.have.lengthOf 1

      describe 'preview', ->
        beforeEach ->
          @view.sale.set
            auction_state: 'preview'

        it 'does not inject the auction register button if you are registered', ->
          @view.user.registeredForAuction = (id, options = {}) -> options.success true
          @view.renderAuction()

          @view.$('#feature-page-auction-clock').prop('class').should.not.containEql('feature-auction-section-unregistered')
          @view.$('#feature-page-auction-register-link').prop('href').should.not.containEql 'auction-registration/whtney-art-party'

        it 'injects the auction register link if you are not registered', ->
          @view.user.registeredForAuction = (id, options = {}) -> options.success false
          @view.renderAuction()
          @view.$('#feature-page-auction-clock').prop('class').should.containEql('feature-auction-section-unregistered')
          @view.$('#feature-page-auction-register-link').prop('href')
            .should.containEql 'auction-registration/whtney-art-party'

        it 'renders the link to register if the user is logged out', ->
          @view.renderAuction()
          _.last(Backbone.sync.args)[2].error { responseText: "A user is required" }
          @view.$('#feature-page-auction-register-link').prop('href')
            .should.containEql 'auction-registration/whtney-art-party'

      describe 'isAuctionPromo', ->
        beforeEach ->
          @view.sale.set 'sale_type', 'auction promo'
          @view.renderAuction()

        it 'does not display the bid related links', ->
          @view.$('#feature-page-auction-register-link').should.have.lengthOf 0
          @view.$('#feature-page-auction-bidding-information-link').should.have.lengthOf 0

    describe '#renderItems', ->

      it 'renders artworks as auction items', ->
        @view.sets[2].get('data').first().set title: 'Foo to the bar'
        @view.renderItems()
        @view.$('.auction-artwork-list').html().should.containEql 'Foo to the bar'

      it 'render Video item types in html5 video and includes a poster image', ->
        @view.renderItems()
        @view.$el.find('video').length.should.be.ok()
        @view.$el.find('video').attr('poster').length.should.be.ok()

      it 'renders featured links in converted markdown'
