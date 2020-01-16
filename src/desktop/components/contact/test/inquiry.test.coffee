_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
{ fabricate } = require '@artsy/antigravity'
{ resolve } = require 'path'
Artwork = require '../../../models/artwork'

describe 'Inquiry', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate 'artwork'
    @partner = fabricate 'partner'
    benv.render resolve(__dirname, '../templates/index.jade'), {}, =>
      Inquiry = benv.requireWithJadeify(resolve(__dirname, '../inquiry'), ['formTemplate'])
      sinon.stub Inquiry.prototype, 'open'
      sinon.stub Inquiry.prototype, 'updatePosition'
      sinon.stub Inquiry.prototype, 'isLoaded'
      @view = new Inquiry artwork: @artwork, partner: @partner, el: $('body')
      @view.renderTemplates()
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#renderTemplates', ->
    it 'has the correct header', ->
      html = @view.$el.html()
      html.should.containEql 'Ask a Specialist'

  describe '#submit', ->
    describe 'Logged out', ->
      beforeEach ->
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
        attributes.contact_gallery.should.not.be.ok() # Should not contact gallery

      it 'sends inquiries to galleries if the work is in an auction and ' +
         'partner is directly contactable', ->
        @view.sales = new Backbone.Collection [
          fabricate 'sale', is_auction: true]
        @view.partner = new Backbone.Model(
          fabricate 'partner', directly_contactable: true)
        @view.onSubmit()
        @view.model.get('contact_gallery').should.be.ok()

      it 'does not sends inquiries to artsy if the work is in an auction and ' +
         'partner is not directly contactable', ->
        @view.sales = new Backbone.Collection [
          fabricate 'sale', is_auction: true]
        @view.partner = new Backbone.Model(
          fabricate 'partner', directly_contactable: false)
        @view.onSubmit()
        @view.model.get('contact_gallery').should.not.be.ok()

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
        attributes.contact_gallery.should.not.be.ok() # Should not contact gallery

  describe '#events', ->
    it 'disables click on backdrop', ->
      (@view.events()['click.handler .modal-backdrop']?).should.not.be.ok()
