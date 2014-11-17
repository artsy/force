_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Fair = require '../../../models/fair'
routes = rewire '../routes'

class OrderedSetsFixture extends Backbone.Collection
  fetchAll: -> then: (cb) -> cb()
routes.__set__ 'OrderedSets', OrderedSetsFixture

describe 'Fairs routes', ->
  beforeEach ->
    @currentFairs = _.times 2, ->
      new Fair fabricate('fair', id: _.uniqueId(), published: true, has_full_feature: true, organizer: fabricate('fair_organizer'), end_at: moment().add(10, 'days'))
    @pastFairs = _.times 4, ->
      new Fair fabricate('fair', id: _.uniqueId(), published: true, has_full_feature: true, organizer: fabricate('fair_organizer'), end_at: moment().subtract(10, 'days'))
    @upcomingFairs = _.times 3, ->
      new Fair fabricate('fair', id: _.uniqueId(), published: true, has_full_feature: true, organizer: null, end_at: moment().add(10, 'days'))
    @invalidFairs = [
      new Fair(fabricate 'fair', id: 'invalid-1', published: false)
      new Fair(fabricate 'fair', id: 'invalid-2', published: true, has_full_feature: false)
    ]
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    describe 'with active current fairs', ->
      beforeEach ->
        @res = render: sinon.stub(), locals: sd: sinon.stub()
        @fairs = _.flatten [
          @currentFairs
          @pastFairs
          @upcomingFairs
          @invalidFairs
        ]

      it 'fetches the fairs and renders the index template', (done) ->
        routes.index {}, @res
        Backbone.sync.args[0][1].url.should.containEql 'api/v1/fairs'
        Backbone.sync.args[0][2].data.size.should.equal 50
        Backbone.sync.args[0][2].success(@fairs)
        _.defer =>
          @res.render.args[0][1].currentFairs.should.eql @currentFairs
          @res.render.args[0][1].upcomingFairs.should.eql @upcomingFairs
          @res.render.args[0][1].pastFairs.should.eql @pastFairs
          done()

    describe 'with no current fairs', ->
      beforeEach ->
        @res = render: sinon.stub(), locals: sd: sinon.stub()
        @fairs = _.flatten [
          @pastFairs
          @upcomingFairs
          @invalidFairs
        ]

      it 'fetches the fairs and renders the index template', (done) ->
        routes.index {}, @res
        Backbone.sync.args[0][1].url.should.containEql 'api/v1/fairs'
        Backbone.sync.args[0][2].data.size.should.equal 50
        Backbone.sync.args[0][2].success(@fairs)
        _.defer =>
          @res.render.args[0][1].currentFairs.should.eql []
          @res.render.args[0][1].upcomingFairs.should.eql @upcomingFairs
          @res.render.args[0][1].pastFairs.should.eql @pastFairs
          done()
