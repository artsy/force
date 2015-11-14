routes = require '../routes'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
Profile = require '../../../models/profile'


describe 'FairInfo routes', ->
  beforeEach ->
    @req = {
      params: {
        id: "artissma-2014"
      }
    }

    @res = {
      locals: {
        profile: new Profile fabricate 'profile', owner: fabricate 'fair'
      }
    }

    @next = sinon.stub()

  describe '#assignFair', ->
    it 'assigns a fair model to locals', ->
      routes.assignFair(@req, @res, @next)
      @res.locals.fair.get('name').should.equal 'Armory Show 2013'