_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
{ fabricate } = require '@artsy/antigravity'
Artwork = require '../../../models/artwork.coffee'
PartnerLocations = rewire '../index'
PartnerPhoneNumberView = benv.requireWithJadeify require.resolve('../../partner_phone_number/view.coffee'), [
  'template'
]

describe 'PartnerLocations', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $('body').html """
      <div class='artwork-partner-locations'></div>
      <div class='artwork-partner-phone-container'></div>
    """

    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate 'artwork', partner: id: 'foobar'

    PartnerLocations.__set__ 'PartnerPhoneNumberView', PartnerPhoneNumberView

  afterEach ->
    Backbone.sync.restore()

  describe 'without partner', ->
    it 'does nothing', ->
      @artwork.unset 'partner'
      new PartnerLocations $el: $('body'), artwork: @artwork
      Backbone.sync.called.should.be.false()

  describe 'with partner', ->
    beforeEach ->
      @partnerLocations = new PartnerLocations $el: $('body'), artwork: @artwork
      @locations = @partnerLocations.locations

    it 'fetches the partner locations', ->
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/partner/foobar/locations'

    describe 'in an auction promo', ->
      before ->
        sinon.stub(@artwork, "isPartOfAuctionPromo").returns(true)

      after ->
        sinon.restore(@artwork, "isPartOfAuctionPromo")

      it '#setupPhoneNumbers does not render phone number', ->
        @partnerLocations.setupPhoneNumbers()
        $('.artwork-partner-phone-container').text().should.eql ''

    describe 'for sale in a normal auction', ->
      it '#setupPhoneNumbers should render phone number', ->
        @artwork.set forsale: true, acquireable: false
        @locations.add fabricate('partner_location', city: 'New York', phone: '(713) 666-1216')
        @partnerLocations.setupPhoneNumbers @locations
        @locations.trigger 'sync'
        $('.artwork-partner-phone-container').text().should.containEql '(713) 666-1216'

    describe '#renderLocations', ->
      it 'returns an appropriate string when there are less than 3 locations', ->
        @locations.add fabricate('partner_location', city: 'New York')
        @partnerLocations.renderLocations @locations
        $('.artwork-partner-locations').text().should.eql ', New York'

      it 'returns an appropriate string when there are less than 3 locations + some duplicates', ->
        @locations.add fabricate('partner_location', city: 'New York')
        @locations.add fabricate('partner_location', city: 'New York')
        @locations.add fabricate('partner_location', city: 'Los Angeles')
        @partnerLocations.renderLocations @locations
        $('.artwork-partner-locations').text().should.eql ', New York & Los Angeles'

      it 'returns an appropriate string when there are exactly 3 locations', ->
        @locations.add fabricate('partner_location', city: 'New York')
        @locations.add fabricate('partner_location', city: 'Berlin')
        @locations.add fabricate('partner_location', city: 'Los Angeles')
        @partnerLocations.renderLocations @locations
        $('.artwork-partner-locations').text().should.eql ', New York, Berlin & Los Angeles'

      it 'returns an appropriate string when there are more than 3 locations', ->
        @locations.add fabricate('partner_location')
        @locations.add fabricate('partner_location')
        @locations.add fabricate('partner_location')
        @locations.add fabricate('partner_location')
        @partnerLocations.renderLocations @locations
        $('.artwork-partner-locations').text().should.eql ', 4 Locations'
