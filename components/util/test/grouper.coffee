_ = require 'underscore'
should = require 'should'
Grouper = require "../grouper.coffee"

describe '#groupByConcatLength', ->

  it "a simple example", ->
    artworkSlugs = [
      '1',
      '1',
      'length_49_length_49_length_49_length_49_length_49',
      '_length_51_length_51_length_51_length_51_length_51',
      '_length99_length99_length99_length99_length99_length99_length99_length99_length99_length99_length99',
      '_length99_length99_length99_length99_length99_length99_length99_length99_length99_length99_length99'
    ]
    expectation = {
      1: ['_length99_length99_length99_length99_length99_length99_length99_length99_length99_length99_length99', '1'],
      2: ['_length99_length99_length99_length99_length99_length99_length99_length99_length99_length99_length99', '1'],
      3: ['_length_51_length_51_length_51_length_51_length_51', 'length_49_length_49_length_49_length_49_length_49']
    }
    grouped = Grouper.groupByConcatLength(
      artworkSlugs,
      100
    )
    _.isEqual(grouped, expectation).should.equal true
