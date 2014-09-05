_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artwork = require '../../../../../models/artwork'
PartnerLocations = require '../../../../../collections/partner_locations'
PartnerPhoneNumberView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'PartnerPhoneNumberView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @removeSpy = sinon.spy PartnerPhoneNumberView::, 'remove'
    @artwork = new Artwork fabricate 'artwork'
    @locations = new PartnerLocations _.times 3, -> fabricate('partner_location')
    @view = new PartnerPhoneNumberView model: @artwork, collection: @locations

  afterEach ->
    @view.remove.restore()

  describe '#initialize', ->
    it 'removes itself if there are no phone numbers', ->
      view = new PartnerPhoneNumberView model: @artwork, collection: new PartnerLocations
      view.$el.html().should.equal ''
      view.remove.called.should.be.true

  describe '#render', ->
    it 'renders all of the phone numbers', ->
      @view.$('.artwork-detail-header').text().should.equal 'Call Gallery'
      @view.$('.show-phone-number').length.should.equal 1
      @view.$('.partner-phone-number').length.should.equal 3

  describe '#showPhoneNumber', ->
    it 'removes the "Show Phone Number" link and displays the phone numbers when clicked', ->
      @view.$('.show-phone-number').click()
      @view.$('.show-phone-number').length.should.equal 0
