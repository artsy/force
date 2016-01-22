_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
benv = require 'benv'
Partner = require '../../../../../models/partner.coffee'
PartnerShow = require '../../../../../models/partner_show.coffee'
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
    before ->
      @featured = [new PartnerShow fabricate 'show', featured: true]
      @current = [@featured[0]]
      @upcoming = []
      @past = []
      _.each [1..3], (i) => @current.push new PartnerShow fabricate 'show', featured: false, status: 'running'
      _.each [0..3], (i) => @upcoming.push new PartnerShow fabricate 'show', featured: false, status: 'upcoming'
      _.each [0..3], (i) => @past.push new PartnerShow fabricate 'show', featured: false, status: 'closed'

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
      _.isFunction(@view.fetchShows().then).should.be.ok

    it 'fetches shows and organizes them in proper order', (done) ->
      @view.fetchShows().then (partnerShows) =>
        partnerShows.length.should.equal 10
        expected = @featured.concat(@current[1..3]).concat(@upcoming).concat(@past[0..1])
        partnerShows.should.eql expected
        done()

      requests = Backbone.sync.args
      requests[0][2].success @featured
      requests[1][2].success @current
      requests[2][2].success @upcoming
      requests[3][2].success @past

  describe '#initCarousel', ->
    beforeEach ->
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes the view if no partner shows', ->
      @view.initCarousel []
      @view.remove.calledOnce.should.be.ok
