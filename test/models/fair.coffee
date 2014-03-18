_             = require 'underscore'
{ fabricate } = require 'antigravity'
sinon         = require 'sinon'
should        = require 'should'
Backbone      = require 'backbone'
Fair          = require '../../models/fair'

describe 'Fair', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @fair = new Fair fabricate('fair')

  afterEach ->
    Backbone.sync.restore()

  describe '#href', ->

    it "returns the client link to this fair", ->
      @fair.href().should.equal "/#{@fair.get('organizer').profile_id}"

  describe '#fetchShowForPartner', ->

    it 'handles api resposne', (done) ->
      show = fabricate('show')
      @fair.fetchShowForPartner 'partner-id',
        success: (fetchedShow) ->
          fetchedShow.id.should.equal show.id
          done()

      Backbone.sync.args[0][2].success [
        results: [show]
        next: 'foo'
      ]

  describe '#fetchOverviewData', ->

    it 'fetches a ton of data in parallel for the fair page', ->
      @fair.fetchOverviewData({})
      _.last(Backbone.sync.args)[2].success new Backbone.Model fabricate 'profile'
      urls = (_.result(call[1], 'url') or call[2].url for call in Backbone.sync.args)
      urls[0].should.match /// api/v1/fair/.* ///
      urls[1].should.match /// api/v1/profile ///
      urls[2].should.match /// api/v1/search/filtered/fair/.*/suggest ///
      urls[3].should.match /// api/v1/sets ///
      urls[4].should.match /// api/v1/fair/.*/sections ///
      urls[5].should.match /// api/v1/fair/.*/partners ///
      urls[6].should.match /// api/v1/fair/.*/artists ///