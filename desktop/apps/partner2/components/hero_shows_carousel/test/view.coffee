_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
benv = require 'benv'
Partner = require '../../../../../models/partner'
PartnerShow = require '../../../../../models/partner_show'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

HeroShowsCarousel = benv.requireWithJadeify resolve(
  __dirname, '../view.coffee'
), ['template']

describe 'HeroShowsCarousel', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      @partner = new Partner fabricate 'partner'
      @view = new HeroShowsCarousel partner: @partner
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#fetchShows', ->
    it 'makes proper requests to fetch shows', ->
      @view.fetchShows()
      (requests = Backbone.sync.args).length.should.equal 4
      _.each requests, (request) =>
        request[2].url.should.endWith "#{@partner.url()}/shows"
      requests[0][2].data.should.eql size: 1, sort: '-featured,-end_at', displayable: true
      requests[1][2].data.should.eql size: 10, status: 'running', sort: 'end_at', displayable: true
      requests[2][2].data.should.eql size: 10, status: 'upcoming', sort: 'start_at', displayable: true
      requests[3][2].data.should.eql size: 10, status: 'closed', sort: '-end_at', displayable: true

    it 'returns a thenable promise', ->
      _.isFunction(@view.fetchShows().then).should.be.ok()

    describe 'with featured, current, and upcoming shows', ->
      before ->
        @featured = [new PartnerShow fabricate 'show', featured: true]
        @current = [@featured[0]]
        @upcoming = []
        @past = []
        _.each [1..3], => @current.push new PartnerShow fabricate 'show', featured: false, status: 'running'
        _.each [0..3], => @upcoming.push new PartnerShow fabricate 'show', featured: false, status: 'upcoming'
        _.each [0..3], => @past.push new PartnerShow fabricate 'show', featured: false, status: 'closed'
        @expected = @featured.concat(@current[1..3]).concat(@upcoming)

      beforeEach ->
        _.each [@featured, @current, @upcoming, @past], (collection, index) ->
          Backbone.sync
            .onCall index
            .yieldsTo 'success', collection

      it 'fetches shows and organizes them in proper order without past shows', ->
        @view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 8
          partnerShows.should.eql @expected

      it 'returns @maxNumberOfShows shows without past shows', ->
        view = new HeroShowsCarousel partner: @partner, maxNumberOfShows: 2
        view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 2
          partnerShows.should.eql @expected.slice(0, 2)

    describe 'with current and upcoming shows but without featured', ->
      before ->
        @featured = [new PartnerShow fabricate 'show', featured: false]
        @current = []
        @upcoming = []
        @past = []
        _.each [0..2], => @current.push new PartnerShow fabricate 'show', featured: false, status: 'running'
        _.each [0..3], => @upcoming.push new PartnerShow fabricate 'show', featured: false, status: 'upcoming'
        _.each [0..3], => @past.push new PartnerShow fabricate 'show', featured: false, status: 'closed'
        @expected = @current.concat(@upcoming)

      beforeEach ->
        _.each [@featured, @current, @upcoming, @past], (collection, index) ->
          Backbone.sync
            .onCall index
            .yieldsTo 'success', collection

      it 'fetches shows and organizes them in proper order without past shows', ->
        @view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 7
          partnerShows.should.eql @expected

      it 'returns @maxNumberOfShows shows without past shows', ->
        view = new HeroShowsCarousel partner: @partner, maxNumberOfShows: 2
        view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 2
          partnerShows.should.eql @expected.slice(0, 2)

    describe 'with only past shows', ->
      before ->
        @featured = []
        @current = []
        @upcoming = []
        @past = []
        _.each [0..3], => @past.push new PartnerShow fabricate 'show', featured: false, status: 'closed'
        @expected = @past

      beforeEach ->
        _.each [@featured, @current, @upcoming, @past], (collection, index) ->
          Backbone.sync
            .onCall index
            .yieldsTo 'success', collection

      it 'fetches shows and returns only 2 past shows', ->
        @view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 2
          partnerShows.should.eql @expected.slice(0, 2)

      it 'returns @maxNumberOfShows past shows', ->
        view = new HeroShowsCarousel partner: @partner, maxNumberOfShows: 1
        view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 1
          partnerShows.should.eql @expected.slice(0, 1)

  describe '#initCarousel', ->
    beforeEach ->
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes the view if no partner shows', ->
      @view.initCarousel []
      @view.remove.calledOnce.should.be.ok()
