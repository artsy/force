_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
markdown = require '../lib/markdown'

class Model extends Backbone.Model
  _.extend @prototype, markdown

describe 'Dimensions Mixin', ->
  beforeEach ->
    @model = new Model

  describe '#mdToHtml', ->
    it 'returns HTML from parsed markdown', ->
      @model.set foo: "**foo** *bar*"
      @model.mdToHtml('foo').should.eql '<p><strong>foo</strong> <em>bar</em></p>'

    it 'is defensive about missing data', ->
      @model.set foo: null
      @model.mdToHtml('foo').should.equal ''

    it 'is defensive about XSS', ->
      @model.set foo: "<img src=<script> src='<img<script>alert(document.domain)//</p> 
</script>"
      @model.mdToHtml('foo').should.equal '<p>&lt;img src=&lt;script&gt; src=&#39;&lt;img&lt;script&gt;alert(document.domain)//&lt;/p&gt; &lt;/script&gt;</p>'

  describe '#htmlToText', ->
    it 'handles null input', ->
      @model.set foo: null
      @model.htmlToText('foo').should.equal ''

    it 'strips tags', ->
      @model.set foo: '<p><strong>Obviously</strong> works</p>.'
      @model.htmlToText('foo').should.equal 'Obviously works.'
