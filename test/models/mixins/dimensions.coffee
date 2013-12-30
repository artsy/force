_               = require 'underscore'
Backbone        = require 'backbone'
sinon           = require 'sinon'
fabricate       = require 'antigravity'
dimensionsMixin = require '../../../models/mixins/dimensions'

class Model extends Backbone.Model

  _.extend @prototype, dimensionsMixin

describe 'Dimensions Mixin', ->

  beforeEach ->
    @model = new Model

  describe '#dimensions', ->

    it 'returns the dimensions chosen by metric', ->
      @model.set metric: 'in', dimensions: { in: 'foobar' }
      @model.dimensions().should.include 'foobar'
