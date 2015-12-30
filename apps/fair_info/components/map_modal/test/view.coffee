_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
FairEvent = require '../../../../../models/fair_event'
Fair = require '../../../../../models/fair'
MapModalView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'MapModalView', ->
  beforeEach (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  afterEach ->
    benv.teardown()

  beforeEach ->
    sinon.stub MapModalView::, 'postRender'
    fair = new Fair fabricate 'fair'
    fairEvent = new FairEvent fabricate('fair_event'), { fairId: fair.id }
    @view = new MapModalView model: fairEvent

  afterEach ->
    @view.postRender.restore()

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'displays the fair event information correctly', ->
      @view.$('.map-modal-fair-event-venue').html().should.containEql 'T: The New York Times Style Magazine Media Lounge on Pier 94'
      @view.$('.map-modal-fair-event-address').html().should.containEql '711 12th Ave, New York, NY 10019'
      @view.$('.map-modal-fair-event-running-hours').html().should.containEql 'Saturday, March 8'
