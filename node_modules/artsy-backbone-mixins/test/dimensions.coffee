_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
dimensions = require '../lib/dimensions'

class Model extends Backbone.Model
  _.extend @prototype, dimensions

describe 'Dimensions Mixin', ->
  beforeEach ->
    @model = new Model

  describe '#dimensions', ->

    it 'can still function with missing dimensions data', ->
      @model.set metric: 'in', dimensions: null
      @model.dimensions()

    it 'returns the dimensions chosen by metric', ->
      @model.set metric: 'in', dimensions: { in: 'foobar' }
      @model.dimensions().should.containEql 'foobar'

    it 'wraps the dimensions string in a superscript tag when it encounters ' +
       'fractions following whole numbers', ->
      @model.set metric: 'in', dimensions: { in: '35 4/5 × 35 4/5 in' }
      @model.dimensions(format: 'superscript').should.equal '35 <sup>4/5</sup> × 35 <sup>4/5</sup> in'

    it 'leaves bare fractions alone', ->
      @model.set metric: 'in', dimensions: { in: '35 4/5 × 1/2 in' }
      @model.dimensions(format: 'superscript').should.equal '35 <sup>4/5</sup> × 1/2 in'
      @model.set metric: 'in', dimensions: { in: '1/2 × 1/2 in' }
      @model.dimensions(format: 'superscript').should.equal '1/2 × 1/2 in'

    it 'converts fraction strings to decimals', ->
      @model.set(metric: 'cm', dimensions: cm: '35 4/5 × 1/2 cm')
        .dimensions(format: 'decimal').should.equal '35.8 × 0.5 cm'
      @model.set(metric: 'cm', dimensions: cm: '35 8/5 × 10 1/2 cm')
        .dimensions(format: 'decimal').should.equal '36.6 × 10.5 cm'
      @model.set(metric: 'cm', dimensions: cm: '10 1/2 cm')
        .dimensions(format: 'decimal').should.equal '10.5 cm'
      @model.set(metric: 'cm', dimensions: cm: '1/2 cm')
        .dimensions(format: 'decimal').should.equal '0.5 cm'
      @model.set(metric: 'cm', dimensions: cm: '10 × 10 cm')
        .dimensions(format: 'decimal').should.equal '10 × 10 cm'
      @model.set(metric: 'cm', dimensions: cm: '10.5 × 10.25 cm')
        .dimensions(format: 'decimal').should.equal '10.5 × 10.25 cm'
      @model.set(metric: 'cm', dimensions: cm: 'foobar')
        .dimensions(format: 'decimal').should.equal 'foobar'
      @model.set(metric: 'cm', dimensions: cm: '20 1/10 × 20 1/10 × 1 1/2 cm')
        .dimensions(format: 'decimal').should.equal '20.1 × 20.1 × 1.5 cm'
      @model.set(metric: 'cm', dimensions: cm: '10 1/0')
        .dimensions(format: 'decimal').should.equal '10 1/0'
      @model.set(metric: 'cm', dimensions: cm: '10 1/')
        .dimensions(format: 'decimal').should.equal '10 1/'
      @model.set(metric: 'cm', dimensions: cm: '10 0/')
        .dimensions(format: 'decimal').should.equal '10 0/'
      @model.set(metric: 'cm', dimensions: cm: '10 1/ 1/')
        .dimensions(format: 'decimal').should.equal '10 1/ 1/'
      @model.set(metric: 'cm', dimensions: cm: '10 1/3')
        .dimensions(format: 'decimal').should.equal '10.33'