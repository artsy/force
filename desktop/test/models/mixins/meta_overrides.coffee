Backbone = require 'backbone'
MetaOverrides = require '../../../models/mixins/meta_overrides.coffee'
_ = require 'underscore'

class Model extends Backbone.Model
  _.extend @prototype, MetaOverrides

describe 'Meta Overrides', ->
  describe '#metaOverrides', ->
    it 'returns a hard-coded meta description', ->
      model = new Model id: 'nada-new-york-2015'
      model.metaOverrides('description').should.equal 'Explore young galleries and artists to watch at NADA New York on Artsy.net.'
  describe '#toPageDescription', ->
    it 'returns a hard-coded meta description', ->
      model = new Model id: 'nada-new-york-2015'
      model.toPageDescription().should.equal 'Explore young galleries and artists to watch at NADA New York on Artsy.net.'
    it 'has a sensible default', ->
      model = new Model name: 'Foo'
      model.toPageDescription().should.equal 'Foo'
  describe '#toPageTitle', ->
    it 'has a sensible default', ->
      model = new Model name: 'Foo'
      model.toPageTitle().should.equal 'Foo | Artsy'
