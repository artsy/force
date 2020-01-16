_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
PartnerShow = require '../../../models/partner_show'
PartnerCities = require '../../../collections/partner_cities'
PartnerFeaturedCities = require '../../../collections/partner_featured_cities'
{ fabricate } = require '@artsy/antigravity'
routes = require '../routes'

describe 'Shows routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @cities = [{"slug": "new-york-ny-usa", "name": "New York", "full_name": "New York, NY, USA", "coords": [40.71, -74.01 ] }]
    @featuredCities = [{"slug": "new-york-ny-usa", "name": "New York", "full_name": "New York, NY, USA", "coords": [40.71, -74.01 ] }]

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      @res = render: sinon.stub()

      Backbone.sync.onCall(0).yieldsTo 'success', @cities
      Backbone.sync.onCall(1).yieldsTo 'success', @featuredCities
      Backbone.sync.onCall(2).yieldsTo 'success', (_.times 10, -> fabricate 'show')

    it 'fetches the cities & featured shows and renders the index template', ->
      routes.index {}, @res
        .then =>
          Backbone.sync.args[2][1].id.should.equal '530ebe92139b21efd6000071'
          Backbone.sync.args[2][1].item_type.should.equal 'PartnerShow'
          Backbone.sync.args[2][2].url.should.containEql 'api/v1/set/530ebe92139b21efd6000071/items'
          @res.render.args[0][0].should.equal 'index'
          @res.render.args[0][1].shows.should.have.length 8
          @res.render.args[0][1].cities.should.have.length 1
          @res.render.args[0][1].featuredCities.should.have.length 1
          @res.render.args[0][1].cities[0].should.have.properties 'name', 'slug', 'coords'
          @res.render.args[0][1].featuredCities[0].should.have.properties 'name', 'slug', 'coords'

  describe '#online', ->
    beforeEach ->
      @req =
        params: { }
        query: { page: 1 }
      @res = { render: sinon.stub() }
      @next = sinon.stub()

    it 'fetches the cities & shows and renders the location_based', ->
      @upcomingShow = new PartnerShow fabricate('show', start_at: moment().add(8, 'days').format(), end_at: moment().add(15, 'days').format())
      @openingShow = new PartnerShow fabricate('show', start_at: moment().add(1, 'days').format(), end_at: moment().add(10, 'days').format())
      @currentShow = new PartnerShow fabricate('show', start_at: moment().subtract(5, 'days').format(), end_at: moment().add(5, 'days').format())
      @pastShow = new PartnerShow fabricate('show', start_at: moment().subtract(15, 'days').format(), end_at: moment().subtract(5, 'days').format())
      Backbone.sync.onCall(0).yieldsTo 'success', @cities
      Backbone.sync.onCall(1).yieldsTo 'success', @featuredCities
      Backbone.sync.onCall(2).yieldsTo 'success', [ @openingShow, @upcomingShow ]
      Backbone.sync.onCall(3).yieldsTo 'success', [ @currentShow ]
      Backbone.sync.onCall(4).yieldsTo 'success', [ @pastShow ]

      routes.onlineExlusive @req, @res, @next
        .then =>
          Backbone.sync.args[2][2].data.has_location.should.equal false
          Backbone.sync.args[3][2].data.has_location.should.equal false
          Backbone.sync.args[4][2].data.has_location.should.equal false
          @res.render.called.should.be.true()
          @res.render.getCall(0).args[0].should.equal 'location_based'
          @res.render.getCall(0).args[1].cities.should.have.length 1
          @res.render.getCall(0).args[1].featuredCities.should.have.length 1
          @res.render.getCall(0).args[1].opening.should.have.length 1
          @res.render.getCall(0).args[1].upcoming.should.have.length 1
          @res.render.getCall(0).args[1].current.should.have.length 1
          @res.render.getCall(0).args[1].past.should.have.length 1

  describe '#city', ->
    beforeEach ->
      @req =
        params: { city: 'new-york-ny-usa' }
        query: { page: 1 }
      @res = { render: sinon.stub() }
      @next = sinon.stub()


    it 'nexts with an unrecognized city', ->
      Backbone.sync.onCall(0).yieldsTo 'success', @cities
      Backbone.sync.onCall(1).yieldsTo 'success', @featuredCities

      routes.city { params: {city: 'nowheresville'} }, @res, @next
        .then =>
          @next.called.should.be.true()

    it 'fetches the cities & shows and renders the location_based template', ->
      @upcomingShow = new PartnerShow fabricate('show', start_at: moment().add(8, 'days').format(), end_at: moment().add(15, 'days').format())
      @openingShow = new PartnerShow fabricate('show', start_at: moment().add(1, 'days').format(), end_at: moment().add(10, 'days').format())
      @currentShow = new PartnerShow fabricate('show', start_at: moment().subtract(5, 'days').format(), end_at: moment().add(5, 'days').format())
      @pastShow = new PartnerShow fabricate('show', start_at: moment().subtract(15, 'days').format(), end_at: moment().subtract(5, 'days').format())
      Backbone.sync.onCall(0).yieldsTo 'success', @cities
      Backbone.sync.onCall(1).yieldsTo 'success', @featuredCities
      Backbone.sync.onCall(2).yieldsTo 'success', [ @openingShow, @upcomingShow ]
      Backbone.sync.onCall(3).yieldsTo 'success', [ @currentShow ]
      Backbone.sync.onCall(4).yieldsTo 'success', [ @pastShow ]

      routes.city @req, @res, @next
        .then =>
          @res.render.called.should.be.true()
          @res.render.getCall(0).args[0].should.equal 'location_based'
          @res.render.getCall(0).args[1].city.name.should.equal 'New York'
          @res.render.getCall(0).args[1].cities.should.have.length 1
          @res.render.getCall(0).args[1].featuredCities.should.have.length 1
          @res.render.getCall(0).args[1].opening.should.have.length 1
          @res.render.getCall(0).args[1].upcoming.should.have.length 1
          @res.render.getCall(0).args[1].current.should.have.length 1
          @res.render.getCall(0).args[1].past.should.have.length 1

    xit 'sorts the shows', (done) ->
      shows = [
        showOpeningFirst = new PartnerShow fabricate('show', start_at: moment().add(5, 'days').format(), end_at: moment().add(15, 'days').format())
        showOpeningLast = new PartnerShow fabricate('show', start_at: moment().add(15, 'days').format(), end_at: moment().add(20, 'days').format())
        showEndingFirst = new PartnerShow fabricate('show', start_at: moment().add(7, 'days').format(), end_at: moment().add(10, 'days').format())
        showEndingLast = new PartnerShow fabricate('show', start_at: moment().add(6, 'days').format(), end_at: moment().add(25, 'days').format())
      ]

      routes.city { params: city: 'new-york' }, @res, @next
      Backbone.sync.args[0][2].success shows
      Backbone.sync.args[1][2].success shows
      Backbone.sync.args[2][2].success shows

      _.defer => _.defer =>
        _.first(@res.render.args[0][1].upcoming).should.equal showOpeningFirst
        _.last(@res.render.args[0][1].upcoming).should.equal showOpeningLast

        _.first(@res.render.args[0][1].current).should.equal showEndingFirst
        _.last(@res.render.args[0][1].current).should.equal showEndingLast

        _.first(@res.render.args[0][1].past).should.equal showEndingLast
        _.last(@res.render.args[0][1].past).should.equal showEndingFirst

        done()

  describe '#redirectFromCity', ->
    it 'redirects to /shows/... path', ->
      req = { url: 'localhost:5000/city/new-york-ny-usa' }
      res = { render: sinon.stub(), redirect: sinon.stub() }
      routes.redirectFromCity req, res
      res.redirect.args[0][0].should.equal 302
      res.redirect.args[0][1].should.equal 'localhost:5000/shows/new-york-ny-usa'
