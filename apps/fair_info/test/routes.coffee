routes = require '../routes'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
Profile = require '../../../models/profile'
Fair = require '../../../models/fair'


describe 'FairInfo routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = {
      params: {
        id: "artissma-2014"
      }
    }

    @res = {
      locals: {
        profile: new Profile fabricate 'profile', owner: fabricate 'fair'
        fair: new Fair fabricate 'fair'
      }
    }

    @next = sinon.stub()


  afterEach ->
    Backbone.sync.restore()

  describe '#assignFair', ->
    it 'assigns a fair model to locals', ->
      routes.assignFair(@req, @res, @next)
      @res.locals.fair.get('name').should.equal 'Armory Show 2013'