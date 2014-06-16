_               = require 'underscore'
benv            = require 'benv'
sinon           = require 'sinon'
Backbone        = require 'backbone'
Artwork         = require '../../../models/artwork'
rewire          = require 'rewire'
{ fabricate }   = require 'antigravity'
{ resolve }     = require 'path'

describe 'ContactPartnerView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @artwork  = new Artwork fabricate 'artwork'
    @partner  = fabricate 'partner', locations: null
    benv.render resolve(__dirname, '../templates/index.jade'), {}, =>
      ContactPartnerView = benv.requireWithJadeify(resolve(__dirname, '../contact_partner'), ['formTemplate', 'headerTemplate'])
      @analytics = ContactPartnerView.__get__('analytics')
      sinon.stub @analytics.track, 'funnel'
      ContactPartnerView.__set__ 'Cookies', { set: (->), get: (->) }
      sinon.stub ContactPartnerView.prototype, 'isLoading'
      sinon.stub ContactPartnerView.prototype, 'isLoaded'
      sinon.stub ContactPartnerView.prototype, 'open'
      sinon.stub ContactPartnerView.prototype, 'updatePosition'
      sinon.stub(ContactPartnerView.prototype, 'displayAfterInquiryFlow').returns false
      @view = new ContactPartnerView artwork: @artwork, partner: @partner, el: $('body')
      _.last(Backbone.sync.args)[2].complete [fabricate('location')]
      done()

  afterEach ->
    @analytics.track.funnel.restore()
    Backbone.sync.restore()

  describe '#submit', ->
    describe 'Logged out', ->
      beforeEach ->
        @view.postRender()
        @view.$('input[name="name"]').val('Foo Bar')
        @view.$('input[name="email"]').val('foo@bar.com')
        @view.$('textarea[name="message"]').val('My message')
        @view.$('form').submit()

      it 'POSTs to the correct endpoint', ->
        _.last(Backbone.sync.args)[0].should.equal 'create'
        _.last(Backbone.sync.args)[1].url.should.include 'api/v1/me/artwork_inquiry_request'

      it 'sends the correct fields', ->
        keys = _.keys(_.last(Backbone.sync.args)[1].attributes)
        for field in ['artwork', 'contact_gallery', 'session_id', 'name', 'email', 'message']
          keys.should.include field

      it 'has the correct data', ->
        attributes = _.last(Backbone.sync.args)[1].attributes
        attributes.name.should.equal 'Foo Bar'
        attributes.email.should.equal 'foo@bar.com'
        attributes.message.should.equal 'My message'
        attributes.artwork.should.equal @view.artwork.id
        attributes.contact_gallery.should.be.ok # Should contact gallery

      it 'tracks the correct event', ->
        events = _.last(@analytics.track.funnel.args, 3)
        events[0][0].should.equal 'Sent artwork inquiry'
        events[1][0].should.equal 'Contact form submitted'

    describe 'Logged in', ->
      beforeEach ->
        @view.user = (@user = new Backbone.Model fabricate 'user')
        @view.$el.html @view.formTemplate @view.templateData
        @view.$('textarea[name="message"]').val('My message')
        @view.$('form').submit()

      it 'has the correct data', ->
        attributes = _.last(Backbone.sync.args)[1].attributes
        attributes.name.should.equal @user.get('name')
        attributes.email.should.equal @user.get('email')
        attributes.message.should.equal 'My message'
        attributes.artwork.should.equal @view.artwork.id
        attributes.contact_gallery.should.be.ok # Should contact gallery

  describe '#events', ->

    it 'disables click on backdrop', ->
      (@view.events()['click.handler .modal-backdrop']?).should.not.be.ok

  describe 'template', ->
    it 'does render pricing if work cant display price', ->
      @view.artwork.isPriceDisplayable = -> false
      @view.$el.html @view.formTemplate @view.templateData
      @view.$el.html().should.include 'and price'

    it 'doesnt render pricing question if work can display price', ->
      @view.artwork.isPriceDisplayable = -> true
      @view.$el.html @view.formTemplate @view.templateData
      @view.$el.html().should.not.include 'and price'
