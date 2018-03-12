_ = require 'underscore'
moment = require 'moment'
sinon = require 'sinon'
Backbone = require 'backbone'
fixtures = require '../helpers/fixtures'
Sections = require '../../collections/sections'

describe 'Sections', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @sections = new Sections [fixtures.section]

  afterEach ->
    Backbone.sync.restore()

  describe '#running', ->

    it 'pulls the currently running sections', ->
      @sections.reset [
        _.extend(_.clone(fixtures.section),
          start_at: moment().subtract(1, 'days').format()
          end_at: moment().add(1, 'days').format()
          title: "Andy Foobar's Retrospective"
        )
        fixtures.section
      ]
      @sections.running().length.should.equal 1
      @sections.running()[0].get('title')
        .should.equal "Andy Foobar's Retrospective"
