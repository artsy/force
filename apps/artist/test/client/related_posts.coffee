benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
{ resolve }       = require 'path'
{ fabricate }     = require 'antigravity'
Post              = require '../../../../models/post'
Artist            = require '../../../../models/artist'
RelatedPostsView  = benv.requireWithJadeify resolve(__dirname, '../../client/related_posts'), ['relatedPostsTemplate', 'noPostsTemplate']
_                 = require 'underscore'

describe 'RelatedPostsView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    artist = new Artist fabricate 'artist'
    benv.render resolve(__dirname, '../../templates/index.jade'), {
      sd: {}
      artist: artist
    }, =>
      @view = new RelatedPostsView { el: $('body'), model: artist, numToShow: 2 }
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'makes the right API call', ->
      Backbone.sync.args[0][1].url.should.include 'api/v1/related/posts'
      Backbone.sync.args[0][2].data['artist[]'].should.equal @view.model.get('id')

    it 'doesnt render anything if there are no results', ->
      Backbone.sync.args[0][2].success []
      @view.$el.html().should.include 'Do you have an interesting insight'
      @view.$el.html().should.include '<div class="artist-add-post-button button avant-garde-button-white"><div class="icon-write"></div><span>Add Post</span></div>'

    it 'renders the right content', ->
      Backbone.sync.args[0][2].success [
        fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool'
        fabricate 'post', id: 'bitty-the-queen', title: 'Bitty is the best cat'
      ]
      @view.$el.html().should.include '<a href="/post/cats-rule-dogs-drool-literally" class="artist-related-post-content">'
      @view.$el.html().should.include '<a href="/post/bitty-the-queen" class="artist-related-post-content">'
      @view.$el.find('li').length.should.equal 2
      @view.$el.find('a.artist-related-post-show-all').length.should.equal 0

    it 'correctly allows you to click see more', ->
      Backbone.sync.args[0][2].success [
        fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool'
        fabricate 'post', id: 'bitty-the-queen', title: 'Bitty is the best cat'
        fabricate 'post', id: 'dogs-are-just-ok', title: 'Dogs are eh'
      ]
      @view.$el.html().should.include '<a href="/post/cats-rule-dogs-drool-literally" class="artist-related-post-content">'
      @view.$el.html().should.include '<a href="/post/bitty-the-queen" class="artist-related-post-content">'
      @view.$el.find('li').length.should.equal 2
      @view.$el.find('a.artist-related-post-show-all').length.should.equal 1
      @view.$el.find('a.artist-related-post-show-all').click()
      @view.$el.html().should.include '<a href="/post/cats-rule-dogs-drool-literally" class="artist-related-post-content">'
      @view.$el.html().should.include '<a href="/post/bitty-the-queen" class="artist-related-post-content">'
      @view.$el.html().should.include '<a href="/post/dogs-are-just-ok" class="artist-related-post-content">'
      @view.$el.find('li').length.should.equal 3
