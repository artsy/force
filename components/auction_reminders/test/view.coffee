benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/sale'
AuctionReminderView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'AuctionReminderView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
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

    @view = new AuctionReminderView
      model: @auction
      dismisser:
        dismiss: @dismiss = sinon.stub()

    @view.render()

  describe '#render', ->
    it 'renders the template', ->
      @view.$('h3').text()
        .should.equal 'My Auction'

      @view.$('img').attr('src')
        .should.containEql '/crop?width=90&height=90&quality=95&url=%2Flarge.jpg'

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
        @dismiss.called.should.be.false()
        @view.close.called.should.be.false()

        @view.$('.js-dismiss').click()

        @dismiss.called.should.be.true()
        @view.close.called.should.be.true()
