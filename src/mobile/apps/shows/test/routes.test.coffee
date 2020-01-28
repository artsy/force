_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
PartnerShow = require '../../../models/show'
{ fabricate } = require '@artsy/antigravity'
routes = require '../routes'

describe 'Shows routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      @res = render: sinon.stub()

    it 'fetches the set and renders the index template with featured cities', (done)->
      routes.index {}, @res

      Backbone.sync.args[0][1].id.should.equal '530ebe92139b21efd6000071'
      Backbone.sync.args[0][1].item_type.should.equal 'PartnerShow'
      Backbone.sync.args[0][2].url.should.containEql 'api/v1/set/530ebe92139b21efd6000071/items'
      Backbone.sync.args[0][2].success [fabricate 'show']
      _.defer => _.defer =>
        @res.render.args[0][0].should.equal 'index'
        @res.render.args[0][1].featuredCities.length.should.equal 10
        done()

  describe '#city', ->
    beforeEach ->
      @res = render: sinon.stub(), locals: sd: sinon.stub()
      @next = sinon.stub()

    it 'nexts if the city is not valid', ->
      routes.city { params: city: 'meow' }, @res, @next
      @next.called.should.be.true()

    it 'renders the city template', (done) ->
      routes.city { params: city: 'new-york' }, @res, @next

      _.defer => _.defer =>
        @res.render.called.should.be.true()
        @res.render.args[0][0].should.equal 'city'
        @res.render.args[0][1].city.name.should.equal 'New York'
        done()

  describe '#all-cities', ->
    beforeEach ->
      @res = render: sinon.stub()

    it 'renders the all-cities template', (done) ->
      routes.all_cities {}, @res, @next

      _.defer => _.defer =>
        @res.render.called.should.be.true()
        @res.render.args[0][0].should.equal 'all_cities'
        @res.render.args[0][1].cities.length.should.be.above 83
        done()
