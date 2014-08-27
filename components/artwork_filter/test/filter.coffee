_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Artist = require '../../../models/artist'
{ fabricate } = require 'antigravity'
Filter = require '../models/filter'

describe 'Filter', ->
  it 'requires a model', ->
    (=> new Filter).should.throw 'Requires a model'

  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo 'success', fabricate 'artist_filtered_search_suggest'
    artist = new Artist fabricate('artist', id: 'louise-bourgeois')
    @filter = new Filter model: artist

  afterEach ->
    Backbone.sync.restore()

  describe '#stateId', ->
    it 'is root if there are no selected attributes', ->
      @filter.stateId().should.equal 'root'

    it 'is the stringified selected attributes object otherwise', ->
      @filter.selected.set foo: 'bar', baz: 'qux'
      @filter.stateId().should.equal 'foo=bar&baz=qux'

  describe '#booleanId', ->
    it 'returns the ID of any booleans', ->
      @filter.booleanId('for-sale').should.equal 'price_range=-1%3A1000000000000'
      @filter.booleanId('doesnt-exist').should.be.empty

  describe '#newState', ->
    beforeEach ->
      @filter.selected.set 'foo', 'bar'

    it 'fetches and returns a new state based on the current selected model', ->
      Backbone.sync.callCount.should.equal 0
      state = @filter.newState()
      state.id.should.equal 'foo=bar'
      Backbone.sync.args[0][2].data.should.eql foo: 'bar'
      Backbone.sync.callCount.should.equal 1

    it 'accepts callbacks in the options', (done) ->
      @filter.newState success: -> done()

  describe '#priced', ->
    describe 'already fetched', ->
      beforeEach ->
        @priced = @filter.toggle 'for-sale', true
        @filter.by 'foo', 'bar'

      it 'returns the already fetched priced filter state without fetching again', ->
        Backbone.sync.callCount.should.equal 2
        @filter.priced().should.equal @priced
        Backbone.sync.callCount.should.equal 2

    describe 'not yet fetched', ->
      it 'fetches the priced filter state', ->
        Backbone.sync.callCount.should.equal 0
        @filter.priced().should.be.false
        Backbone.sync.callCount.should.equal 1
        @filter.priced().id.should.equal 'price_range=-1%3A1000000000000'
        Backbone.sync.callCount.should.equal 1

      it 'triggers an update:counts event', (done) ->
        @filter.once 'update:counts', -> done()
        @filter.priced()

  describe '#toggle', ->
    beforeEach ->
      sinon.stub Filter::, 'by'
      sinon.stub Filter::, 'deselect'

    afterEach ->
      @filter.by.restore()
      @filter.deselect.restore()

    it 'filters by the preset criteria if true', ->
      @filter.toggle 'for-sale', true
      @filter.by.called.should.be.true
      @filter.by.args[0][0].should.equal 'price_range'
      @filter.by.args[0][1].should.equal '-1:1000000000000'
      @filter.deselect.called.should.be.false

    it 'deselects the appropriate key if false', ->
      @filter.toggle 'for-sale', false
      @filter.deselect.called.should.be.true
      @filter.deselect.args[0][0].should.equal 'price_range'
      @filter.by.called.should.be.false

  describe '#by', ->
    it 'toggles filter criteria and sends the selected criteria when fetching the filter', ->
      @filter.by 'foo', 'bar'
      Backbone.sync.args[0][2].data.should.eql foo: 'bar'
      @filter.by 'baz', 'qux'
      Backbone.sync.args[0][2].data.should.eql baz: 'qux'
      # Only price range can be combined
      @filter.by 'price_range', 'x'
      Backbone.sync.args[0][2].data.should.eql baz: 'qux', price_range: 'x'
      @filter.by 'foo', 'bar'
      Backbone.sync.args[0][2].data.should.eql foo: 'bar', price_range: 'x'
      @filter.deselect 'foo'
      Backbone.sync.args[0][2].data.should.eql price_range: 'x'

    it 'also accepts objects', ->
      @filter.by foo: 'bar'
      Backbone.sync.args[0][2].data.should.eql foo: 'bar'
      @filter.by foo: 'foo', price_range: 'x'
      Backbone.sync.args[0][2].data.should.eql foo: 'foo', price_range: 'x'

    it 'accepts options which are passed along to #fetch', (done) ->
      @filter.by 'foo', 'bar', success: -> done()

    it 'accepts options which are passed along to #fetch, when passing an object', (done) ->
      @filter.by foo: 'bar', null, success: -> done()

  describe '#deselect', ->
    beforeEach ->
      @filter.by 'medium', 'drawing'
      @filter.by 'price_range', 'x'

    it 'unsets the filter condition', ->
      Backbone.sync.callCount.should.equal 2
      @filter.selected.has('medium').should.be.true
      @filter.deselect 'medium'
      @filter.selected.has('medium').should.be.false
      @filter.engaged.should.be.true
      Backbone.sync.args[0][2].data.should.eql price_range: 'x'
      Backbone.sync.callCount.should.equal 3
      @filter.filterStates.pluck('id').should.eql ['medium=drawing', 'medium=drawing&price_range=x', 'price_range=x']

    it 'disengages the filter when there is no selected criteria', ->
      Backbone.sync.callCount.should.equal 2
      @filter.deselect 'medium'
      @filter.deselect 'price_range'
      # Needs to fetch root
      @filter.engaged.should.be.false
      Backbone.sync.callCount.should.equal 4
      @filter.filterStates.pluck('id').should.eql ['medium=drawing', 'medium=drawing&price_range=x', 'price_range=x', 'root']

    describe '#forSaleCount', ->
      it 'returns the for sale count when the for sale boolean is toggled', ->
        @filter.set 'total', 999
        @filter.selected.has('price_range').should.be.true
        @filter.forSaleCount().should.equal 999

      it 'returns the for sale count when the for sale boolean is not toggled', ->
        @filter.toggle 'for-sale', false
        @filter.set 'total', 999
        @filter.forSaleCount().should.equal 58
