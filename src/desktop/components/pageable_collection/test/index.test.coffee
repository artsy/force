_ = require 'underscore'
PageableCollection = require '../index'

Fetch = fetchUntilEnd: -> true

class DerivedCollection extends PageableCollection
  _.extend @prototype, Fetch

describe 'PageableCollection', ->
  beforeEach ->
    @collection = new PageableCollection

  describe '#fetchUntilEnd', ->
    it 'is not implemented', ->
      (=> @collection.fetchUntilEnd()).should.throw 'fetchUntilEnd is not implemented'

describe 'DerivedCollection', ->
  beforeEach ->
    @collection = new DerivedCollection

  describe '#fetchUntilEnd', ->
    it 'does not throw', ->
      @collection.fetchUntilEnd().should.be.true()
