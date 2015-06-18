benv = require 'benv'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
PartnerShow = require '../../../../../models/partner_show.coffee'
EventsModalView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'EventsModalView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    show = new PartnerShow fabricate 'show'
    @view = new EventsModalView model: show, collection: show.related().showEvents
    @view.render()

  it 'renders correctly', ->
    @view.$('h1').text().should.equal 'Events'
    @view.$('.sem-event').should.have.lengthOf 2
    @view.$('.sem-event-title').first().text().should.equal 'Opening Reception Inez and Vinoodh Opening'
