benv            = require 'benv'
sinon           = require 'sinon'
Backbone        = require 'backbone'
rewire          = require 'rewire'
{ fabricate }   = require 'antigravity'

describe 'ContactPartnerView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @ContactPartnerView = rewire '../contact_partner'
      @ContactPartnerView.__set__ 'CurrentUser', { orNull: -> 'existy' }
      sinon.stub @ContactPartnerView.prototype, 'open'
      sinon.stub @ContactPartnerView.prototype, 'updatePosition'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artwork = fabricate 'artwork'
    @partner = fabricate 'partner'
    @view = new @ContactPartnerView artwork: @artwork, partner: @partner

  afterEach ->
    Backbone.sync.restore()

  describe '#submit', ->
    beforeEach ->
      @view.submit($.Event('submit'))

    it 'POSTs to the correct endpoint', ->
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][1].url.should.include 'api/v1/me/artwork_inquiry_request'

    it 'should submit the correct data', ->
      data = Backbone.sync.args[0][1].attributes
      data.artwork.should.equal @artwork.id
      data.contact_gallery.should.be.ok

  describe '#success', ->
    it 'does a dance and displays the success message then closes the modal after 3 seconds'
