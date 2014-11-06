_ = require 'underscore'
Selected = require '../models/selected'

describe 'Selected', ->
  beforeEach ->
    @selected = new Selected

  describe '#visibleAttributes', ->
    it 'never returns price_range', ->
      @selected.set foo: 'bar', price_range: 'x', baz: 'qux'
      @selected.visibleAttributes().should.eql ['foo', 'baz']

  describe '#reset', ->
    it 'unsets the visible attributes and accepts options', ->
      @selected.set foo: 'bar', price_range: 'x', baz: 'qux'
      @selected.reset()
      @selected.attributes.should.eql price_range: 'x'

  describe '#labels', ->
    it 'labels the selected attributes by humanizing and joining the values', ->
      filter_hash = {
        'medium':
          'works-on-paper':14
        'institution':
          'whitney-museum':
            'name':'WHITNEY Museum'
            'count':10
      }
      @selected.set medium: 'works-on-paper', price_range: '-1:1000000000000', institution: 'whitney-museum'
      @selected.labels(filter_hash).should.equal 'Works On Paper, For Sale, WHITNEY Museum'
    it 'fails silently when there is missing information', ->
      filter_hash = {}
      @selected.set medium: 'works-on-paper', price_range: '-1:1000000000000', institution: 'whitney-museum'
      @selected.labels(filter_hash).should.equal 'Works On Paper, For Sale, Whitney Museum'

  describe '#isActive', ->
    it 'checks to see if a value is selected', ->
      @selected.set medium: 'works-on-paper', price_range: '-1:1000000000000', institution: 'whitney-museum'
      @selected.isActive('whitney-museum').should.be.true
      @selected.isActive('noodle-museum').should.be.false

    it 'works with numeric values', ->
      @selected.set period: 1990
      @selected.isActive('1990').should.be.true
      @selected.set period: '1990'
      @selected.isActive(1990).should.be.true
