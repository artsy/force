urlParser = require 'url'
sinon = require 'sinon'
Backbone = require 'backbone'
Partner = require '../../models/partner'
PartnerLocations = require '../../collections/partner_locations'
Artist = require '../../models/artist'
{ fabricate } = require '@artsy/antigravity'

describe 'Partner', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @partner = new Partner fabricate 'partner'
    @partner.set 'email', "info@gagosian.com"

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchLocations', ->

    it 'fetches locations', ->
      @partner.set(id: 'moobar').fetchLocations()
      Backbone.sync.args[0][1].url().should.containEql 'partner/moobar/locations'

  describe "#fetchArtistGroups", ->

    it 'fetches the partners artists and groups them in represented/unreped, taking image info from the partner artist relation', (done) ->
      @partner.fetchArtistGroups success: (represented, unrepresented) ->
        represented.length.should.equal 2
        unrepresented.length.should.equal 1
        unrepresented.models[0].get('image_versions')[0].should.equal 'tiny'
        unrepresented.models[0].get('image_url').should.equal 'bitty.jpg'
        done()
      Backbone.sync.args[0][2].success [
        { artist: fabricate('artist'), represented_by: true }
        { artist: fabricate('artist'), represented_by: true }
        { artist: fabricate('artist'), represented_by: false, image_versions: ['tiny'], image_url: 'bitty.jpg', published_artworks_count: 0 }
        { artist: fabricate('artist'), represented_by: false, image_versions: ['tiny'], image_url: 'bitty.jpg', published_artworks_count: 1 }
      ]
      Backbone.sync.args[0][2].success []

    it 'only returns unrepresented artists with published works', (done) ->
      @partner.fetchArtistGroups success: (represented, unrepresented) ->
        unrepresented.length.should.equal 1
        unrepresented.models[0].get('name').should.equal 'artist with published works'
        unrepresented.where(name: 'artist without published works').should.have.lengthOf 0
        done()
      Backbone.sync.args[0][2].success [
        { artist: fabricate('artist'), represented_by: true }
        { artist: fabricate('artist', name: 'artist with published works'), published_artworks_count: 2, represented_by: false }
        { artist: fabricate('artist', name: 'artist without published works'), published_artworks_count: 0, represented_by: false }
      ]
      Backbone.sync.args[0][2].success []

    it 'requests partner artists that have not been explicity hidden from the profile', ->
      @partner.fetchArtistGroups success: (represented, unrepresented) -> done()
      Backbone.sync.args[0][2].data.display_on_partner_profile.should.equal 1

  describe '#fetchFeaturedShow', ->

    it 'fetches the partners shows and returns one that is featured', (done) ->
      @partner.fetchFeaturedShow success: (show) ->
        show.get('id').should.equal 'bitty'
        done()
      featuredShow = fabricate 'show', id: 'bitty', featured: true
      unfeaturedShow = fabricate 'show', id: 'some-other-cat', featured: false
      Backbone.sync.args[0][2].success [ featuredShow, unfeaturedShow ]
      Backbone.sync.args[0][2].success []

  describe '#setEmailFromLocations', ->

    beforeEach ->
      @partnerLocations = new PartnerLocations [fabricate 'partner_location']

    it 'does nothing if the partner has an email address set already', ->
      email = @partner.get 'email'
      @partner.setEmailFromLocations @partnerLocations
      @partner.get('email').should.equal email

    it 'sets the first locations email address to a partner', ->
      @partner.set 'email', ''
      @partner.setEmailFromLocations @partnerLocations
      @partner.get('email').should.equal @partnerLocations.first().get 'email'

  describe '#getMailTo', ->

    beforeEach ->
      @mailto = urlParser.parse @partner.getMailTo()

    it 'returns an email link', ->
      @mailto.href.should.containEql "mailto:"

    it 'ignores a emails for non gallery partners', ->
      @partner.set 'type', 'Institution'
      @partner.getMailTo().should.equal ''

    it 'includes artsy in the CC field', ->
      @mailto.query.should.containEql "cc=inquiries@artsy.net"

    it 'populates the subject field', ->
      @mailto.query.should.containEql 'subject='
      @mailto.query.should.containEql encodeURIComponent("Connecting with #{@partner.get('name')} via Artsy")

  describe '#getSimpleWebsite', ->

    it 'removes "http://" and trailing slashes', ->
      @partner.set 'website', "http://www.lacma.org/"
      @partner.getSimpleWebsite().should == "www.lacma.org"

  describe '#artistFromPartnerArtist', ->

    it 'creates an artist model from the partner artist relationship, copying over the image info', ->
      partnerArtist = new Backbone.Model artist: fabricate('artist', name: 'Bitty'), represented_by: false, image_versions: ['tiny'], image_url: 'bitty.jpg'
      artist = @partner.artistFromPartnerArtist(partnerArtist)
      artist.get('name').should.equal 'Bitty'
      artist.get('image_versions').length.should.equal 1
      artist.get('image_versions')[0].should.equal 'tiny'
      artist.get('image_url').should.equal 'bitty.jpg'

    it 'doesnt copy over image info when not included in the partner artist', ->
      partnerArtist = new Backbone.Model artist: fabricate('artist', name: 'Bitty'), represented_by: false, image_versions: null, image_url: 'bitty.jpg'
      artist = @partner.artistFromPartnerArtist(partnerArtist)
      artist.get('name').should.equal 'Bitty'
      artist.get('image_versions')?.should.not.be.ok()
      artist.get('image_url').should.not.equal 'bitty.jpg'
