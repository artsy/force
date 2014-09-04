_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork = require '../../../../../models/artwork'
PartnerLocations = require '../index'

describe 'PartnerLocations', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $('body').html """
      <div id='artwork-partner-locations'></div>
      <div id='artwork-partner-phone-container'></div>
    """
    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate 'artwork', partner: id: 'foobar'

  afterEach ->
    Backbone.sync.restore()

  describe 'without partner', ->
    it 'does nothing', ->
      @artwork.unset 'partner'
      new PartnerLocations $el: $('body'), artwork: @artwork
      Backbone.sync.called.should.be.false

  describe 'with partner', ->
    beforeEach ->
      @partnerLocations = new PartnerLocations $el: $('body'), artwork: @artwork
      @locations = @partnerLocations.locations

    it 'fetches the partner locations', ->
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/partner/foobar/locations'

    describe '#renderLocations', ->
      it 'returns an appropriate string when there are less than 3 locations', ->
        @locations.add fabricate('partner_location', city: 'New York')
        @partnerLocations.renderLocations @locations
        $('#artwork-partner-locations').text().should.eql ', New York'

      it 'returns an appropriate string when there are less than 3 locations + some duplicates', ->
        @locations.add fabricate('partner_location', city: 'New York')
        @locations.add fabricate('partner_location', city: 'New York')
        @locations.add fabricate('partner_location', city: 'Los Angeles')
        @partnerLocations.renderLocations @locations
        $('#artwork-partner-locations').text().should.eql ', New York & Los Angeles'

      it 'returns an appropriate string when there are exactly 3 locations', ->
        @locations.add fabricate('partner_location', city: 'New York')
        @locations.add fabricate('partner_location', city: 'Berlin')
        @locations.add fabricate('partner_location', city: 'Los Angeles')
        @partnerLocations.renderLocations @locations
        $('#artwork-partner-locations').text().should.eql ', New York, Berlin & Los Angeles'

      it 'returns an appropriate string when there are more than 3 locations', ->
        @locations.add fabricate('partner_location')
        @locations.add fabricate('partner_location')
        @locations.add fabricate('partner_location')
        @locations.add fabricate('partner_location')
        @partnerLocations.renderLocations @locations
        $('#artwork-partner-locations').text().should.eql ', 4 Locations'
