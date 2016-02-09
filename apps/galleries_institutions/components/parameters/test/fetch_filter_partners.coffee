Backbone = require 'backbone'
Params = require '../filter_params.coffee'
FetchFilterPartners = require '../fetch_filter_partners.coffee'

describe 'FetchFilterPartners', ->
  beforeEach ->
    @params = new Params {location: 'new-york', category: 'painting', type: 'gallery'}
    @filterPartners = new FetchFilterPartners params: @params

  describe '#initialize', ->
    it 'sets all starting values', ->
      @filterPartners.page.should.equal(1)
      @filterPartners.partners.length.should.equal(0)
      @filterPartners.aggregations.attributes.should.be.empty()
      @filterPartners.totalResults.should.equal(0)
      @filterPartners.fetching?.should.be.false()
      @filterPartners.allFetched?.should.be.false()

  describe '#reset', ->
    afterEach ->
      @filterPartners.off 'reset'

    it 'resets all values', ->
      @filterPartners.page = 2
      @filterPartners.partners = [{}]
      @filterPartners.aggregations.set a: 'b'
      @filterPartners.totalResults = 12
      @filterPartners.allFetched = true

      @filterPartners.reset()

      @filterPartners.page.should.equal(1)
      @filterPartners.partners.length.should.equal(0)
      @filterPartners.aggregations.isEmpty().should.be.true()
      @filterPartners.totalResults.should.equal(0)
      @filterPartners.allFetched.should.be.false()

    it 'emits reset event', (done) ->
      @filterPartners.on 'reset', ->
        done()
      @filterPartners.reset()