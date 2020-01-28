{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'
Backbone = require 'backbone'
dateMixin = require '../../../models/mixins/date'

class Model extends Backbone.Model

  _.extend @prototype, dateMixin

describe 'Date Mixin', ->

  beforeEach ->
    @model = new Model

  describe '#formattedDateRange', ->

    it 'formats start_at and end_at', ->
      @model.set start_at: new Date(2000,1,27), end_at: new Date(2000,2,2)
      @model.formattedDateRange().should.equal 'Feb. 27th &ndash; Mar. 2nd'

    it 'omits the end at month if it matches the start at month', ->
      @model.set start_at: new Date(2000,1,1), end_at: new Date(2000,1,3)
      @model.formattedDateRange().should.equal 'Feb. 1st &ndash; 3rd'

  describe '#fromNow', ->

    it 'returns the attribute in from now lingo', ->
      @model.set(start_at: new Date 3000,1,1).fromNow('start_at')
        .should.match /in (.*) years/
