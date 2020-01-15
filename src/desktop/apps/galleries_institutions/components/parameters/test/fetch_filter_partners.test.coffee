Backbone = require 'backbone'
Q = require 'bluebird-q'
_ = require 'underscore'
rewire = require 'rewire'
{ fabricate } = require '@artsy/antigravity'
Params = require '../filter_params.coffee'
FetchFilterPartners = rewire '../fetch_filter_partners.coffee'
aggregationsResponse = require './aggregations_response.json'
sinon = require 'sinon'

nPartners = (n) ->
  [1..n].map (n) ->
    fabricate 'partner', _id: _.uniqueId(), id: _.uniqueId()

FetchFilterPartners.__set__ 'Cities', [{"slug": "new-york-ny-usa", "name": "New York", "full_name": "New York, NY, USA", "coords": [40.71, -74.01 ] }]

describe 'FetchFilterPartners', ->
  describe '#initialize', ->
    beforeEach ->
      @params = new Params { location: 'new-york-ny-usa', category: 'painting', type: 'gallery' }
      @filterPartners = new FetchFilterPartners params: @params, term: 'test'

    it 'sets all starting values', ->
      @filterPartners.page.should.equal(1)
      @filterPartners.partners.length.should.equal(0)
      @filterPartners.aggregations.attributes.should.be.empty()
      @filterPartners.totalResults.should.equal(0)
      @filterPartners.fetching?.should.be.false()
      @filterPartners.allFetched?.should.be.false()

  describe '#reset', ->
    beforeEach ->
      @params = new Params { location: 'new-york-ny-usa', category: 'painting', type: 'gallery' }
      @filterPartners = new FetchFilterPartners params: @params

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

  describe 'formatVariables', ->
    describe 'with parameters', ->
      beforeEach ->
        @params = new Params { location: 'new-york-ny-usa', category: 'painting', type: 'gallery' }
        @filterPartners = new FetchFilterPartners params: @params
        @filterPartnersWithSearch = new FetchFilterPartners params: @params, term: 'search term'

      it 'includes correct types for galleries', ->
        variables = @filterPartners.formatVariables()
        variables.type.should.deepEqual ['GALLERY']

      it 'includes correct types for institutions', ->
        @params.set type: 'institution'
        variables = @filterPartners.formatVariables()
        variables.type.should.deepEqual ['INSTITUTION', 'INSTITUTIONAL_SELLER']

      it 'formats city', ->
        variables = @filterPartners.formatVariables()
        variables.near.should.equal "40.71,-74.01"

      it 'includes term when it was initialized with term', ->
        variables = @filterPartnersWithSearch.formatVariables()
        variables.term.should.equal 'search term'

      it 'should not include term when it was not initialized with term', ->
        variables = @filterPartners.formatVariables()
        variables.should.not.have.keys 'term'

      it 'excludes keys absent from parameters', ->
        @filterPartners.unset 'location', 'category'
        variables = @filterPartners.formatVariables()
        variables.should.not.have.keys 'near',
        variables.should.have.keys(
          'category',
          'near',
          'page',
          'includeAggregations',
          'includeResults',
          'type'
        )

      describe 'first page', ->
        it 'requests aggregations and results', ->
          variables = @filterPartners.formatVariables()
          variables.includeAggregations.should.be.true()
          variables.includeResults.should.be.true()
          variables.page.should.equal 1

      describe 'subsequent pages', ->
        it 'requests results only', ->
          @filterPartners.page = 2
          variables = @filterPartners.formatVariables()
          variables.includeAggregations.should.be.false()
          variables.includeResults.should.be.true()
          variables.page.should.equal 2

    describe 'without facet parameters', ->
      beforeEach ->
        @params = new Params { type: 'gallery' }
        @filterPartners = new FetchFilterPartners params: @params
        @filterPartnersWithSearch = new FetchFilterPartners params: @params, term: 'search term'

      it 'requests aggregations and not results', ->
        variables = @filterPartners.formatVariables()
        variables.includeAggregations.should.be.true()
        variables.includeResults.should.be.false()
        variables.should.have.keys 'page', 'includeAggregations', 'includeResults', 'type'
        variables.should.not.have.keys 'near', 'category'

      it 'should not include resutls when we dont have facet params and search term', ->
        variables = @filterPartners.formatVariables()
        variables.includeResults.should.be.false()

      it 'should include results when we dont have facet params but we have term', ->
        variables = @filterPartnersWithSearch.formatVariables()
        variables.includeResults.should.be.true()

  describe '#fetch', (done) ->
    describe 'with parameters', ->
      describe 'first page', ->
        beforeEach ->
          results = results:
            total: 15
            hits: nPartners(10)

          @stub = sinon.stub()
          FetchFilterPartners.__set__ 'metaphysics', @stub
          @stub.returns Q.promise (resolve, reject) ->
            resolve _.extend {}, results, aggregationsResponse

          @params = new Params { location: 'new-york-ny-usa', category: 'painting', type: 'gallery' }
          @filterPartners = new FetchFilterPartners params: @params, term: 'search term'

        afterEach ->
          @filterPartners.off 'partnerAdded'

        it 'increments page', ->
          @filterPartners.fetch().then =>
            @filterPartners.page.should.equal(2)

        it 'updates aggregations', ->
          @filterPartners.fetch().then =>
            @filterPartners.aggregations.get('location').total.should.equal(12)
            @filterPartners.aggregations.get('location').countItems.length.should.equal(3)
            @filterPartners.aggregations.get('category').total.should.equal(13)
            @filterPartners.aggregations.get('category').countItems.length.should.equal(5)

        it 'updates partners', ->
          @filterPartners.fetch().then =>
            @filterPartners.partners.length.should.equal(10)

        it 'triggers partersAdded event', ->
          @filterPartners.on 'partnersAdded', (partners) ->
            partners.length.should.equal(10)
          @filterPartners.fetch()

        it 'includes correct default parameters in query', ->
          @filterPartners.fetch().then =>
            @stub.args[0][0].query.should.containEql 'eligible_for_listing:true'
            @stub.args[0][0].query.should.containEql 'default_profile_public:true'

        it 'provides correct parameters to metaphysics', ->
          @filterPartners.fetch().then =>
            @stub.args[0][0].variables.should.deepEqual {
              category: 'painting',
              type: [ 'GALLERY' ],
              near: '40.71,-74.01',
              term: 'search term',
              page: 1,
              includeAggregations: true,
              includeResults: true
            }

        describe 'allFetched', ->
          it 'is set to false if results are less than total', ->
            @filterPartners.fetch().then =>
              @filterPartners.allFetched.should.be.false()

          it 'is set to true if results reaches total', ->
            results = results:
              total: 1
              hits: nPartners(10)

            FetchFilterPartners.__set__ 'metaphysics', ->
              Q.promise (resolve, reject) ->
                return resolve _.extend {}, results, aggregationsResponse

            @filterPartners.fetch().then =>
              @filterPartners.allFetched.should.be.true()

      describe 'subsequent fetch for given params', ->
        beforeEach ->
          @stub = sinon.stub()
          FetchFilterPartners.__set__ 'metaphysics', @stub
          @stub.returns Q.promise (resolve, reject) ->
            resolve results: hits: nPartners(10)

          @params = new Params { location: 'new-york-ny-usa', category: 'painting', type: 'gallery' }
          @filterPartners = new FetchFilterPartners params: @params
          @filterPartners.page = 2
          @filterPartners.partners = nPartners(10)
          @filterPartners.totalResults = 21
          @filterPartners.aggregations.set
            category:
              total: 1, countItems: [{ name: 'name', id: 'id', count: '1' }]
            location:
              total: 1, countItems: [{ name: 'name', id: 'id', count: '1' }]

        it 'increments page', ->
          @filterPartners.fetch().then =>
            @filterPartners.page.should.equal(3)

        it 'does not affect aggregations', ->
          @filterPartners.fetch().then =>
            @filterPartners.aggregations.get('location').total.should.equal(1)
            @filterPartners.aggregations.get('location').countItems.length.should.equal(1)
            @filterPartners.aggregations.get('category').total.should.equal(1)
            @filterPartners.aggregations.get('category').countItems.length.should.equal(1)

        it 'updates partners', ->
          @filterPartners.fetch().then =>
            @filterPartners.partners.length.should.equal(20)

        it 'triggers partersAdded event', ->
          @filterPartners.on 'partnersAdded', (newPartners) ->
            newPartners.length.should.equal(10)
          @filterPartners.fetch()

        it 'provides correct parameters to metaphysics', ->
          @filterPartners.fetch().then =>
            @stub.args[0][0].variables.should.deepEqual {
              category: 'painting',
              type: [ 'GALLERY' ],
              near: '40.71,-74.01',
              page: 2,
              includeAggregations: false,
              includeResults: true
            }

        describe 'allFetched', ->
          it 'is set to false if results are less than total', ->
            @filterPartners.fetch().then =>
              @filterPartners.allFetched.should.be.false()

          it 'is set to true if results reaches total', ->
            @filterPartners.totalResults = 20
            @filterPartners.fetch().then =>
              @filterPartners.allFetched.should.be.true()

    describe 'without any params', ->
      beforeEach ->
        @stub = sinon.stub()
        FetchFilterPartners.__set__ 'metaphysics', @stub
        @stub.returns Q.promise (resolve, reject) ->
          resolve  aggregationsResponse

        @params = new Params { type: 'gallery' }
        @filterPartners = new FetchFilterPartners params: @params

      it 'updates aggregations', ->
        @filterPartners.fetch().then =>
          @filterPartners.aggregations.get('location').total.should.equal(12)
          @filterPartners.aggregations.get('location').countItems.length.should.equal(3)
          @filterPartners.aggregations.get('category').total.should.equal(13)
          @filterPartners.aggregations.get('category').countItems.length.should.equal(5)

      it 'omits results', ->
        @filterPartners.fetch().then =>
          @filterPartners.partners.length.should.equal(0)

      it 'should be allFetched', ->
        @filterPartners.fetch().then =>
          @filterPartners.allFetched.should.be.true()

       it 'provides correct parameters to metaphysics', ->
          @filterPartners.fetch().then =>
            @stub.args[0][0].variables.should.deepEqual {
              type: [ 'GALLERY' ],
              page: 1,
              includeAggregations: true,
              includeResults: false
            }
