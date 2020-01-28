_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Eventable = require '../../../models/mixins/eventable'

class Model extends Backbone.Model
  _.extend @prototype, Eventable

describe 'Eventable Mixin', ->
  beforeEach ->
    @model = new Model start_at: '2000-01-01T00:01:00+00:00', end_at: '2000-01-01T10:01:00+00:00'

  describe 'start and end happen on the same day', ->
    it 'formats the date range', ->
      @model.formatDateRange('start_at', 'end_at')
        .should.equal 'Saturday, Jan 1st, 12:01am – 10:01am'

  describe 'start and end happen on different days', ->
    it 'formats the date range', ->
      @model.set 'end_at', '2000-01-03T10:01:00+00:00'
      @model.formatDateRange('start_at', 'end_at')
        .should.equal 'Saturday, Jan 1st, 12:01am – Monday, Jan 3rd, 10:01am'
