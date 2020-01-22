_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
Artworks = require '../../../../collections/artworks.coffee'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
fixtures = require '../../../../test/helpers/fixtures'

{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'PartnerRouter', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      @PartnerRouter = benv.require resolve(__dirname, '../../client/router.coffee')
      done()

  after ->
    benv.teardown()

  describe 'filterArtworks', ->
    beforeEach (done) ->
      sinon.stub Backbone, 'sync'

      @profile = new Profile fabricate 'partner_profile'

      benv.render resolve(__dirname, '../../templates/index.jade'), {
        sd: {}
        profile: @profile
        asset: (->)
        params: {}
      }, =>
        stubChildClasses @PartnerRouter, this, ['PartnerView'], ['renderSection']
        done()

    afterEach ->
      Backbone.sync.restore()

    it 'renders correct section with parameters', ->
      @router = new @PartnerRouter { profile: @profile, partner: @profile.related().owner }

      settings = {
        'aggregations': ['dimension_range', 'medium', 'price_range', 'total', 'for_sale']
        'forSale': false
        'hideForSaleButton': false
        'filterRoot': '/partner-id/section-id'
      }

      @router.filterArtworks 'section-name', settings
      counts = fixtures.counts

      Backbone.sync.args[0][2].success aggregations: counts

      @router.baseView.renderSection.called.should.be.ok()
      @router.baseView.renderSection.args[0][0].should.equal 'section-name'
      @router.baseView.renderSection.args[0][1].aggregations.should.equal settings.aggregations
      @router.baseView.renderSection.args[0][1].forSale.should.equal settings.forSale
      @router.baseView.renderSection.args[0][1].hideForSaleButton.should.equal settings.hideForSaleButton
      @router.baseView.renderSection.args[0][1].filterRoot.should.equal settings.filterRoot
