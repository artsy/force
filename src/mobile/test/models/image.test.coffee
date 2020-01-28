Image = require '../../models/image'
{ fabricate } = require '@artsy/antigravity'

describe 'Image', ->

  beforeEach ->
    @image = new Image fabricate 'artwork_image'

  describe '#imageUrl', ->

    it 'returns the small image by default', ->
      @image.set 'image_url', 'foo/bar/:version.jpg'
      @image.imageUrl().should.equal 'foo/bar/small.jpg'
