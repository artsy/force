_ = require 'underscore'
sinon = require 'sinon'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
Partner = require '../../../../../models/partner.coffee'
PartnerLocations = require '../../../../../collections/partner_locations'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

LocationsView = benv.requireWithJadeify resolve(
  __dirname, '../view.coffee'
), ['template']


describe 'LocationsView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      @partner = new Partner fabricate 'partner'
      @view = new LocationsView partner: @partner
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#fetch', ->
    before ->
      @locations = new PartnerLocations [fabricate 'location']

    it 'makes proper requests to fetch partner locations', ->
      @view.fetch()
      (requests = Backbone.sync.args).should.have.lengthOf 1
      requests[0][1].url.should.endWith "#{@partner.url()}/locations?size=20"

    it 'returns a thenable promise', ->
      @view.fetch().then.should.be.a.Function()

    it 'fetches and returns locations', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', @locations.models

      @view.fetch().then (locations) =>
        locations.length.should.equal 1
        locations.models.should.eql @locations.models

  describe '#render', ->
    beforeEach ->
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes the view if no locations', ->
      @view.render []
      @view.remove.calledOnce.should.be.ok()
