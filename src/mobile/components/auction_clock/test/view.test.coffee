sinon = require 'sinon'
path = require 'path'
Sale = require '../../../models/sale'
{ fabricate } = require '@artsy/antigravity'
Backbone = require 'backbone'
benv = require 'benv'
moment = require 'moment'
{ resolve } = require 'path'
rewire = require 'rewire'
AuctionClockView = rewire '../view'
fs = require 'fs'
jade = require 'jade'

omg = ->
  filename = resolve __dirname, '../template.jade'
  jade.compile(fs.readFileSync(filename), filename: filename)

describe 'AuctionClockView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @clock = sinon.useFakeTimers()
    @triggerSpy = sinon.stub()
    @intervalSpy = sinon.stub()
    AuctionClockView.__set__ 'mediator', trigger: @triggerSpy
    AuctionClockView.__set__ 'setInterval', @intervalSpy
    @view = new AuctionClockView el: $('body'), model: new Sale fabricate 'sale'

  afterEach ->
    Backbone.sync.restore()
    @clock.restore()

  describe '#render', ->

    it 'sets renderClock to call in 1 second intervals', ->
      @view.render()
      @intervalSpy.args[0][0].should.equal @view.renderClock
      @intervalSpy.args[0][1].should.equal 1000

    it 'renders correct time until the sale starts', ->
      @view.model.set
        is_auction: true
        start_at: moment().subtract(1, 'minutes').format()
        end_at: moment().add(3, 'minutes').add(1, 'months').add(1, 'days')
          .add(1, 'hours').add(1, 'seconds').format()

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success time: moment().format()

      @view.$el.html omg()
      @view.render()
      @view.$el.html().should.not.containEql '00'

    it 'excludes months section if sale starts 0 months from now', ->
      @view.model.set
        is_auction: true
        start_at: moment().subtract(1, 'minutes').format()
        end_at: moment().add(3, 'minutes').add(1, 'hours').format()

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success { time: moment().format() }

      @view.$el.html omg()
      @view.render()
      @view.$el.html().should.containEql '00'
      @view.$el.html().should.not.containEql 'false'

    it 'removes the register button at the top for open auctions', ->
      @view.model.set
        start_at: new Date(2000, 10, 10).toString()
        end_at: new Date(2015, 10, 10).toString()
      @view.render()
      @view.$el.html().should.not.containEql 'Register to Bid'

    it 'triggers is-almost-over when clock is almost over', ->
      @view.model.set
        is_auction: true
        start_at: moment().subtract(1, 'minutes').format()
        end_at: moment().add(30, 'seconds').format()

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success { time: moment().format() }

      @view.$el.html '<div class="clock-value"></div>'
      @view.render()
      @triggerSpy.args[0][0].should.equal 'clock:is-almost-over'

    it 'triggers is-over when clock is over', ->
      @view.model.set
        is_auction: true
        start_at: moment().subtract(2, 'minutes').format()
        end_at: moment().subtract(1, 'minutes').format()
        auction_state: 'closed'

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success { time: moment().format() }

      @view.$el.html '<div class="clock-value"></div>'
      @view.render()
      @triggerSpy.args[0][0].should.equal 'clock:is-over'

    describe 'live auction integration', ->
      beforeEach ->
        @view.$el.html omg()
        @view.model.set live_start_at: moment().add(2, 'days').format()

      it 'renders the correct copy', ->
        @view.model.set 'clockState', 'live'
        @view.$('h2').text().should.equal 'Live Bidding Opening In'
        @view.model.set 'clockState', 'closed'
        @view.$('h2').text().should.equal 'Online Bidding Closed'

    describe 'isAuctionPromo', ->
      beforeEach ->
        @view.$el.html omg()
        @view.model.set sale_type: 'auction promo'

      it 'renders the correct copy', ->
        @view.model.set 'clockState', 'preview'
        @view.$('h2').text().should.equal 'Auction Opens In'
        @view.model.set 'clockState', 'open'
        @view.$('h2').text().should.equal 'Auction Closes In'
        @view.model.set 'clockState', 'closed'
        @view.$('h2').text().should.equal 'Auction Closed'
