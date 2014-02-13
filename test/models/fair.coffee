_             = require 'underscore'
{ fabricate } = require 'antigravity'
sinon         = require 'sinon'
should        = require 'should'
Backbone      = require 'backbone'
Fair          = require '../../models/fair'

describe 'Fair', ->

  before ->
    @fair = new Fair fabricate('fair')

  describe '#href', ->

    it "returns the client link to this fair", ->
      @fair.href().should.equal "/#{@fair.get('organizer').profile_id}"

  describe '#fetchShowForPartner', ->

    beforeEach ->
      sinon.stub Backbone, 'sync'

    afterEach ->
      Backbone.sync.restore()

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
