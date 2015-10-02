{ fabricate, fabricate2 } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Fair = require '../../../models/fair.coffee'
Fairs = require '../../../collections/fairs.coffee'
FairOrganizer = require '../../../models/fair_organizer.coffee'
Profile = require '../../../models/profile.coffee'
FilterSuggest = require '../../../models/filter_suggest'
FilteredSearchOptions = require '../../../models/filter_suggest'
OrderedSets = require '../../../collections/ordered_sets'
CoverImage = require '../../../models/cover_image'

describe 'Fair routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'some-fair' } }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd: { API_URL: 'http://localhost:5000', FAIR: new Fair(fabricate 'fair')}
        fair: new Fair(fabricate 'fair')
        profile: new Profile(fabricate 'fair_profile')

  afterEach ->
    Backbone.sync.restore()

  describe '#all', ->
    it 'next is called without a fair', ->
      @res.locals.sd.FAIR = undefined

      routes.info @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

      routes.forYou @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

      routes.fairArticles @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

      routes.favorites @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

      routes.follows @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

      routes.browse @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

  describe '#info', ->

    it 'renders the info template', ->
      routes.info @req, @res
      @res.locals.sd.SECTION.should.equal 'info'
      @res.render.args[0][0].should.equal 'index'

  describe '#overview', ->

    it 'renders the overview template', ->
      routes.overview @req, @res
      _.last(Backbone.sync.args)[2].success fabricate2 'filter_artworks'
      @res.locals.sd.SECTION.should.equal 'overview'
      @res.render.args[0][0].should.equal 'overview'

  describe '#foryou', ->

    it 'renders the foryou template', ->
      routes.forYou @req, @res
      @res.locals.sd.SECTION.should.equal 'forYou'
      @res.render.args[0][0].should.equal 'index'

  describe '#fairArticles', ->

    it 'renders the posts template', ->
      routes.fairArticles @req, @res
      @res.locals.sd.SECTION.should.equal 'posts'
      @res.render.args[0][0].should.equal 'index'

  describe '#favorites', ->

    it 'redirects to the homepage without a user', ->
      routes.favorites @req, @res
      @res.redirect.args[0][0].should.equal '/some-fair'

    it 'renders the favorites template', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.favorites @req, @res
      @res.render.args[0][0].should.equal 'favorites'

  describe '#follows', ->

    it 'redirects to the homepage without a user', ->
      routes.follows @req, @res
      @res.redirect.args[0][0].should.equal '/some-fair'

    it 'renders the follows template', ->
      @req.user = new CurrentUser fabricate 'user'
      @req.params.type = 'artists'
      routes.follows @req, @res
      @res.render.args[0][0].should.equal 'favorites'

  describe '#captureSignup', ->
    it 'triggers next if a user is not defined', ->
      routes.captureSignup @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

    it 'triggers next if a the action is not valid', ->
      @req.params =
        action: 'watergun'
      @req.user = new CurrentUser fabricate 'user'
      routes.captureSignup @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

    it 'follows the fair and adds a user fair action to the users collector profile', ->
      @req.params =
        action: 'attendee'
      @req.user = new CurrentUser fabricate 'user'
      routes.captureSignup @req, @res, (next = sinon.stub())
      Backbone.sync.args[0][1].get('fair_id').should.equal 'armory-show-2013'
      Backbone.sync.args[1][1].get('profile_id').should.equal 'the-armory-show'

    it 'triggers next if the action is attendee', (done)->
      @req.params =
        action: 'attendee'
      @req.user = new CurrentUser fabricate 'user'
      routes.captureSignup @req, @res, (next = sinon.stub())
      Backbone.sync.args[0][2].success()
      Backbone.sync.args[1][2].success()
      _.defer =>
        next.called.should.be.ok()
        done()

  describe '#search', ->

    it 'searches', ->
      req = { params: { id: 'some-fair' }, query: { q: 'foobar' } }
      routes.search req, @res
      _.last(Backbone.sync.args)[0].should.equal 'read'
      _.last(Backbone.sync.args)[2].data.term.should.equal 'foobar'

    it 'redirects without query', ->
      req = { params: { id: 'some-fair' }, query: { } }
      routes.search req, @res
      @res.redirect.args[0][0].should.equal '/some-fair'

  describe '#browse', ->

    it 'renders index', ->
      routes.browse @req, @res
      _.last(Backbone.sync.args)[2].success fabricate2 'filter_artworks'
      @res.render.args[0][0].should.equal 'index'

  describe '#showRedirect', ->

    it 'redirects to show page', ->
      show = fabricate('show')
      routes.showRedirect @req, @res
      _.last(Backbone.sync.args)[2].success [
        results: [show]
        next: 'foo'
      ]
      @res.redirect.args[0][0].should.containEql '/show/gagosian-gallery-inez-and-vinood'

