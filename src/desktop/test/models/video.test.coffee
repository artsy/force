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

  describe '#srcUrl', ->

    it 'returns a url to the video for an extension and resolution', ->
      @video.srcUrl('.mp4').should.equal "#{@video.get('hr_video_url')}#{'.mp4'}"

  describe '#layoutStyle', ->

    it 'returns a layout style string for the number of videos in the layout', ->
      @video.layoutStyle(1).should.equal 'full'
      @video.layoutStyle(2).should.equal 'half'
      @video.layoutStyle(3).should.equal 'third'
      @video.layoutStyle(4).should.equal 'quarter'
