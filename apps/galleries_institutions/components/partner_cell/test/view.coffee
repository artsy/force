benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Partner = require '../../../../../models/partner'
PartnerCellView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'PartnerCellView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @partner = new Partner fabricate 'partner'
    @view = new PartnerCellView partner: @partner

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders correctly', ->
      @view.$('.partner-cell-name').text()
        .should.equal 'Gagosian Gallery'

    it 're-renders correctly when other data syncs', ->
      @view.$('.partner-cell-location').is ':empty'
        .should.be.true()

      @partner.related().locations.add fabricate 'partner_location'
      @partner.related().locations.trigger 'sync'

      @view.$('.partner-cell-location').is ':empty'
        .should.be.false()
      @view.$('.partner-cell-location').text()
        .should.equal 'San Francisco'
