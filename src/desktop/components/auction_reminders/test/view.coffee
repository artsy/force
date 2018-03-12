benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/sale'
AuctionReminderView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'AuctionReminderView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @auction = new Auction fabricate 'sale',
      name: 'My Auction'
      image_versions: ['large']
      image_url: '/:version.jpg'
      is_auction: true
    sinon.stub(@auction, 'reminderStatus').returns('closing_soon')

    @view = new AuctionReminderView
      model: @auction
      dismisser:
        dismiss: @dismiss = sinon.stub()
    sinon.stub(@view, 'getOffsetTimesPromise').returns(@view)

  describe '#preRender', ->
    it 'renders the template', ->
      @view.preRender().then (view)->
        view.$('h3').text()
          .should.equal 'My Auction'

        view.$('img').attr('src')
          .should.containEql '/crop?url=%2Flarge.jpg&width=80&height=60&quality=80'

  describe '#click', ->
    beforeEach ->
      sinon.spy AuctionReminderView::, 'close'

    afterEach ->
      @view.close.restore()

    describe 'click anywhere but the close button', ->
      it 'dismisses; does not close', ->
        @dismiss.called.should.be.false()
        @view.close.called.should.be.false()

        @view.$el.click()

        @dismiss.called.should.be.true()
        @view.close.called.should.be.false()

    describe 'click the close button', ->
      it 'dismisses; closes', ->
        @view.preRender().then (view)->

          view.dismisser.dismiss.called.should.be.false()
          view.close.called.should.be.false()

          view.$('.js-dismiss').click()

          view.dismisser.dismiss.called.should.be.true()
          view.close.called.should.be.true()