describe '#fetchFairData', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub Fair.prototype, 'fetchOverviewData'
    sinon.stub Fair.prototype, 'fetchPrimarySets'
    @success = =>
      Fair::fetchPrimarySets.args[0][0].success()
      Fair::fetchOverviewData.args[0][0].success(
        fair: new Fair(fabricate 'fair', id: 'the-foo-show' )
        filterSuggest: new FilterSuggest({ "design": 4002, "drawing": 3772 })
        filteredSearchOptions: new FilterSuggest({ "design": 4002, "drawing": 3772 })
        filteredSearchColumns: []
        sections: new Backbone.Collection
        galleries: new Backbone.Collection([fabricate 'partner'])
        exhibitorsCount: 1
        exhibitorsAToZGroup: []
        artistsAToZGroup: []
        coverImage: new CoverImage(fabricate 'cover_image')
      )
    @cache = routes.__get__ 'cache'
    @cache.setHash = sinon.stub()

    profile = new Profile _.extend fabricate('fair_profile'), { owner_type: 'Fair', id:'thefooshow' }

    @req = { params: { id: 'the-foo-show' } }
    @res = { locals: { sd: {}, profile: profile } }
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    Fair::fetchOverviewData.restore()
    Fair::fetchPrimarySets.restore()

  it 'fetches the fair data', ->
    routes.fetchFairData @req, @res, @next
    @success()
    Fair::fetchOverviewData.called.should.be.ok()

  it 'sets a bunch of locals', ->
    routes.fetchFairData @req, @res, @next
    @success()
    @res.locals.fair.get('id').should.equal 'the-foo-show'
    @res.locals.sd.EXHIBITORS_COUNT.should.equal 1
    @res.locals.sd.FAIR.id.should.equal 'the-foo-show'
    @res.locals.sd.PROFILE.id.should.equal 'thefooshow'

  it 'caches the data in a special key', ->
    routes.fetchFairData @req, @res, @next
    @success()
    @cache.setHash.args[0][0].should.equal 'fair:the-foo-show'

  it 'caches the big blob of data', ->
    routes.fetchFairData @req, @res, @next
    @success()
    (@cache.setHash.args[0][1].fair?).should.be.ok()
    (@cache.setHash.args[0][1].filterSuggest?).should.be.ok()

describe '#fetchFairByOrganizerYear', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

    profile = new Profile _.extend fabricate('fair_organizer_profile'), owner:fabricate('fair_organizer')

    @fairs = [
      fabricate('fair', start_at: new Date("2-2-2014"), id: '2014', default_profile_id: '2014'),
      fabricate('fair', start_at: new Date("2-2-2015"), id: '2015', default_profile_id: '2015'),
      fabricate('fair', start_at: new Date("2-2-2016"), id: '2016', default_profile_id: '2016')
    ]

    @req = { params: { id: 'the-armory-show', year: '2015' } }
    @res = { locals: { sd: {}, profile: profile } }
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'fetches the correct fair by year through the fair organizer', ->
    routes.fetchFairByOrganizerYear @req, @res, @next
    Backbone.sync.args[0][2].success @fairs
    @next.called.should.not.be.ok()
    Backbone.sync.args[1][1].attributes.id.should.equal '2015'

  it 'nexts if the fair organizer does not have a fair with requested year', ->
    @req = { params: { id: 'the-armory-show', year: '2017' } }
    routes.fetchFairByOrganizerYear @req, @res, @next
    Backbone.sync.args[0][2].success @fairs
    @next.called.should.be.ok()
