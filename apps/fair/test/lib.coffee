_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
fairDataMiddleware = rewire '../lib/fair_data_middleware'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Fair = require '../../../models/fair'
Profile = require '../../../models/profile'
FilterSuggest = require '../../../models/filter_suggest'
FilteredSearchOptions = require '../../../models/filter_suggest'
OrderedSets = require '../../../collections/ordered_sets'
CoverImage = require '../../../models/cover_image'

describe 'fairDataMiddleware', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub Fair.prototype, 'fetchOverviewData'
    sinon.stub Fair.prototype, 'fetchPrimarySets'
    @success = =>
      Fair::fetchPrimarySets.args[0][0].success()
      Fair::fetchOverviewData.args[0][0].success(
        fair:                  new Fair(fabricate 'fair', id: 'the-foo-show')
        profile:               new Profile(fabricate 'profile', id: 'thefooshow')
        filterSuggest:         new FilterSuggest({ "design": 4002, "drawing": 3772 })
        filteredSearchOptions: new FilterSuggest({ "design": 4002, "drawing": 3772 })
        filteredSearchColumns: []
        sections:              new Backbone.Collection
        galleries:             new Backbone.Collection([fabricate 'partner'])
        exhibitorsCount:       1
        exhibitorsAToZGroup:   []
        artistsAToZGroup:      []
        coverImage:            new CoverImage(fabricate 'cover_image')
      )
    @cache = fairDataMiddleware.__get__ 'cache'
    @cache.setHash = sinon.stub()
    @req = { params: { id: 'the-foo-show' } }
    @res = { locals: { sd: {}, profile: new Profile(fabricate('profile', owner_type: 'FairOrganizer')) } }
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    Fair::fetchOverviewData.restore()
    Fair::fetchPrimarySets.restore()

  it 'fetches the fair data', ->
    fairDataMiddleware @req, @res, @next
    @success()
    Fair::fetchOverviewData.called.should.be.ok

  it 'sets a bunch of locals', ->
    fairDataMiddleware @req, @res, @next
    @success()
    @res.locals.fair.get('id').should.equal 'the-foo-show'
    @res.locals.sd.EXHIBITORS_COUNT.should.equal 1
    @res.locals.sd.FAIR.id.should.equal 'the-foo-show'
    @res.locals.sd.PROFILE.id.should.equal 'thefooshow'

  it 'caches the data in a special key', ->
    fairDataMiddleware @req, @res, @next
    @success()
    @cache.setHash.args[0][0].should.equal 'fair:the-foo-show'

  it 'caches the big blob of data', ->
    fairDataMiddleware @req, @res, @next
    @success()
    (@cache.setHash.args[0][1].fair?).should.be.ok
    (@cache.setHash.args[0][1].profile?).should.be.ok