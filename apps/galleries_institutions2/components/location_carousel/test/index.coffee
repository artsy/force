benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
initLocationCarousel = benv.requireWithJadeify require.resolve('../index'), ['template']

describe 'initLocationCarousel', ->
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
    initLocationCarousel()
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

  it 'resolves a rendered $el', ->
    initLocationCarousel()
      .then ($el) ->
        $el.find('.partner-cell-carousel-header').text()
          .should.containEql 'Featured Galleries near Providence'

        $el.find('.partner-cell-name').text()
          .should.equal 'Gagosian Gallery'

        $el.find('.partner-cell-location').text()
          .should.equal 'Providence'
