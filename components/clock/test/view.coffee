sd = require('sharify').data
benv = require 'benv'
Backbone = require 'backbone'
moment = require 'moment'
sinon = require 'sinon'
path = require 'path'
rewire = require 'rewire'
ClockView = rewire '../view.coffee'
Sale = require '../../../models/sale'
{ fabricate } = require 'antigravity'

describe 'ClockView', ->

  before (done) ->
    benv.setup =>
      sd.API_URL = 'localhost:3003'
      sd.CURRENT_PATH = ""
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$ = $
      @view = new ClockView
        model: new Sale(fabricate('sale'), clockState: 'open')
        el: $("<div></div>")
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  beforeEach ->
    @triggerSpy = sinon.stub()
    ClockView.__set__ 'mediator', trigger: @triggerSpy
    @clock = sinon.useFakeTimers()

  afterEach ->
    @clock.restore()

  describe '#render', ->

    xit 'sets renderClock to call in 1 second intervals', ->
      stub = sinon.stub global, 'setInterval'

      @view.render()
      stub.args[0][0].should.equal @view.renderClock
      stub.args[0][1].should.equal 1000
      stub.restore()

    it 'renders correct time until the sale starts', ->
      @view.model.set
        is_auction: true
        start_at: moment().subtract(1, 'minutes').format()
        end_at: moment().add(3, 'minutes').add(1, 'months').add(1, 'hours')
          .add(1, 'seconds').add(1, 'days').format()

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success { time: moment().format() }

      @view.$el.html '<div class="clock-value"></div>'
      @view.render()
      @view.$el.html().should.containEql 'days'
      @view.$el.html().should.containEql 'mos'
      @view.$el.html().should.not.containEql '00'

    it 'excludes months section if sale starts 0 months from now', ->
      @view.model.set
        is_auction: true
        start_at: moment().subtract(1, 'minutes').format()
        end_at: moment().add(3, 'minutes').add(1, 'hours').format()

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success { time: moment().format() }

      @view.$el.html '<div class="clock-value"></div>'
      @view.render()
      @view.$el.html().should.containEql 'days'
      @view.$el.html().should.not.containEql 'months'
      @view.$el.html().should.containEql '00'

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

      @view.model.calculateOffsetTimes()
      Backbone.sync.args[0][2].success { time: moment().format() }

      @view.$el.html '<div class="clock-value"></div>'
      @view.render()
      @triggerSpy.args[0][0].should.equal 'clock:is-over'
