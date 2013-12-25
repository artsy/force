sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
Artwork = require '../../models/artwork'
{ fabricate } = require 'antigravity'

describe 'Artwork', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate 'artwork'

  afterEach ->
    Backbone.sync.restore()

  describe '#defaultImageUrl', ->

    it 'returns the first medium image url by default', ->
      @artwork.defaultImageUrl().should.match(
        /// /local/additional_images/.*/medium.jpg ///
      )

    it 'works if there are no images', ->
      @artwork.set images: []
      @artwork.defaultImageUrl().should.equal ''

  describe '#titleAndYear', ->

    it 'returns empty string without title or year', ->
      @artwork.set title: false, date: false
      @artwork.titleAndYear().should.equal ''

    it 'renderes correctly with just a date', ->
      @artwork.set title: false, date: '1905'
      @artwork.titleAndYear().should.equal '1905'

    it 'emphasises the title', ->
      @artwork.set title: 'title', date: '1905'
      @artwork.titleAndYear().should.equal '<em>title</em>, 1905'

  describe '#partnerName', ->

    it "collecting institution over partner name", ->
      @artwork.set partner: fabricate 'partner'
      @artwork.set collecting_institution: 'collecting'
      @artwork.partnerName().should.equal 'collecting'

    it "nothing without partner name or collecting institution", ->
      @artwork.unset 'partner'
      @artwork.unset 'collecting_institution'
      @artwork.partnerName().should.equal ''

    it "partner name", ->
      @artwork.set partner: fabricate 'partner'
      @artwork.unset 'collecting_institution'
      @artwork.partnerName().should.equal 'Gagosian Gallery'

  describe '#partnerLink', ->

    it "empty without partner", ->
      @artwork.unset 'partner'
      should.strictEqual(undefined, @artwork.partnerLink())

    it "partner profile", ->
      @artwork.get('partner').default_profile_public = true
      @artwork.get('partner').default_profile_id = 'profile-id'
      @artwork.partnerLink().should.equal '/profile-id'

    it "partner website if profile and profile is private", ->
      @artwork.get('partner').default_profile_public = false
      @artwork.get('partner').default_profile_id = 'profile-id'
      @artwork.get('partner').website = 'mah-website.com'
      @artwork.partnerLink().should.equal 'mah-website.com'

  describe '#toAltText', ->

    it "Includes title, date and artist name", ->
      @artwork.toAltText().should.equal "Skull, 1999, by Andy Warhol"

    it "Works without title, date and artist name", ->
      @artwork.set
        artist: undefined
        date: undefined
        title: undefined
      @artwork.toAltText().should.equal ""
