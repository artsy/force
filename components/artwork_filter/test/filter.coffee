_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Artist = require '../../../models/artist'
{ fabricate, fabricate2 } = require 'antigravity'

describe 'Filter', ->

  before (done) ->
    benv.setup =>
      @Filter = require '../models/filter'
      done()

  after ->
    benv.teardown()

  it 'requires a model', ->
    (=> new @Filter).should.throw 'Requires a model'

  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo 'success', fabricate2('filter_artworks')
    artist = new Artist fabricate('artist', id: 'louise-bourgeois')
    @filter = new @Filter model: artist

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
      @filter.booleanId('for_sale').should.equal 'for_sale=true'
      @filter.booleanId('doesnt-exist').should.be.empty

  describe '#newState', ->
    beforeEach ->
      @filter.selected.set 'foo', 'bar'

    it 'fetches and returns a new state based on the current selected model', ->
      Backbone.sync.callCount.should.equal 0
      state = @filter.newState()
      state.id.should.equal 'foo=bar'
      Backbone.sync.args[0][2].data.should.containEql foo: 'bar'
      Backbone.sync.callCount.should.equal 1

    it 'accepts callbacks in the options', (done) ->
      @filter.newState success: -> done()

  describe '#priced', ->
    describe 'already fetched', ->
      beforeEach ->
        @priced = @filter.toggle 'for-sale', true
        @filter.by 'foo', 'bar'

      xit 'returns the already fetched priced filter state without fetching again', ->
        Backbone.sync.callCount.should.equal 2
        @filter.priced().should.equal @priced
        Backbone.sync.callCount.should.equal 2

    describe 'not yet fetched', ->
      it 'fetches the priced filter state', ->
        Backbone.sync.callCount.should.equal 0
        @filter.priced().should.be.false
        Backbone.sync.callCount.should.equal 1
        @filter.priced().id.should.equal 'for_sale=true'
        Backbone.sync.callCount.should.equal 1

      it 'triggers an update:counts event', (done) ->
        @filter.once 'update:counts', -> done()
        @filter.priced()

  describe '#toggle', ->
    beforeEach ->
      sinon.stub @Filter::, 'by'
      sinon.stub @Filter::, 'deselect'

    afterEach ->
      @filter.by.restore()
      @filter.deselect.restore()

    it 'filters by the preset criteria if true', ->
      @filter.toggle 'for_sale', 'true'
      @filter.by.called.should.be.true
      @filter.by.args[0][0].should.equal 'for_sale'
      @filter.by.args[0][1].should.equal 'true'
      @filter.deselect.called.should.be.false

    it 'deselects the appropriate key if false', ->
      @filter.toggle 'for_sale', false
      @filter.deselect.called.should.be.true
      @filter.deselect.args[0][0].should.equal 'for_sale'
      @filter.by.called.should.be.false

  describe '#by', ->
    it 'toggles filter criteria and sends the selected criteria when fetching the filter', ->
      @filter.by 'foo', 'bar'
      Backbone.sync.args[0][2].data.should.containEql foo: 'bar'
      @filter.by 'baz', 'qux'
      Backbone.sync.args[1][2].data.should.containEql baz: 'qux'
      # Only price range can be combined
      @filter.by 'for_sale', 'true'
      Backbone.sync.args[2][2].data.should.containEql baz: 'qux', for_sale: 'true'

    it 'also accepts objects', ->
      @filter.by foo: 'bar'
      Backbone.sync.args[0][2].data.foo.should.eql 'bar'

    it 'accepts options which are passed along to #fetch', (done) ->
      @filter.by 'foo', 'bar', success: -> done()

    it 'accepts options which are passed along to #fetch, when passing an object', (done) ->
      @filter.by foo: 'bar', null, success: -> done()

  describe '#deselect', ->
    beforeEach ->
      @filter.by 'medium', 'drawing'
      @filter.by 'for_sale', 'true'

    it 'unsets the filter condition', ->
      Backbone.sync.callCount.should.equal 2
      @filter.selected.has('medium').should.be.true
      @filter.deselect 'medium'
      @filter.selected.has('medium').should.be.false
      @filter.engaged.should.be.true
      Backbone.sync.callCount.should.equal 3
      @filter.filterStates.pluck('id').should.eql ['medium=drawing', 'medium=drawing&for_sale=true', 'for_sale=true']

    it 'disengages the filter when there is no selected criteria', ->
      Backbone.sync.callCount.should.equal 2
      @filter.deselect 'medium'
      @filter.deselect 'for_sale'
      # Needs to fetch root
      @filter.engaged.should.be.false
      Backbone.sync.callCount.should.equal 4
      @filter.filterStates.pluck('id').should.eql ['medium=drawing', 'medium=drawing&for_sale=true', 'for_sale=true', 'root']

    describe '#forSaleCount', ->
      xit 'returns the for sale count when the for sale boolean is toggled', ->
        @filter.set 'total', 999
        @filter.selected.has('for_sale').should.be.true
        @filter.forSaleCount().should.equal 999

      xit 'returns the for sale count when the for sale boolean is not toggled', ->
        @filter.toggle 'for_sale', false
        @filter.set 'total', 999
        @filter.forSaleCount().should.equal 74
