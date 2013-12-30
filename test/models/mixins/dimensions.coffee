_                 = require 'underscore'
Backbone          = require 'backbone'
sinon             = require 'sinon'
fabricate         = require 'antigravity'
dimensionsMixin   = require '../../../models/mixins/dimensions'

class Model extends Backbone.Model
  _.extend @prototype, dimensionsMixin

describe 'Dimensions Mixin', ->
  beforeEach ->
    @model = new Model

  describe '#dimensions', ->
    it 'returns the dimensions chosen by metric', ->
      @model.set metric: 'in', dimensions: { in: 'foobar' }
      @model.dimensions().should.include 'foobar'

  describe '#superscript', ->
    it 'wraps the dimensions string in a superscript tag when it encounters fractions following whole numbers', ->
      @model.set 'dimensions', { in: '35 4/5 × 35 4/5 in' }
      @model.superscriptFractions(@model.get('dimensions').in).should.equal '35 <sup>4/5</sup> × 35 <sup>4/5</sup> in'

    it 'leaves bare fractions alone', ->
      @model.set 'dimensions', { in: '35 4/5 × 1/2 in' }
      @model.superscriptFractions(@model.get('dimensions').in).should.equal '35 <sup>4/5</sup> × 1/2 in'
      @model.set 'dimensions', { in: '1/2 × 1/2 in' }
      @model.superscriptFractions(@model.get('dimensions').in).should.equal '1/2 × 1/2 in'

  describe '#fractionToDecimal', ->
    it 'converts fraction strings to decimals', ->
      @model.expressAsMetric('35 4/5 × 1/2 cm').should.equal '35.8 × 0.5 cm'
      @model.expressAsMetric('35 8/5 × 10 1/2 cm').should.equal '36.6 × 10.5 cm'
      @model.expressAsMetric('10 1/2 cm').should.equal '10.5 cm'
      @model.expressAsMetric('1/2 cm').should.equal '0.5 cm'
      @model.expressAsMetric('10 × 10 cm').should.equal '10 × 10 cm'
      @model.expressAsMetric('10.5 × 10.25 cm').should.equal '10.5 × 10.25 cm'
      @model.expressAsMetric('foobar').should.equal 'foobar'
      @model.expressAsMetric('20 1/10 × 20 1/10 × 1 1/2 cm').should.equal '20.1 × 20.1 × 1.5 cm'
      @model.expressAsMetric('10 1/0').should.equal '10 1/0'
      @model.expressAsMetric('10 1/').should.equal '10 1/'
      @model.expressAsMetric('10 0/').should.equal '10 0/'
      @model.expressAsMetric('10 1/ 1/').should.equal '10 1/ 1/'
      @model.expressAsMetric('10 1/3').should.equal '10.33'
