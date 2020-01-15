_ = require 'underscore'
Backbone = require 'backbone'
Fair = require '../../../../models/fair'
ShowsFeed = require '../../../../collections/shows_feed'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
benv = require 'benv'
{ resolve } = require 'path'

describe 'Exhibitors page client-side code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.onInfiniteScroll = sinon.stub()
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/exhibitors_page.jade'), {
        fair: new Fair(fabricate 'fair')
        shows: new ShowsFeed
        showParams: {}
        artworkColumnsTemplate: ->
        sd: {}
      }, =>
        { FairExhibitorsView } = benv.requireWithJadeify resolve(__dirname, '../../client/exhibitors'),
          ['exhibitorsTemplate', 'artworkColumnsTemplate']
        @view = new FairExhibitorsView
          el: $ 'body'
          collection: new ShowsFeed [fabricate('show', fair_location: { display: 'booth 7' })]
          showParams: { foo: 'bar' }
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe 'init', ->

    xit 'injects the showParams and shows into the view', ->
      sd.SHOW_PARAMS = { foo: 'baz' }
      sd.SHOWS = [fabricate('show', fair_location: { display: 'Dock 4' })]
      view = @init()
      view.showParams.foo.should.equal 'baz'
      view.collection.first().formattedLocation().should.equal 'Dock 4'

  describe 'FairMainPageView', ->

    describe '#initialize', ->

      it 'attaches the show params', ->
        @view.showParams.foo.should.equal 'bar'

    describe '#setupInfiniteScroll', ->

      xit 'doesnt set up infinite scroll if in a partner scope', ->
        @view.showParams.partner = { foo: 'bar' }
        @view.setupInfiniteScroll()
        $.onInfiniteScroll.called.should.not.be.ok()

      it 'sets up infinite scroll for non-partner scope', ->
        @view.setupInfiniteScroll()
        $.onInfiniteScroll.called.should.be.ok()

      it 'fetches the next page on infinite scroll', ->
        @view.collection.nextPage = sinon.stub()
        @view.setupInfiniteScroll()
        $.onInfiniteScroll.args[0][0]()
        @view.collection.nextPage.called.should.be.ok()

    describe '#renderShows', ->

      it 'renders the shows', ->
        @view.collection.reset [fabricate 'show',
          fair_location: { display: 'Pier FooBar' }
        ]
        @view.renderShows()
        @view.$el.html().should.containEql 'Pier FooBar'
