sinon = require 'sinon'
markdownMixin = require '../../../models/mixins/markdown'
_ = require 'underscore'
Backbone = require 'backbone'

class Model extends Backbone.Model
    
  _.extend @prototype, markdownMixin

describe 'Dimensions Mixin', ->
  
  beforeEach ->
    @model = new Model
    
  describe '#mdToHtml', ->
    
    it 'returns html from parsed markdown', ->
      @model.set foo: "**foo**"
      @model.mdToHtml('foo').should.include '<strong>foo</strong>'