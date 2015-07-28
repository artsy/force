_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Fair = require '../../models/fair'
Fairs = require '../../collections/fairs'

describe 'Fairs', ->
  describe '#fillRows', ->
    it 'returns one full width show if only one x-large show exists', ->
      fairs = new Fairs([
        fabricate('fair', { id: 'fair1', banner_size: 'x-large' })
      ])
      rows = fairs.fillRows fairs.models
      rows.length.should.eql 1
      rows[0].type.should.eql 'full'
      rows[0].fairs[0].get('id').should.eql 'fair1'

    it 'returns one row with a equal sized banners if two fairs that are not x-large', ->
      fairs = new Fairs([
        fabricate('fair', { id: 'fair1', banner_size: 'large' })
        fabricate('fair', { id: 'fair2', banner_size: 'medium' })
      ])
      rows = fairs.fillRows fairs.models
      rows.length.should.eql 1
      rows[0].type.should.eql 'half'
      rows[0].fairs.length.should.eql 2

    it 'returns two rows with one full size and two equal sized banners', ->
      fairs = new Fairs([
        fabricate('fair', { id: 'fair1', banner_size: 'x-large' })
        fabricate('fair', { id: 'fair2', banner_size: 'large' })
        fabricate('fair', { id: 'fair3', banner_size: 'medium' })
      ])
      rows = fairs.fillRows fairs.models
      rows.length.should.eql 2
      rows[0].type.should.eql 'full'
      rows[0].fairs.length.should.eql 1
      rows[1].type.should.eql 'half'
      rows[1].fairs.length.should.eql 2