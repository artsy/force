_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
PartnerShow = require '../../../models/partner_show'
{ fabricate } = require 'antigravity'
routes = require '../routes'

describe 'Shows routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      @res = render: sinon.stub()

    it 'fetches the set and renders the index template', ->
      routes.index {}, @res
      Backbone.sync.args[0][1].id.should.equal '530ebe92139b21efd6000071'
      Backbone.sync.args[0][1].item_type.should.equal 'PartnerShow'
      Backbone.sync.args[0][2].url.should.containEql 'api/v1/set/530ebe92139b21efd6000071/items'
      Backbone.sync.args[0][2].success(_.times 10, -> fabricate 'show')
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].shows.length.should.equal 8


  describe '#city', ->
    beforeEach ->
      @res = render: sinon.stub()
      @next = sinon.stub()

    it 'nexts if the city is not valid', ->
      routes.city { params: city: 'foobar' }, @res, @next
      @next.called.should.be.true()

    it 'fetches all the shows and renders the city template', (done) ->
      routes.city { params: { city: 'new-york' }, query: {} }, @res, @next
      Backbone.sync.callCount.should.equal 3
      Backbone.sync.args[0][2].data.near.should.equal '40.7127837,-74.0059413'
      Backbone.sync.args[0][2].data.status.should.equal 'upcoming'
      Backbone.sync.args[0][2].data.sort.should.equal 'start_at'
      Backbone.sync.args[0][2].data.displayable.should.equal true
      Backbone.sync.args[0][2].data.at_a_fair.should.equal false
      Backbone.sync.args[1][2].data.near.should.equal '40.7127837,-74.0059413'
      Backbone.sync.args[1][2].data.status.should.equal 'running'
      Backbone.sync.args[1][2].data.sort.should.equal 'end_at'
      Backbone.sync.args[1][2].data.displayable.should.equal true
      Backbone.sync.args[1][2].data.at_a_fair.should.equal false
      Backbone.sync.args[2][2].data.near.should.equal '40.7127837,-74.0059413'
      Backbone.sync.args[2][2].data.status.should.equal 'closed'
      Backbone.sync.args[2][2].data.sort.should.equal '-start_at'
      Backbone.sync.args[2][2].data.displayable.should.equal true
      Backbone.sync.args[2][2].data.at_a_fair.should.equal false
      _.defer => _.defer =>
        @res.render.called.should.be.true()
        @res.render.args[0][0].should.equal 'city'
        @res.render.args[0][1].city.name.should.equal 'New York'
        done()

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
