sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Sale = require '../../models/sale'

describe 'Sale', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @sale = new Sale fabricate 'sale', id: 'whtney-art-party', auction_state: 'open'

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchArtworks', ->
    it 'fetches the sale artworks', ->
      @sale.fetchArtworks()
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/sale/whtney-art-party/sale_artworks'

  describe '#registerUrl', ->
    it 'points to the secure auction registration page'
    it 'points to the signup page when not logged in'

  describe '#calculateOffsetTimes', ->
    describe 'client time preview', ->
      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add(1, 'minutes').format()
          end_at: moment().add(3, 'minutes').format()

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format() }
        @sale.get('offsetStartAtMoment').isSame(moment(@sale.get('start_at'))).should.be.ok()
        @sale.get('offsetEndAtMoment').isSame(moment(@sale.get('end_at'))).should.be.ok()
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').isSame(moment(@sale.get('start_at')).subtract(2, 'minutes')).should.be.ok()
        @sale.get('offsetEndAtMoment').isSame(moment(@sale.get('end_at')).subtract(2, 'minutes')).should.be.ok()
        @sale.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.set(auction_state: 'closed')
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(4, 'minutes').format() }
        @sale.get('offsetStartAtMoment').isSame(moment(@sale.get('start_at')).subtract(4, 'minutes')).should.be.ok()
        @sale.get('offsetEndAtMoment').isSame(moment(@sale.get('end_at')).subtract(4, 'minutes')).should.be.ok()
        @sale.get('clockState').should.equal 'closed'

    describe 'client time open', ->
      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add(1, 'minutes').format()
          end_at: moment().add(3, 'minutes').format()
        @clock.tick(120000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().subtract(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment')
          .isSame(moment(@sale.get('start_at')).add(2, 'minutes')).should.be.ok()
        @sale.get('offsetEndAtMoment')
          .isSame(moment(@sale.get('end_at')).add(2, 'minutes')).should.be.ok()
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format() }
        @sale.get('clockState').should.equal 'open'
        @sale.get('offsetStartAtMoment').isSame(moment(@sale.get('start_at'))).should.be.ok()
        @sale.get('offsetEndAtMoment').isSame(moment(@sale.get('end_at'))).should.be.ok()

      it 'reflects server closed state', ->
        @sale.set(auction_state: 'closed')
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().add(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').isSame(moment(@sale.get('start_at')).subtract(2, 'minutes')).should.be.ok()
        @sale.get('offsetEndAtMoment').isSame(moment(@sale.get('end_at')).subtract(2, 'minutes')).should.be.ok()
        @sale.get('clockState').should.equal 'closed'

    describe 'client time closed', ->
      beforeEach ->
        @clock = sinon.useFakeTimers()
        @sale.set
          is_auction: true
          start_at: moment().add(1, 'minutes').format()
          end_at: moment().add(3, 'minutes').format()
        @clock.tick(240000)

      afterEach ->
        @clock.restore()

      it 'reflects server preview state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().subtract(4, 'minutes').format() }
        @sale.get('offsetStartAtMoment')
          .isSame(moment(@sale.get('start_at')).add(4, 'minutes')).should.be.ok()
        @sale.get('offsetEndAtMoment')
          .isSame(moment(@sale.get('end_at')).add(4, 'minutes')).should.be.ok()
        @sale.get('clockState').should.equal 'preview'

      it 'reflects server open state', ->
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().subtract(2, 'minutes').format() }
        @sale.get('offsetStartAtMoment').isSame(moment(@sale.get('start_at')).add(2, 'minutes')).should.be.ok()
        @sale.get('offsetEndAtMoment').isSame(moment(@sale.get('end_at')).add(2, 'minutes')).should.be.ok()
        @sale.get('clockState').should.equal 'open'

      it 'reflects server closed state', ->
        @sale.set(auction_state: 'closed')
        @sale.calculateOffsetTimes()
        Backbone.sync.args[0][2].success { iso8601: moment().format() }
        @sale.get('clockState').should.equal 'closed'
        @sale.get('offsetStartAtMoment').isSame(moment(@sale.get('start_at'))).should.be.ok()
        @sale.get('offsetEndAtMoment').isSame(moment(@sale.get('end_at'))).should.be.ok()

  describe '#sortableDate', ->
    it 'returns the live_start_at if it exists', ->
      @sale.set
        end_at: moment().add 2, 'days'
        live_start_at: moment().add 1, 'days'
      @sale.sortableDate().should.eql @sale.get('live_start_at')

    it 'returns the end_at if no live_start_at exists', ->
      @sale.set
        end_at: moment().add 2, 'days'
      @sale.sortableDate().should.eql @sale.get('end_at')
