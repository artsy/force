_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
Fair = require '../../models/fair'
moment = require 'moment'

describe 'Fair', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @fair = new Fair fabricate('fair')

  afterEach ->
    Backbone.sync.restore()

  describe '#isNotOver', ->
    it 'checks the UTC timezone of a fair\'s end_at field compared to now', ->
      fair = new Fair fabricate('fair', end_at: '2018-12-13T22:00:00-05:00')
      utcMoment = moment.utc('2018-12-14T07:00:00-00:00')
      realNow = Date.now
      Date.now = () -> utcMoment
      fair.isNotOver().should.equal true
      Date.now = realNow

  describe '#nameSansYear', ->
    it 'returns the name without the year', ->
      new Fair name: 'Foo Fair 2015'
        .nameSansYear().should.equal 'Foo Fair'
      new Fair name: 'Bar Fair'
        .nameSansYear().should.equal 'Bar Fair'
      new Fair name: 'Baz 2015 Fair'
        .nameSansYear().should.equal 'Baz 2015 Fair'

  describe '#href', ->

    it "returns the client link to this fair", ->
      @fair.href().should.equal "/#{@fair.get('organizer').profile_id}"

  describe '#fairOrgHref', ->
    dt = moment().utc().format()
    @fair = new Fair fabricate('fair', autopublish_artworks_at: dt)

    it "returns the client link to this fair", ->
      @fair.fairOrgHref().should.equal "/#{@fair.get('organizer').profile_id}/#{moment(dt).year()}"

  describe '#fetchShowForPartner', ->

    it 'handles api resposne', (done) ->
      show = fabricate('show')
      @fair.fetchShowForPartner 'partner-id',
        success: (fetchedShow) ->
          fetchedShow.id.should.equal show.id
          done()

      Backbone.sync.args[0][2].success [
        results: [show]
        next: 'foo'
      ]

  describe '#fetchOverviewData', ->

    it 'fetches a ton of data in parallel for the fair page', ->
      @fair.fetchOverviewData({})
      _.last(Backbone.sync.args)[2].success new Backbone.Model fabricate 'profile'
      urls = (_.result(call[1], 'url') or call[2].url for call in Backbone.sync.args)
      urls[0].should.match /// api/v1/fair/.* ///
      urls[1].should.match /// api/v1/fair/.*/sections ///
      urls[2].should.match /// api/v1/fair/.*/partners ///
      urls[3].should.match /// api/v1/fair/.*/artists ///

  describe '#itemsToColumns', ->

    it 'doesnt chop off items', ->
      items = [
        {
          name: '20th Century Design',
          href: '/fog-fair-design-plus-art/browse/artworks?related_gene=20th-century-design'
        }
        {
          name: 'Contemporary Design',
          href: '/fog-fair-design-plus-art/browse/artworks?related_gene=contemporary-design'
        }
        {
          name: 'West Coast Galleries',
          href: '/fog-fair-design-plus-art/browse/artworks?related_gene=west-coast-galleries'
        }
      ]
      _.flatten(@fair.itemsToColumns(items, 2)).length.should.equal 3

