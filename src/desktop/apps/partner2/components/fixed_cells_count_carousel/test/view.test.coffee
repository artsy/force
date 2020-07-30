_ = require 'underscore'
sinon = require 'sinon'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
Partner = require '../../../../../models/partner.coffee'
PartnerShow = require '../../../../../models/partner_show.coffee'
PartnerShows = require '../../../../../collections/partner_shows.coffee'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

FixedCellsCountCarousel = rewire '../view.coffee'

describe 'FixedCellsCountCarousel', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      @partner = new Partner fabricate 'partner'
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'allows passing fetchOptions as an object and converts it to an array', ->
      fetchOptions = page: 1, size: 20, sort: '-start_at'
      view = new FixedCellsCountCarousel
        partner: @partner
        collection: new PartnerShows
        fetchOptions: fetchOptions
      view.fetchOptions.should.be.an.Array()
      view.fetchOptions.should.eql [fetchOptions]

    it 'raises an error if no collection provided', ->
      partner = @partner
      (-> new FixedCellsCountCarousel
        partner: partner
        fetchOptions: page: 1, size: 15
      ).should.throw 'no collection provided'

  describe '#fetch', ->
    describe 'with single fetch', ->
      beforeEach ->
        @fetchOptions = status: 'current', sort: 'start_at', size: 9
        @collection = new PartnerShows
        @view = new FixedCellsCountCarousel
          partner: @partner
          collection: @collection
          fetchOptions: @fetchOptions
          template: sinon.stub()

      it 'makes proper requests to fetch collection', ->
        @view.fetch()
        (requests = Backbone.sync.args).should.have.lengthOf 1
        requests[0][1].url.should.endWith @collection.url
        requests[0][2].data.should.eql @fetchOptions

      it 'returns a thenable promise', ->
        _.isFunction(@view.fetch().then).should.be.ok()

      it 'fetches and returns collection', ->
        shows = [fabricate('show'), fabricate('show'), fabricate('show')]
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', shows
          .returns Promise.resolve shows

        @view.fetch().then (collection) =>
          collection.length.should.equal 3
          _.pluck(collection.models, 'attributes').should.deepEqual shows
          collection.models.should.deepEqual @collection.models

    describe 'with multiple fetch', ->
      beforeEach ->
        @fetchOptions = [
          { status: 'current', sort: 'start_at' }
          { status: 'closed', sort: '-end_at' }
        ]
        @collection = new PartnerShows
        @view = new FixedCellsCountCarousel
          partner: @partner
          collection: @collection
          fetchOptions: @fetchOptions
          template: sinon.stub()

      it 'makes proper requests to fetch collection', ->
        @view.fetch()
        (requests = Backbone.sync.args).should.have.lengthOf 2
        requests[0][1].url.should.endWith @collection.url
        requests[0][2].data.should.eql @fetchOptions[0]
        requests[1][1].url.should.endWith @collection.url
        requests[1][2].data.should.eql @fetchOptions[1]

      it 'returns a thenable promise', ->
        _.isFunction(@view.fetch().then).should.be.ok()

      it 'fetches and returns collection', ->
        shows1 = [fabricate('show'), fabricate('show'), fabricate('show')]
        shows2 = [fabricate('show'), fabricate('show')]
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', shows1
          .returns Promise.resolve shows1

        Backbone.sync
          .onCall 1
          .yieldsTo 'success', shows2
          .returns Promise.resolve shows2

        @view.fetch().then (collection) =>
          collection.length.should.equal 5
          _.pluck(collection.models, 'attributes').should.deepEqual shows1.concat shows2
          collection.models.should.deepEqual @collection.models

      it 'works with articles', ->
        articles1 = results: [fabricate('article')]
        articles2 = results: [fabricate('article')]
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', articles1
          .returns Promise.resolve articles1

        Backbone.sync
          .onCall 1
          .yieldsTo 'success', articles2
          .returns Promise.resolve articles2

        @view.fetch().then (collection) =>
          collection.length.should.equal 2
          _.pluck(collection.models, 'attributes').should.deepEqual articles1.results.concat articles2.results
          collection.models.should.deepEqual @collection.models

      it 'preserves order', ->
        shows1 = [fabricate('show'), fabricate('show'), fabricate('show')]
        shows2 = [fabricate('show'), fabricate('show')]
        Backbone.sync
          .onCall 0
          .returns Promise.resolve shows1

        Backbone.sync
          .onCall 1
          .returns Promise.resolve shows2

        promise = @view.fetch().then (collection) =>
          collection.length.should.equal 5
          _.pluck(collection.models, 'attributes').should.deepEqual shows1.concat shows2
          collection.models.should.deepEqual @collection.models
        resolveFirst = -> Backbone.sync.args[0][2].success shows1
        resolveSecond = -> Backbone.sync.args[1][2].success shows2
        resolveSecond()
        resolveFirst()
        return promise

  describe '#consolidate', ->
    beforeEach ->
      @view = new FixedCellsCountCarousel
        partner: @partner
        collection: new PartnerShows
        fetchOptions: @fetchOptions
        cellsCountPerPage: 1
        pagesCount: 2

    it 'returns a collection', ->
      collection = new PartnerShows [fabricate('show')]
      consolidated = @view.consolidate collection
      consolidated.should.be.an.instanceOf PartnerShows

    it 'keeps the first cellsCountPerPage * pagesCount items', ->
      collection = new PartnerShows [fabricate('show'), fabricate('show'), fabricate('show')]
      consolidated = @view.consolidate collection
      consolidated.should.have.lengthOf 2
      consolidated.models.should.eql collection.first(2)

    it 'keeps all the items if containing fewer than cellsCountPerPage * pagesCount items', ->
      collection = new PartnerShows [fabricate('show')]
      consolidated = @view.consolidate collection
      consolidated.should.have.lengthOf 1
      consolidated.models.should.eql collection.models

  describe '#initCarousel', ->
    beforeEach ->
      FixedCellsCountCarousel.__set__ 'initCarousel', @initCarousel = sinon.stub()
      @collection = new PartnerShows
      @view = new FixedCellsCountCarousel
        partner: @partner
        collection: @collection
        fetchOptions: @fetchOptions
        cellsCountPerPage: 2
        template: @template = sinon.stub()
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes the view if no collection', ->
      @view.initCarousel()
      @view.remove.calledOnce.should.be.ok()

    it 'removes the view if empty collection', ->
      @view.initCarousel new PartnerShows
      @view.remove.calledOnce.should.be.ok()

    describe 'carousel displayable', ->
      before ->
        @collection = new PartnerShows _.map([1..3], -> fabricate 'show')

      it 'renders the template with carousel nav', ->
        @view.initCarousel @collection
        @template.calledOnce.should.be.ok()
        @template.calledWithExactly(collection: @collection, displayNav: true).should.be.ok()

      it 'initializes the carousel', ->
        @view.initCarousel @collection
        @initCarousel.calledOnce.should.be.ok()

    describe 'carousel not displayable', ->
      before ->
        @collection = new PartnerShows _.map([1..2], -> fabricate 'show')

      it 'does not render carousel nav', ->
        @view.initCarousel @collection
        @template.calledOnce.should.be.ok()
        @template.calledWithExactly(collection: @collection, displayNav: false).should.be.ok()

      it 'does initialize the carousel', ->
        @view.initCarousel @collection
        @initCarousel.called.should.not.be.ok()
