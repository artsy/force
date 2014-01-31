sinon = require 'sinon'
markdown = require '../lib/markdown'
_ = require 'underscore'
Backbone = require 'backbone'

class Model extends Backbone.Model

  _.extend @prototype, markdown

describe 'Dimensions Mixin', ->

  beforeEach ->
    @model = new Model

  describe '#mdToHtml', ->

    it 'returns html from parsed markdown', ->
      @model.set foo: "**foo**"
      @model.mdToHtml('foo').should.include '<strong>foo</strong>'

    it 'is defensive about missing data', ->
      @model.set foo: null
      @model.mdToHtml('foo').should.equal ''