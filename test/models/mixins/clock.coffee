_               = require 'underscore'
sinon           = require 'sinon'
Backbone        = require 'backbone'
moment          = require 'moment'
{ fabricate }   = require 'antigravity'
{ Image }       = require 'artsy-backbone-mixins'
imageSizesMixin = require '../../../models/mixins/image_sizes'
sd              = require('sharify').data

class Model extends Backbone.Model
  _.extend @prototype, Image()
  _.extend @prototype, imageSizesMixin

describe 'Image Sizes Mixin', ->
  beforeEach ->
    @model = new Model fabricate 'sale'

  describe '#calculateOffsetTimes', ->
    describe 'client time preview', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))
        @sale.get('auctionState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract('minutes', 2)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract('minutes', 2)
        @sale.get('auctionState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract('minutes', 4)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract('minutes', 4)
        @sale.get('auctionState').should.equal 'closed'

    describe 'client time open', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")
        @clock.tick(120000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add('minutes', 2)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add('minutes', 2)
        @sale.get('auctionState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('auctionState').should.equal 'open'
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().add('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).subtract('minutes', 2)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).subtract('minutes', 2)
        @sale.get('auctionState').should.equal 'closed'

    describe 'client time closed', ->

      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
          end_at: moment().add('minutes', 3).format("YYYY-MM-DD HH:mm:ss ZZ")
        @clock.tick(240000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 4).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add('minutes', 4)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add('minutes', 4)
        @sale.get('auctionState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at')).add('minutes', 2)
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at')).add('minutes', 2)
        @sale.get('auctionState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }
        @sale.get('auctionState').should.equal 'closed'
        @sale.get('offsetStartAtMoment').should.eql moment(@sale.get('start_at'))
        @sale.get('offsetEndAtMoment').should.eql moment(@sale.get('end_at'))
