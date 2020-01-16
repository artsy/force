_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
PartnerShow = require '../../../../../models/partner_show'
Partner = require '../../../../../models/partner'
MapModalView = benv.requireWithJadeify require.resolve('../view'), ['template']

xdescribe 'MapModalView', ->
  beforeEach (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  afterEach ->
    benv.teardown()

  beforeEach ->
    sinon.stub MapModalView::, 'postRender'
    @show = new PartnerShow fabricate 'show', location:
      _.extend fabricate('show').location,
        day_schedules: []
        coordinates: lat: 30, lng: 30
    @partner = new Partner fabricate 'partner'
    @view = new MapModalView model: @show

  afterEach ->
    @view.postRender.restore()

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'displays the shows information correctly', ->
      @view.$('.map-modal-partner-name').html().should.containEql 'Gagosian Gallery'
      @view.$('.map-modal-partner-location-address').html().should.containEql '529 W 20th St.'
      @view.$('.map-modal-partner-location-city').html().should.containEql 'New York, NY'
      @view.$('.map-modal-show-running-dates').html().should.containEql 'Jul 12th – Aug 23rd 2013'
