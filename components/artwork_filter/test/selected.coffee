_ = require 'underscore'
Selected = require '../models/selected'

describe 'Selected', ->
  beforeEach ->
    @selected = new Selected

  describe '#visibleAttributes', ->
    it 'never returns size', ->
      @selected.set foo: 'bar', size: 20, baz: 'qux'
      @selected.visibleAttributes().should.eql ['foo', 'baz']

  describe '#reset', ->
    it 'unsets the visible attributes and accepts options', ->
      @selected.set foo: 'bar', size: 20, baz: 'qux'
      @selected.reset()
      @selected.attributes.should.eql size: 20

  describe '#labels', ->
    it 'labels the selected attributes by humanizing and joining the values', ->
      map =
        medium:
          'works-on-paper':
            name: 'Works On Paper'
            count: 14
        institution:
          'whitney-museum':
            'name': 'WHITNEY Museum'
            'count': 10
      @selected.set medium: 'works-on-paper', for_sale: true, institution: 'whitney-museum'
      @selected.labels(map).should.equal 'For Sale, Works On Paper, WHITNEY Museum'

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
