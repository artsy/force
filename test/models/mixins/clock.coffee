_               = require 'underscore'
sinon           = require 'sinon'
Backbone        = require 'backbone'
moment          = require 'moment'
{ fabricate }   = require 'antigravity'
ClockMixin      = require '../../../models/mixins/clock'
sd              = require('sharify').data

class Model extends Backbone.Model
  _.extend @prototype, ClockMixin

describe 'Image Sizes Mixin', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @model = new Model fabricate 'sale'

  afterEach ->
    Backbone.sync.restore()

  describe '#calculateOffsetTimes', ->
    describe 'client time preview', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @model.set
          is_auction: true
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at'))
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at'))
        @model.get('auctionState').should.equal 'preview'

      it 'reflects server open state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at')).subtract('minutes', 2)
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at')).subtract('minutes', 2)
        @model.get('auctionState').should.equal 'open'

      it 'reflects server closed state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at')).subtract('minutes', 4)
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at')).subtract('minutes', 4)
        @model.get('auctionState').should.equal 'closed'

    describe 'client time open', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @model.set
          is_auction: true
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")
        @clock.tick(120000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at')).add('minutes', 2)
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at')).add('minutes', 2)
        @model.get('auctionState').should.equal 'preview'

      it 'reflects server open state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('auctionState').should.equal 'open'
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at'))
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at'))

      it 'reflects server closed state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at')).subtract('minutes', 2)
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at')).subtract('minutes', 2)
        @model.get('auctionState').should.equal 'closed'

    describe 'client time closed', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @model.set
          is_auction: true
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")
        @clock.tick(240000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at')).add('minutes', 4)
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at')).add('minutes', 4)
        @model.get('auctionState').should.equal 'preview'

      it 'reflects server open state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at')).add('minutes', 2)
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at')).add('minutes', 2)
        @model.get('auctionState').should.equal 'open'

      it 'reflects server closed state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('auctionState').should.equal 'closed'
        @model.get('offsetStartAtMoment').should.eql moment(@model.get('start_at'))
        @model.get('offsetEndAtMoment').should.eql moment(@model.get('end_at'))
