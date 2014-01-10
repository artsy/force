_               = require 'underscore'
should          = require 'should'
Backbone        = require 'backbone'
PartnerLocation = require '../../models/partner_location'

describe 'PartnerLocation', ->

  beforeEach ->
    @location = new PartnerLocation(
      id: '51df5e068b3b815b62000012'
      name: 'Location 4'
      address: '456 North Camden Drive'
      address_2: ''
      city: 'Beverly Hills'
      country: 'United States'
      state: 'CA'
      postal_code: '90201'
      phone: '1 (310) 271-9400'
      coordinates: null
      position: 4
      email: ''
      fax: ''
      publicly_viewable: true
    )

  describe '#singleLine', ->

    it 'returns city, comma, address ignoring empty vales', ->
      @location.singleLine().should.equal "#{@location.get('city')}, #{@location.get('address')}"
      @location.set 'address_2', 'Ste 227'
      @location.singleLine().should.equal "#{@location.get('city')}, #{@location.get('address')} #{@location.get('address_2')}"


  describe '#addressLines', ->

    it 'returns an array of strings for the address', ->
      @location.addressLines().should.include @location.get 'address'
      @location.addressLines().should.include @location.cityStatePostalCode()
      @location.addressLines().should.include @location.get 'country'
      @location.set 'address_2', '25th Floor'
      @location.addressLines().should.include @location.get 'address'
      @location.addressLines().should.include @location.get 'address_2'
      @location.addressLines().should.include @location.cityStatePostalCode()
      @location.addressLines().should.include @location.get 'country'

  describe '#cityState', ->
    it 'ignores blank values', ->
      @location.set 'city', ''
      @location.cityState().should.equal @location.get('state')
      @location.set { city: 'Beverly Hills', state: '' }
      @location.cityState().should.equal @location.get('city')

  describe '#cityStatePostalCode', ->

    it 'returns a string for city, state, and postal code omitting missing values', ->
      @location.cityStatePostalCode().should.equal "#{@location.get('city')}, #{@location.get('state')} #{@location.get('postal_code')}"

  describe '#toString', ->

    it 'returns a postal looking address', ->
      @location.toString().should.equal @location.addressLines().join ', '
