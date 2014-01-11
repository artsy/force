_               = require 'underscore'
should          = require 'should'
Backbone        = require 'backbone'
PartnerLocation = require '../../models/partner_location'

describe 'PartnerLocation', ->

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


  describe '#singleLine', ->

    it "formats location on a single line", ->
      @partnerLocation.singleLine().should.equal 'City, Address'
      @partnerLocationMissingInfo.set 'city', ''
      @partnerLocationMissingInfo.singleLine().should.equal 'Address'
      @partnerLocation.singleLine().should.equal "#{@partnerLocation.get('city')}, #{@partnerLocation.get('address')}"
      @partnerLocation.set 'address_2', 'Ste 227'
      @partnerLocation.singleLine().should.equal "#{@partnerLocation.get('city')}, #{@partnerLocation.get('address')} #{@partnerLocation.get('address_2')}"

  describe '#lines', ->

    it 'returns an array of strings for the address', ->
      @partnerLocation.lines().should.include @partnerLocation.get 'address'
      @partnerLocation.lines().should.include @partnerLocation.cityStatePostalCode()
      @partnerLocation.set
        address_2: '25th Floor'
        country: 'USA'
      @partnerLocation.lines().should.include @partnerLocation.get 'address'
      @partnerLocation.lines().should.include @partnerLocation.get 'address_2'
      @partnerLocation.lines().should.include @partnerLocation.cityStatePostalCode()
      @partnerLocation.lines().should.include @partnerLocation.get 'country'

  describe '#cityState', ->

    it 'ignores blank values', ->
      @partnerLocation.set 'city', ''
      @partnerLocation.cityState().should.equal @partnerLocation.get('state')
      @partnerLocation.set { city: 'Beverly Hills', state: '' }
      @partnerLocation.cityState().should.equal @partnerLocation.get('city')

  describe '#cityStatePostalCode', ->

    it 'returns a string for city, state, and postal code omitting missing values', ->
      pl = @partnerLocation
      pl.cityStatePostalCode().should.equal "#{pl.get('city')}, #{pl.get('state')} #{pl.get('postal_code')}"

  describe '#displayName', ->

    it 'Formatted displayName', ->
      @partnerLocation.displayName().should.equal 'Partner Location'
      @partnerLocationMissingInfo.displayName().should.equal 'Partner Location'

  describe '#displayAddress', ->

    it 'Formats address', ->
      @partnerLocation.displayAddress().should.equal 'Address, City, State 00000'
      @partnerLocationMissingInfo.displayAddress().should.equal 'Address, City'

  describe '#toHtml', ->

    it "Correctly formats as html", ->
      @partnerLocation.toHtml().should.equal 'Address<br/>City, State 00000<br/>Tel: 555-555-5555'
      @partnerLocationMissingInfo.toHtml().should.equal 'Address<br/>City'
