_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
routes = require '../routes'

describe 'Shows routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      @res = render: sinon.stub()

    it 'fetches the set and renders the index template', ->
      routes.index {}, @res
      Backbone.sync.args[0][1].id.should.equal '530ebe92139b21efd6000071'
      Backbone.sync.args[0][1].item_type.should.equal 'PartnerShow'
      Backbone.sync.args[0][2].url.should.containEql 'api/v1/set/530ebe92139b21efd6000071/items'
      Backbone.sync.args[0][2].success(_.times 10, -> fabricate 'show')
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].shows.length.should.equal 8


  describe '#city', ->
    beforeEach ->
      @res = render: sinon.stub()
      @next = sinon.stub()

    it 'nexts if the city is not valid', ->
      routes.city { params: city: 'foobar' }, @res, @next
      @next.called.should.be.true

    it 'fetches all the shows and renders the city template', (done) ->
      routes.city { params: city: 'new-york' }, @res, @next
      Backbone.sync.callCount.should.equal 3
      Backbone.sync.args[0][2].data.near.should.equal '40.74729,-73.98188'
      Backbone.sync.args[0][2].data.status.should.equal 'upcoming'
      Backbone.sync.args[1][2].data.near.should.equal '40.74729,-73.98188'
      Backbone.sync.args[1][2].data.status.should.equal 'running'
      Backbone.sync.args[2][2].data.near.should.equal '40.74729,-73.98188'
      Backbone.sync.args[2][2].data.status.should.equal 'closed'
      _.defer =>
        @res.render.called.should.be.true
        @res.render.args[0][0].should.equal 'city'
        @res.render.args[0][1].city.name.should.equal 'New York'
        done()
