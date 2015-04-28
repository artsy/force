_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
PartnerShow = require '../../../../../models/partner_show.coffee'
PartnerShows = require '../../../../../collections/partner_shows.coffee'
RelatedShowsView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']

describe 'RelatedShowsView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @relatedShows = new PartnerShows
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new RelatedShowsView
      collection: @relatedShows
      title: 'Current Shows in Test City'
      el: $("<div></div>")
    @relatedShows.fetch()

  afterEach ->
    Backbone.sync.restore()
    @view.remove()

  describe '#render', ->

    it 'displays the correct title', ->
      Backbone.sync.args[0][2].success [fabricate 'show']
      console.log 'HTMLLLLLLL', @view.$el.html()
      @view.$('.show-related-shows-title').html().should.containEql 'Current Shows in Test City'

    it 'displays the information from the show', ->
      relatedShow = new PartnerShow [
        fabricate 'show',
          name: 'Test Show'
          start_at: '2013-07-12T04:00:00+00:00'
          end_at: '2013-08-23T04:00:00+00:00'
          partner: fabricate 'partner', name: 'Test Gallery'
      ]
      Backbone.sync.args[0][2].success [relatedShow]
      @view.$('.show-related-show-title').html().should.containEql 'Test Show'
      @view.$('.show-related-show-partner').html().should.containEql 'Test Gallery'
      @view.$('.show-related-show-running-dates').html().should.containEql 'July 12 – August 23'

    xit 'displays the correct number of install shots', ->
      # this relies on a query to the width of an element on the dom
