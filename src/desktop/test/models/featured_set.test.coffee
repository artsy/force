_ = require 'underscore'
should = require 'should'
Backbone = require 'backbone'
FeaturedLink = require '../../models/featured_link.coffee'
FeaturedSet = require '../../models/featured_set.coffee'
{ fabricate } = require '@artsy/antigravity'

describe 'FeaturedSet', ->

  beforeEach ->
    @set = new FeaturedSet
      owner: fabricate('feature', { image_versions: ['wide'] })
      id: "52b347c59c18db5aef000208"
      published: true
      key: "1"
      name: "Top 10 Posts"
      item_type: "FeaturedLink"
      type: "featured link"
      owner_type: "Feature"
      data: new Backbone.Collection [ fabricate 'featured_link' ], { model: FeaturedLink }

  it 'mixes in Markdown methods', ->
    @set.mdToHtml.should.be.an.instanceof Function

  describe '#models', ->
    it "provides access to an array of models", ->
      @set.models().should.have.lengthOf 1
      @set.models().should.be.instanceOf Array
      @set.models()[0].should.be.instanceOf FeaturedLink
