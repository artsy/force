_ = require 'underscore'
Backbone = require 'backbone'
Fair = require '../../../../models/fair'
FairEntries = require '../../../../collections/fair_entries'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
benv = require 'benv'
fabricatedFeed = require './fabricate_feed.json'
{ resolve } = require 'path'
cheerio = require 'cheerio'

describe 'Fair feed page client-side code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/feed.jade'), {
        fair: new Fair(fabricate 'fair')
        sd: {}
      }, =>
        { FeedView } = benv.requireWithJadeify resolve(__dirname, '../../client/feed'),
          ['fairEntriesTemplate']

        @view = new FeedView
          fair: new Fair(fabricate 'fair')
          el: $ 'body'
          collection: new FairEntries fabricatedFeed
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe 'FeedView', ->

    describe '#render', ->

      it 'renders entries properly', ->
        @view.render()
        @view.$('.fair-feed__entry').length.should.equal 1
        @view.$('.fair-feed__entry__names__author-name').first().html().should.containEql "Sophie-Alexia"
        @view.$('.fair-feed__entry__names__username').first().html().should.containEql "sophie_alexia"




