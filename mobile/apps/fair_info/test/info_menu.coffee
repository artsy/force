_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Fair = require '../../../models/fair.coffee'
FairEvent = require '../../../models/fair_event.coffee'
FairEvents = require '../../../collections/fair_events.coffee'
InfoMenu = require '../info_menu.coffee'
Articles = require '../../../collections/articles.coffee'
Article = require '../../../models/article.coffee'
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
      .yieldsTo 'success', [ @fairEvent ]
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
    urls = _.map Backbone.sync.args, (args) ->  _.result args[1], 'url'
    urls.should.eql [
        "undefined/api/v1/fair/#{@fair.id}/fair_events",
        "undefined/api/articles"
        "undefined/api/articles"
      ]

  it 'resolves with the infoMenu',->
    @infoMenu.fetch({cache: false})
      .then (infoMenu) ->
        infoMenu.should.eql
          events: true
          programming: false
          artsyAtTheFair: false
