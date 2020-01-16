_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
moment = require 'moment'
{ fabricate } = require '@artsy/antigravity'
ClockMixin = require '../../../models/mixins/clock'
sd = require('sharify').data

class Model extends Backbone.Model
  _.extend @prototype, ClockMixin

describe 'Clock Mixin', ->
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
        Backbone.sync.args[0][2].success { iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).unix()
        @model.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).subtract('minutes', 2).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).subtract('minutes', 2).unix()
        @model.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @model.set auction_state: 'closed'
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).subtract('minutes', 4).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).subtract('minutes', 4).unix()
        @model.get('clockState').should.equal 'closed'

      it 'reflects server live state', ->
        @model.set
          live_start_at: moment().add('minutes', 5).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 10).format("YYYY-MM-DD HH:mm:ss ZZ")
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetLiveStartAtMoment').should.eql moment(@model.get('live_start_at')).subtract('minutes', 4)
        @model.get('clockState').should.equal 'live'

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
        Backbone.sync.args[0][2].success { iso8601: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).add('minutes', 2).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).add('minutes', 2).unix()
        @model.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('clockState').should.equal 'open'
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).unix()

      it 'reflects server closed state', ->
        @model.set auction_state: 'closed'
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).subtract('minutes', 2).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).subtract('minutes', 2).unix()
        @model.get('clockState').should.equal 'closed'

      it 'reflects live open', ->
        @model.set
          live_start_at: moment().subtract(1, 'minutes').format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: null
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetLiveStartAtMoment').unix().should.eql moment(@model.get('live_start_at')).unix()
        @model.get('clockState').should.equal 'live-open'

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
        Backbone.sync.args[0][2].success { iso8601: moment().subtract('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).add('minutes', 4).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).add('minutes', 4).unix()
        @model.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).add('minutes', 2).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).add('minutes', 2).unix()
        @model.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @model.set auction_state: 'closed'
        @model.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @model.get('clockState').should.equal 'closed'
        @model.get('offsetStartAtMoment').unix().should.eql moment(@model.get('start_at')).unix()
        @model.get('offsetEndAtMoment').unix().should.eql moment(@model.get('end_at')).unix()
