_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Fair = require '../../../models/fair'
FairEvent = require '../../../models/fair_event'
FairEvents = require '../../../collections/fair_events'
InfoMenu = require '../index'
Articles = require '../../../collections/articles'
Article = require '../../../models/article'
cache = require '../../../lib/cache'

describe 'InfoMenu', ->
  beforeEach ->
    @fair = new Fair fabricate 'fair'
    @infoMenu = new InfoMenu fair: @fair
    @fairEvent = new FairEvent fabricate('fair_event'), { fairId: @fair.id }

    @cache = {}
    sinon.stub Backbone, 'sync'
      # Events fetch
      .onCall 0
      .yieldsTo 'success', [ new FairEvents([@fairEvent], {fairId: @fair.id}) ]
      # Programming Articles fetch
      .onCall 1
      .yieldsTo 'error', {}
      # Artsy At The Fair Articles fetch
      .onCall 2
      .yieldsTo 'error', {}

  afterEach ->
    Backbone.sync.restore()

  it 'fetches the infoMenu', ->
    @infoMenu.fetch({cache: false})
    results = _.map Backbone.sync.args, (args) -> _.result args[1], 'url'
      .join(' ').replace(/undefined|localhost\:3003/g, '').should.equal [
        "/api/v1/fair/#{@fair.id}/fair_events",
        "/api/articles"
        "/api/articles"
      ].join ' '

  it 'resolves with the infoMenu',->
    @infoMenu.fetch({cache: false})
      .then (infoMenu) ->
        infoMenu.should.eql
          events: true
          programming: false
          artsyAtTheFair: false
