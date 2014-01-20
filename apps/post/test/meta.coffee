fs            = require 'fs'
jade          = require 'jade'
{ fabricate } = require 'antigravity'
Post          = require '../../../models/post'

describe 'Meta tags', ->

  describe 'Post without an image', ->

    before ->
      @sd =
        ASSET_PATH: "http://localhost:5000"
      @file = "#{process.cwd()}/apps/post/meta.jade"
      @post = new Post fabricate('post')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd  : @sd
        post: @post

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"#{@post.href()}"
      @html.should.include "<meta property=\"og:url\" content=\"#{@post.href()}"
      @html.should.include "<meta property=\"og:title\" content=\"#{@post.metaTitle()}"
      @html.should.include "<meta property=\"og:description\" content=\"#{@post.metaDescription()}"

  describe 'Post with an image', ->

    before ->
      @sd =
        ASSET_PATH: "http://localhost:5000"
      @file = "#{process.cwd()}/apps/post/meta.jade"
      @post = new Post fabricate('post', shareable_image_url: 'http://share.me/image')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd  : @sd
        post: @post

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary_large_image"
      @html.should.include "<meta property=\"og:image\" content=\"http://share.me/image"
      @html.should.include "<link rel=\"canonical\" href=\"#{@post.href()}"
      @html.should.include "<meta property=\"og:url\" content=\"#{@post.href()}"
      @html.should.include "<meta property=\"og:title\" content=\"#{@post.metaTitle()}"
      @html.should.include "<meta property=\"og:description\" content=\"#{@post.metaDescription()}"
