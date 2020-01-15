sinon = require 'sinon'
FeaturedLink = require '../../models/featured_link'
{ fabricate } = require '@artsy/antigravity'

describe 'FeaturedLink', ->

  beforeEach ->
    @link = new FeaturedLink fabricate 'featured_link'

  describe '#imageUrl', ->

    it 'returns the replaced image url', ->
      @link.set image_url: 'foo/bar/:version.jpg', image_versions: ['medium_rectangle']
      @link.imageUrl().should.equal 'foo/bar/medium_rectangle.jpg'

    it 'falls back to any available type if no medium_rectangle', ->
      @link.set image_url: 'foo/bar/:version.jpg', image_versions: ['small']
      @link.imageUrl().should.equal 'foo/bar/small.jpg'

  describe '#miniSubtitle', ->

    it 'returns a split subtitle', ->
      @link.set 'subtitle', 'Arty Editorial | Featured Aug. 9th'
      @link.miniSubtitle().should.equal 'Arty Editorial'

  describe '#toFeaturedItem', ->

    it 'converts the link to a feature item', ->
      @link.set
        href: 'foo'
        title: 'bar'
        subtitle: 'baz'
        image_url: 'qux/:version.jpg'
      @link.toFeaturedItem().href.should.equal 'foo'
      @link.toFeaturedItem().title.should.equal '<p>bar</p>\n'
      @link.toFeaturedItem().subtitle.should.equal '<p>baz</p>'
      @link.toFeaturedItem().imageUrl.should.equal 'qux/large_rectangle.jpg'

    it 'splits up verbose names by pipe', ->
      @link.set
        href: 'foo'
        title: 'bar'
        subtitle: 'Fooy Editorial | Featured August 6th | On the River'
        image_url: 'qux'
      @link.toFeaturedItem().subtitle.should.equal '<p>Fooy Editorial'
