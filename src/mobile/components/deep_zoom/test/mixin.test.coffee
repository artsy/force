_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
DeepZoom = require '../mixin'
{ Image } = require 'artsy-backbone-mixins'

SECURE_IMAGES_URL = 'https://supersecure.foo.bar'
class NotReallyAnArtworkImage extends Backbone.Model
  _.extend @prototype, DeepZoom(SECURE_IMAGES_URL)

class NotReallyAnArtworkImage1 extends Backbone.Model
  _.extend @prototype, DeepZoom(null)

describe 'Deep Zoom mixin', ->
  describe 'secure', ->
    before ->
      @SECURE_IMAGES_URL = SECURE_IMAGES_URL

    beforeEach ->
      @image = new NotReallyAnArtworkImage fabricate 'artwork_image'

    describe '#canDeepZoom', ->
      it 'should be deep-zoomable if *all* the deep zoom attributes are present', ->
        @image.canDeepZoom().should.be.ok()
        deepZoomAttrs = ['tile_base_url', 'tile_size', 'tile_overlap', 'tile_format', 'max_tiled_height', 'max_tiled_width']

        # Select an attribute and random and unset it
        attr = deepZoomAttrs[Math.floor(Math.random() * deepZoomAttrs.length)]
        @image.unset attr
        @image.canDeepZoom().should.not.be.ok()

      it 'ensures a trailing slash', ->
        @image.set 'tile_base_url', 'http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0'
        url = @image.deepZoomJson().Image.Url
        url.charAt(url.length - 1).should.equal '/'

      it 'always returns an object', ->
        @image.canDeepZoom = -> false
        @image.deepZoomJson().should.eql {}

      it 'sets the tile_base_url to the https url', ->
        @image.set 'tile_base_url', 'http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0'
        url = @image.deepZoomJson().Image.Url
        url.should.equal "#{@SECURE_IMAGES_URL}/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0/"

  describe 'unsecure', ->
    before ->
      @SECURE_IMAGES_URL = null

    beforeEach ->
      @image = new NotReallyAnArtworkImage1 fabricate 'artwork_image'

    describe '#canDeepZoom', ->
      it 'leaves the base part of the tile_base_url alone if SECURE_IMAGES_URL is not present', ->
        @image.set 'tile_base_url', 'http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0'
        url = @image.deepZoomJson().Image.Url
        url.should.equal "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0/"
