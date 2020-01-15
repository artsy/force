Video = require '../../models/video'
{ fabricate } = require '@artsy/antigravity'

describe 'Video', ->

  beforeEach ->
    @video = new Video fabricate 'video'

  describe '#hasImage', ->

    it 'returns true if the version exists', ->
      @video.hasImage('large_cinematic').should.be.ok()

    it 'returns false if the version does not exist', ->
      @video.hasImage('something-dummy').should.not.be.ok()

    it 'returns false if image versions do not exist', ->
      @video.unset 'image_versions'
      @video.hasImage('large_cinematic').should.not.be.ok()

  describe '#imageUrl', ->

    it 'returns the image url if it exists', ->
      @video.imageUrl().should.match(
        /// /local/videos/.*/large_rectangle.jpg ///
      )

    it 'works if there are no images', ->
      @video.set image_url: ''
      @video.imageUrl().should.equal ''
