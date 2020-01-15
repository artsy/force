_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Artwork = require '../../../models/artwork'
Partner = require '../../../models/partner'
rewire = require 'rewire'
{ fabricate } = require '@artsy/antigravity'
{ resolve } = require 'path'

describe 'ContactPartnerView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      @artwork = new Artwork fabricate 'artwork'
      @partner = new Partner fabricate 'partner', locations: null
      benv.render resolve(__dirname, '../templates/index.jade'), {}, =>
        ContactPartnerView = benv.requireWithJadeify(resolve(__dirname, '../contact_partner'), ['formTemplate', 'headerTemplate'])
        ContactPartnerView.__set__ 'Cookies', { set: (->), get: (->) }
        sinon.stub ContactPartnerView.prototype, 'isLoading'
        sinon.stub ContactPartnerView.prototype, 'isLoaded'
        sinon.stub ContactPartnerView.prototype, 'open'
        sinon.stub ContactPartnerView.prototype, 'updatePosition'
        ContactPartnerView.__set__ 'SESSION_ID', '1111'
        @view = new ContactPartnerView artwork: @artwork, partner: @partner, el: $('body')
        _.last(Backbone.sync.args)[2].complete [fabricate('location')]
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

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
        _.last(Backbone.sync.args)[1].url.should.containEql 'api/v1/me/artwork_inquiry_request'

      it 'sends the correct fields', ->
        keys = _.keys(_.last(Backbone.sync.args)[1].attributes)

        for field in ['artwork', 'contact_gallery', 'session_id', 'name', 'email', 'message']
          keys.should.containEql field

      it 'has the correct data', ->
        attributes = _.last(Backbone.sync.args)[1].attributes
        attributes.name.should.equal 'Foo Bar'
        attributes.email.should.equal 'foo@bar.com'
        attributes.message.should.equal 'My message'
        attributes.artwork.should.equal @view.artwork.id
        attributes.contact_gallery.should.be.ok() # Should contact gallery

    describe 'Logged in', ->
      beforeEach ->
        @view.user = (@user = new Backbone.Model fabricate 'user')
        @view.user.isLoggedIn = -> true
        @view.$el.html @view.formTemplate @view.templateData
        @view.$('textarea[name="message"]').val('My message')
        @view.$('form').submit()

      it 'has the correct data', ->
        attributes = _.last(Backbone.sync.args)[1].attributes
        attributes.name.should.equal @user.get('name')
        attributes.email.should.equal @user.get('email')
        attributes.message.should.equal 'My message'
        attributes.artwork.should.equal @view.artwork.id
        attributes.contact_gallery.should.be.ok() # Should contact gallery

  describe '#events', ->
    it 'disables click on backdrop', ->
      (@view.events()['click.handler .modal-backdrop']?).should.not.be.ok()

  describe 'template', ->
    it 'renders the template correctly', ->
      @view.$el.html @view.formTemplate @view.templateData
      @view.$el.html().should.containEql 'Could you please provide more information about the piece?'
