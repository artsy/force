benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
fetchLocationCarousel = require '../index'

describe 'fetchLocationCarousel', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub $, 'get'
      .yields
        name: 'Providence'
        latitude: 41.82
        longitude: -71.41

    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', [fabricate 'partner', id: 'gagosian']
      .onCall 1
      .yieldsTo 'success', fabricate 'profile', id: 'gagosian'
      .onCall 2
      .yieldsTo 'success', [fabricate 'partner_location', city: 'Providence']

  afterEach ->
    $.get.restore()
    Backbone.sync.restore()

  it 'fetches nearest artsy "place", partner, profile, and partner locations', ->
    fetchLocationCarousel()
      .then ->
        $.get.args[0][0].should.equal '/geo/nearest'

        Backbone.sync.args[0][1].url
          .should.containEql '/api/v1/partners'
        Backbone.sync.args[0][2].data
          .should.eql near: '41.82,-71.41', sort: '-random_score', size: 6

        Backbone.sync.args[1][1].url()
          .should.containEql '/api/v1/profile/gagosian'

        Backbone.sync.args[2][1].url
          .should.containEql '/api/v1/partner/gagosian/locations?size=20'

  it 'resolves with the data', ->
    fetchLocationCarousel()
      .then ({ category, partners }) ->
        category.get 'name'
          .should.equal 'Featured Galleries near Providence'

        partners.should.have.lengthOf 1
        partners.first().get 'name'
          .should.equal 'Gagosian Gallery'
