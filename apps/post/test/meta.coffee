fs = require 'fs'
jade = require 'jade'
sd = require('sharify').data
{ fabricate } = require 'antigravity'
Post = require '../../../models/post'

describe 'Meta tags', ->

  describe 'Post without an image', ->

    before ->
      sd.APP_URL = "http://localhost:5000"
      @file = "#{process.cwd()}/apps/post/templates/meta.jade"
      @post = new Post fabricate('post')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: sd
        post: @post

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"#{sd.APP_URL}#{@post.href()}"
      @html.should.containEql "<meta property=\"og:url\" content=\"#{sd.APP_URL}#{@post.href()}"
      @html.should.containEql "<meta property=\"og:title\" content=\"#{@post.metaTitle()}"
      @html.should.containEql "<meta property=\"og:description\" content=\"#{@post.metaDescription()}"

  describe 'Post with an image', ->

    before ->
      sd.APP_URL = "http://localhost:5000"
      @file = "#{process.cwd()}/apps/post/templates/meta.jade"
      @post = new Post fabricate('post', shareable_image_url: 'http://share.me/image')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: sd
        post: @post

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary_large_image"
      @html.should.containEql "<meta property=\"og:image\" content=\"http://share.me/image"
      @html.should.containEql "<link rel=\"canonical\" href=\"#{sd.APP_URL}#{@post.href()}"
      @html.should.containEql "<meta property=\"og:url\" content=\"#{sd.APP_URL}#{@post.href()}"
      @html.should.containEql "<meta property=\"og:title\" content=\"#{@post.metaTitle()}"
      @html.should.containEql "<meta property=\"og:description\" content=\"#{@post.metaDescription()}"
