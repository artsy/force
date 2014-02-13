_             = require 'underscore'
{ fabricate } = require 'antigravity'
should        = require 'should'
Backbone      = require 'backbone'
Fair          = require '../../models/fair'

describe 'Fair', ->

  before ->
    @fair = new Fair fabricate('fair')

  describe '#href', ->

    it "returns the client link to this fair", ->
      @fair.href().should.equal "/#{@fair.get('organizer').profile_id}"
