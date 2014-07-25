sd = require('sharify').data
benv = require 'benv'
Backbone = require 'backbone'
moment = require 'moment'
sinon = require 'sinon'
path = require 'path'
ClockView = require '../view.coffee'
Sale = require '../../../models/sale'
{ fabricate } = require 'antigravity'

describe 'AuctionClockView', ->

  before (done) ->
    benv.setup =>
      sd.API_URL = 'localhost:3003'
      sd.ASSET_PATH = 'assets/'
      sd.CURRENT_PATH = ""
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$ = $
      @view = new ClockView
        model: new Sale(fabricate('sale'))
        el: $("<div></div>")
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  beforeEach ->
    @clock = sinon.useFakeTimers()

  afterEach ->
    @clock.restore()

  describe '#render', ->

    it 'sets renderClock to call in 1 second intervals', ->
      stub = sinon.stub global, 'setInterval'
      @view.render()
      stub.args[0][0].should.equal @view.renderClock
      stub.args[0][1].should.equal 1000
      stub.restore()

    it 'renders correct time until the sale starts', ->
      @view.model.set
        is_auction: true
        start_at: moment().subtract('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
        end_at: moment().add('minutes', 3).add('months', 1).add('hours', 1).add('seconds', 1).format("YYYY-MM-DD HH:mm:ss ZZ")

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }

      @view.$el.html '<div class="auction-clock-value"></div>'
      @view.render()
      @view.$el.html().should.include 'days'
      @view.$el.html().should.include 'months'
      @view.$el.html().should.not.include '00'

    it 'excludes months sectoin if sale starts 0 months from now', ->
      @view.model.set
        is_auction: true
        start_at: moment().subtract('minutes', 1).format("YYYY-MM-DD HH:mm:ss ZZ")
        end_at: moment().add('minutes', 3).add('hours', 1).format("YYYY-MM-DD HH:mm:ss ZZ")

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success { time: moment().format("YYYY-MM-DD HH:mm:ss ZZ") }

      @view.$el.html '<div class="auction-clock-value"></div>'
      @view.render()
      @view.$el.html().should.include 'days'
      @view.$el.html().should.not.include 'months'
      @view.$el.html().should.include '00'

    it 'removes the register button at the top for open auctions', ->
      @view.model.set
        start_at: new Date(2000, 10, 10).toString()
        end_at: new Date(2015, 10, 10).toString()
      @view.render()
      @view.$el.html().should.not.include 'Register to Bid'
