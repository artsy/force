benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
rewire = require 'rewire'
fetchLocationCarousel = rewire '../index'
Q = require 'bluebird-q'

describe 'fetchLocationCarousel', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    data = {
      primary: [fabricate 'partner', id: 'primary', default_profile_public: true]
      secondary: [fabricate 'partner', id: 'secondary', default_profile_public: true]
    }
    sinon.stub $, 'get'
      .yields
        name: 'Providence'
        latitude: 41.82
        longitude: -71.41

    @metaphysics = sinon.stub()
    fetchLocationCarousel.__set__ 'metaphysics', @metaphysics
    @metaphysics.returns Q.promise (resolve, reject) -> resolve data

  afterEach ->
    $.get.restore()

  describe 'type gallery', ->

    it 'fetches location and primary and secondary buckets', ->
      fetchLocationCarousel('gallery').then =>
        $.get.args[0][0].should.equal '/geo/nearest'
        @metaphysics.args[0][0].query.should.containEql(
          'primary: partners(eligible_for_listing: true, eligible_for_primary_bucket: true, sort: RANDOM_SCORE_DESC, default_profile_public: true, near: $near, type: $type)')
        @metaphysics.args[0][0].query.should.containEql(
          'secondary: partners(eligible_for_listing: true, eligible_for_secondary_bucket: true, sort: RANDOM_SCORE_DESC, default_profile_public: true, near: $near, type: $type)')

    it 'fetches with correct variables', ->
      fetchLocationCarousel('gallery').then =>
        $.get.args[0][0].should.equal '/geo/nearest'
        @metaphysics.args[0][0].variables.should.deepEqual {
          near: '41.82,-71.41'
          type: ['GALLERY']
        }

    it 'resolves with the data', ->
      fetchLocationCarousel('gallery').then (category) =>
        category.name.should.equal 'Featured Galleries near Providence'
        category.partners.should.have.lengthOf 2
        category.partners[0].name.should.equal 'Gagosian Gallery'

  describe 'type institution', ->
    it 'fetches location and primary and secondary buckets', ->
      fetchLocationCarousel('gallery').then =>
        $.get.args[0][0].should.equal '/geo/nearest'
        @metaphysics.args[0][0].query.should.containEql(
          'primary: partners(eligible_for_listing: true, eligible_for_primary_bucket: true, sort: RANDOM_SCORE_DESC, default_profile_public: true, near: $near, type: $type)')
        @metaphysics.args[0][0].query.should.containEql(
          'secondary: partners(eligible_for_listing: true, eligible_for_secondary_bucket: true, sort: RANDOM_SCORE_DESC, default_profile_public: true, near: $near, type: $type)')

    it 'fetches with correct variables', ->
      fetchLocationCarousel('institution').then =>
        $.get.args[0][0].should.equal '/geo/nearest'
        @metaphysics.args[0][0].variables.should.deepEqual {
          near: '41.82,-71.41'
          type: ['INSTITUTION', 'INSTITUTIONAL_SELLER']
        }

    it 'resolves with the data', ->
      fetchLocationCarousel('institution').then (category) =>
        category.name.should.equal 'Featured Institutions near Providence'
        category.partners.should.have.lengthOf 2
        category.partners[0].name.should.equal 'Gagosian Gallery'
