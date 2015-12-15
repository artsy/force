benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
fetchLocationCarousel = require '../index'
Q = require 'bluebird-q'

describe 'fetchLocationCarousel', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    primary = [fabricate 'partner', id: 'primary', default_profile_public: true]
    secondary = [fabricate 'partner', id: 'secondary', default_profile_public: true]
    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', primary
      .returns Q.resolve primary
      .onCall 1
      .yieldsTo 'success', secondary
      .returns Q.resolve secondary
      .onCall 2
      .yieldsTo 'success', fabricate 'profile', id: 'gagosian'
      .onCall 3
      .yieldsTo 'success', [fabricate 'partner_location', city: 'Providence']

    sinon.stub $, 'get'
      .yields
        name: 'Providence'
        latitude: 41.82
        longitude: -71.41

  afterEach ->
    $.get.restore()
    Backbone.sync.restore()

  describe 'type gallery', ->

    it 'fetches nearest artsy "place", partner, profile, and partner locations with buckets', ->
      fetchLocationCarousel('gallery')
        .then ->
          $.get.args[0][0].should.equal '/geo/nearest'

          Backbone.sync.args[0][1].url
            .should.containEql '/api/v1/partners'
          Backbone.sync.args[0][2].data
            .should.eql
              near: '41.82,-71.41',
              sort: '-random_score',
              has_full_profile: true
              cache: true
              eligible_for_primary_bucket: true
              type: 'PartnerGallery'

          Backbone.sync.args[1][1].url
            .should.containEql '/api/v1/partners'
          Backbone.sync.args[1][2].data
            .should.eql
              near: '41.82,-71.41',
              sort: '-random_score',
              has_full_profile: true
              cache: true
              eligible_for_secondary_bucket: true
              type: 'PartnerGallery'

          Backbone.sync.args[2][1].url()
            .should.containEql '/api/v1/profile/gagosian'

          Backbone.sync.args[3][1].url
            .should.containEql '/api/v1/partner/primary/locations?size=20'

    it 'resolves with the data', ->
      fetchLocationCarousel('gallery')
        .then ({ category, partners }) ->
          category.get 'name'
            .should.equal 'Featured Galleries near Providence'

          partners.should.have.lengthOf 2
          partners.first().get 'name'
            .should.equal 'Gagosian Gallery'

  # describe 'type institution', ->

    it 'fetches nearest artsy "place", partner, profile, and partner locations with buckets', ->
      fetchLocationCarousel('institution')
        .then ->
          $.get.args[0][0].should.equal '/geo/nearest'

          Backbone.sync.args[0][1].url
            .should.containEql '/api/v1/partners'
          Backbone.sync.args[0][2].data
            .should.eql
              near: '41.82,-71.41',
              sort: '-random_score',
              has_full_profile: true
              cache: true
              eligible_for_primary_bucket: true
              type: 'PartnerInstitution'

          Backbone.sync.args[1][1].url
            .should.containEql '/api/v1/partners'
          Backbone.sync.args[1][2].data
            .should.eql
              near: '41.82,-71.41',
              sort: '-random_score',
              has_full_profile: true
              cache: true
              eligible_for_secondary_bucket: true
              type: 'PartnerInstitution'

          Backbone.sync.args[2][1].url()
            .should.containEql '/api/v1/profile/gagosian'

          Backbone.sync.args[3][1].url
            .should.containEql '/api/v1/partner/primary/locations?size=20'

    it 'resolves with the data', ->
      fetchLocationCarousel('institution')
        .then ({ category, partners }) ->
          category.get 'name'
            .should.equal 'Featured Institutions near Providence'

          partners.should.have.lengthOf 2
          partners.first().get 'name'
            .should.equal 'Gagosian Gallery'