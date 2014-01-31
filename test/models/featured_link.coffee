_             = require 'underscore'
should        = require 'should'
Backbone      = require 'backbone'
FeaturedLink  = require '../../models/featured_link.coffee'
{ fabricate } = require 'antigravity'

describe 'FeaturedLink', ->

  beforeEach ->
    @featuredLink = new FeaturedLink fabricate 'featured_link',
      image_versions: ['original', 'large_rectangle', 'medium_rectangle']

  it 'mixes in Markdown methods', ->
    @featuredLink.mdToHtml.should.be.a.Function

  xdescribe '#fetchItems', ->

  describe '#layoutStyle', ->
    it 'returns a descriptor for the required layout', ->
      @featuredLink.layoutStyle(1).should.equal 'full'
      @featuredLink.layoutStyle(2).should.equal 'half'
      @featuredLink.layoutStyle(3).should.equal 'third'
      @featuredLink.layoutStyle(4).should.equal 'quarter'

  describe '#imageSizeForLayout', ->
    it 'returns an image size by the layout', ->
      @featuredLink.imageSizeForLayout(1).should.equal 'original'
      @featuredLink.imageSizeForLayout(2).should.equal 'large_rectangle'
      @featuredLink.imageSizeForLayout(3).should.equal 'large_rectangle'
      @featuredLink.imageSizeForLayout(4).should.equal 'medium_rectangle'

  describe '#imageUrlForLayout', ->
    it 'returns the image url for the size required by the layout', ->
      @featuredLink.imageUrlForLayout(1).should.contain 'original'
      @featuredLink.imageUrlForLayout(2).should.contain 'large_rectangle'
      @featuredLink.imageUrlForLayout(3).should.contain 'large_rectangle'
      @featuredLink.imageUrlForLayout(4).should.contain 'medium_rectangle'

  describe '#hasImageForLayout', ->
    it 'check for an image that matches the needed layout', ->
      _(4).times (n) =>
        @featuredLink.hasImageForLayout(n).should.be.true
      @featuredLink.set 'image_versions', []
      _(4).times (n) =>
        @featuredLink.hasImageForLayout(n).should.be.false
