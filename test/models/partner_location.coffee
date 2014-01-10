_               = require 'underscore'
should          = require 'should'
Backbone        = require 'backbone'
PartnerLocation = require '../../models/partner_location'

describe "PartnerLocation", ->

  beforeEach ->
    @partnerLocation = new PartnerLocation
      id: 'partner-location'
      name: 'Partner Location'
      city: 'City'
      address: 'Address'
      state: 'State'
      postal_code: '00000'
      phone: '555-555-5555'
    @partnerLocationMissingInfo = new PartnerLocation
      id: 'partner-location'
      name: 'Partner Location'
      city: 'City'
      address: 'Address'

  describe '#displayName', ->

    it 'Formatted displayName', ->
      @partnerLocation.displayName().should.equal 'Partner Location'
      @partnerLocationMissingInfo.displayName().should.equal 'Partner Location'

  describe '#displayAddress', ->

    it 'Formats address', ->
      @partnerLocation.displayAddress().should.equal 'Address, City, State 00000'
      @partnerLocationMissingInfo.displayAddress().should.equal 'Address, City'

  describe '#singleLine', ->

    it "formats location on a single line", ->
      @partnerLocation.singleLine().should.equal 'City, Address'
      @partnerLocationMissingInfo.singleLine().should.equal 'City, Address'

  describe '#toHtml', ->

    it "Correctly formats as html", ->
      @partnerLocation.toHtml().should.equal 'Address<br/>City, State 00000<br/>Tel: 555-555-5555'
      @partnerLocationMissingInfo.toHtml().should.equal 'Address<br/>City'
