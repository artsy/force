_ = require 'underscore'
moment = require 'moment'
sinon = require 'sinon'
Backbone = require 'backbone'
fixtures = require '../helpers/fixtures'
Verticals = require '../../collections/verticals'

describe 'Verticals', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @verticals = new Verticals [fixtures.vertical]

  afterEach ->
    Backbone.sync.restore()

  describe '#running', ->

    it 'pulls the currently running verticals', ->
      @verticals.reset [
        _.extend(_.clone(fixtures.vertical),
          start_at: moment().subtract(1, 'days').format()
          end_at: moment().add(1, 'days').format()
          title: "Andy Foobar's Retrospective"
        )
        fixtures.vertical
      ]
      @verticals.running().length.should.equal 1
      @verticals.running()[0].get('title')
        .should.equal "Andy Foobar's Retrospective"