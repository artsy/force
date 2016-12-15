benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
moment = require 'moment'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'

# Fails intermittenly and sometimes causes other suites to fail
xdescribe 'setupAuctionReminder', ->
  beforeEach (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')

      setupAuctionReminder = rewire '../index'
      setupAuctionReminder.__set__ 'AuctionReminderView',
      benv.requireWithJadeify require.resolve('../view'), ['template']

      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', [
          fabricate 'sale', id: 'first', end_at: moment().add(1, 'hour').format()
          fabricate 'sale', id: 'second', end_at: moment().add(1, 'hour').format()
          fabricate 'sale', id: 'is-over-but-cached-and-being-returned', end_at: moment().subtract(1, 'hour').format()
        ]
      setupAuctionReminder()
      done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  it 'sets up the reminders', ->
    Backbone.sync.args[0][1].url
      .should.equal '/auctions/reminders'

    $('.auction-reminders').should.have.lengthOf 1
    $('.auction-reminder').should.have.lengthOf 2

  it 'sets up the reminders2', ->
    $('.js-dismiss:first').click() # Dismiss first

    $('.auction-reminders').should.have.lengthOf 1
    $('.auction-reminder').should.have.lengthOf 1

  it 'sets up the reminders3', ->
    $('.js-dismiss:first').click() # Dismiss first
    $('.js-dismiss:first').click() # Dismiss second

    $('.auction-reminders').should.have.lengthOf 0
    $('.auction-reminder').should.have.lengthOf 0

    $('body').html().should.eql ''
