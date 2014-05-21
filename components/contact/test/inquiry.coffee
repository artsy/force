_               = require 'underscore'
benv            = require 'benv'
sinon           = require 'sinon'
Backbone        = require 'backbone'
rewire          = require 'rewire'
{ fabricate }   = require 'antigravity'
{ resolve }     = require 'path'
Artwork         = require '../../../models/artwork'

analytics = require '../../../lib/analytics'
analytics.track.funnel = sinon.stub()

describe 'Inquiry', ->
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
    @partner  = fabricate 'partner'
    benv.render resolve(__dirname, '../templates/index.jade'), {}, =>
      Inquiry = benv.requireWithJadeify(resolve(__dirname, '../inquiry'), ['formTemplate', 'headerTemplate'])
      Inquiry.__set__ 'analytics', analytics
      sinon.stub Inquiry.prototype, 'open'
      sinon.stub Inquiry.prototype, 'updatePosition'
      sinon.stub(Inquiry.prototype, 'displayAfterInquiryFlow').returns false
      @view = new Inquiry artwork: @artwork, partner: @partner, el: $('body')
      @view.representatives = new Backbone.Collection [name: 'Foo Bar']
      @view.representatives.first().iconImageUrl = ->
      @view.renderTemplates()
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#renderTemplates', ->
    it 'has the correct header', ->
      html = @view.$el.html()
      html.should.include 'Foo Bar, an Artsy Specialist, is available'
      html.should.include 'img alt="Foo Bar"'

  describe '#submit', ->
    describe 'Logged out', ->
      beforeEach ->
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
        attributes.contact_gallery.should.not.be.ok # Should not contact gallery

      it 'tracks the correct event', ->
        events = _.last(analytics.track.funnel.args, 2)
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
        attributes.contact_gallery.should.not.be.ok # Should not contact gallery

  describe '#events', ->

    it 'disables click on backdrop', ->
      (@view.events()['click.handler .modal-backdrop']?).should.not.be.ok
