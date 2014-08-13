_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Filter = require '../models/filter'

describe 'Filter', ->
  it 'requires an ID', ->
    (=> new Filter).should.throw 'Requires an ID'

  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo 'success', fabricate 'artist_filtered_search_suggest'
    @filter = new Filter null, id: 'louise-bourgeois'

  afterEach ->
    Backbone.sync.restore()

  describe '#criteria', ->
    beforeEach ->
      @filter.fetch()

    it 'selects the filter sections from the response', ->
      _.keys(@filter.criteria()).should.eql ['medium', 'gallery', 'institution', 'period']

    it 'sets up some labels by humanizing the keys', ->
      @filter.criteria().medium.label.should.equal 'Medium'
      @filter.criteria().medium.filters[0].label.should.equal 'Work On Paper'

    it 'sorts the filters by count', ->
      _.pluck(@filter.criteria().medium.filters, 'count').should.eql [41, 23, 10, 8, 7, 1, 1]

    it 'it leaves the period filters in chronological order', ->
      _.pluck(@filter.criteria().period.filters, 'key').should.eql ['1940', '1960', '1970', '1980', '1990', '2000', '2010']

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
    it 'builds up query data and sends the selected criteria when fetching the filter', ->
      @filter.by 'foo', 'bar'
      Backbone.sync.args[0][2].data.should.eql foo: 'bar'
      @filter.by 'baz', 'qux'
      Backbone.sync.args[0][2].data.should.eql foo: 'bar', baz: 'qux'
      @filter.deselect 'baz'
      Backbone.sync.args[0][2].data.should.eql foo: 'bar'

  describe '#deselect', ->
    beforeEach ->
      @filter.by 'medium', 'drawing'
      @filter.by 'period', '1940'

    it 'unsets the filter condition', ->
      Backbone.sync.callCount.should.equal 2
      @filter.selected.has('medium').should.be.true
      @filter.deselect 'medium'
      @filter.selected.has('medium').should.be.false
      @filter.engaged.should.be.true
      Backbone.sync.args[0][2].data.should.eql period: '1940'
      Backbone.sync.callCount.should.equal 3

    it 'disengages the filter when there is no selected criteria', ->
      Backbone.sync.callCount.should.equal 2
      @filter.deselect 'medium'
      @filter.deselect 'period'
      @filter.engaged.should.be.false
      Backbone.sync.callCount.should.equal 4

  describe '#fetch', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success', example: 'example'

    it 'keeps a history of fetches so we dont grab the same filter state more than once', ->
      @filter.by 'baz', 'qux'
      Backbone.sync.callCount.should.equal 1
      @filter.history.length.should.equal 1
      @filter.history.last().attributes.should.eql id: 'baz=qux', data: example: 'example'
      @filter.attributes.should.eql example: 'example'
      # Modify this history state to test restoration
      @filter.history.last().set 'data', example: 'sentinel'

      @filter.by 'fresh', 'noodles'
      Backbone.sync.callCount.should.equal 2
      @filter.history.length.should.equal 2
      @filter.history.last().attributes.should.eql id: 'baz=qux&fresh=noodles', data: example: 'example'
      @filter.attributes.should.eql example: 'example'

      @filter.deselect 'fresh'
      Backbone.sync.callCount.should.equal 2
      @filter.history.length.should.equal 2
      # Restored the previous history state
      @filter.get('example').should.equal 'sentinel'

      # Reselect same filter
      @filter.by 'baz', 'qux'
      Backbone.sync.callCount.should.equal 2
      @filter.history.length.should.equal 2

      # Reselect same filter with different value
      @filter.by 'baz', 'quxx'
      Backbone.sync.callCount.should.equal 3
      @filter.history.length.should.equal 3
