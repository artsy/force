_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Fair = require '../../../models/fair'
Fairs = require '../../../collections/fairs'
routes = rewire '../routes'

describe 'Fairs routes', ->
  beforeEach ->
    @currentFairs = new Fairs _.times 2, ->
      fair = new Fair fabricate('fair', id: _.uniqueId(), published: true, has_full_feature: true, organizer: fabricate('fair_organizer'), end_at: moment().add(10, 'days').format(), banner_size: 'x-large')
      fair
    @pastFairs = _.times 4, ->
      new Fair fabricate('fair', id: _.uniqueId('past'), published: true, has_full_feature: true, organizer: fabricate('fair_organizer'), end_at: moment().subtract(10, 'days').format())
    @upcomingFairs = _.times 3, ->
      new Fair fabricate('fair', id: _.uniqueId('upcoming'), published: true, has_full_feature: true, organizer: null, end_at: moment().add(10, 'days'))
    @invalidFairs = [
      new Fair(fabricate 'fair', id: _.uniqueId('invalid'), published: false)
      new Fair(fabricate 'fair', id: _.uniqueId('invalid'), published: true, has_full_feature: false)
    ]

    @rows = @currentFairs.fillRows @currentFairs.models

    # Eligible fairs have published profiles
    # also need to unset in_row from filling the rows
    _.map _.flatten([@currentFairs.models, @pastFairs]), (fair) ->
      fair.related().profile.set published: true
      fair.unset 'in_row'

    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    describe 'with active current fairs', ->
      beforeEach ->
        @res = render: sinon.stub(), locals: sd: sinon.stub()
        @fairs = _.flatten [
          @currentFairs.models
          @pastFairs
          @upcomingFairs
          @invalidFairs
        ]

      it 'fetches the fairs and renders the index template', (done) ->
        routes.index {}, @res
        Backbone.sync.args[0][1].url.should.containEql 'api/v1/fairs'
        Backbone.sync.args[0][2].data.size.should.equal 30
        Backbone.sync.args[0][2].success(@fairs)
        _.defer =>
          @res.render.args[0][1].currentFairRows.should.eql @rows
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
        Backbone.sync.args[0][2].data.size.should.equal 30
        Backbone.sync.args[0][2].success(@fairs)
        _.defer =>
          @res.render.args[0][1].currentFairRows.should.eql []
          @res.render.args[0][1].upcomingFairs.should.eql @upcomingFairs
          @res.render.args[0][1].pastFairs.should.eql @pastFairs
          done()
