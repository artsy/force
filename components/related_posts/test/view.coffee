_               = require 'underscore'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

CurrentUser       = require '../../../models/current_user'
Post              = require '../../../models/post'
Artist            = require '../../../models/artist'
RelatedPostsView  = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template', 'noneTemplate']

describe 'RelatedPostsView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    artist  = new Artist fabricate 'artist'
    @view   = new RelatedPostsView { el: $('<fixture></fixture>'), model: artist, numToShow: 2 }
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'makes the right API call', ->
      Backbone.sync.args[0][1].url.should.include 'api/v1/related/posts'
      Backbone.sync.args[0][2].data['artist[]'].should.equal @view.model.id

  describe '#render', ->
    it 'doesnt render anything if there are no results', ->
      Backbone.sync.args[0][2].success []
      @view.$el.html().should.include 'Do you have an interesting insight'
      @view.$el.html().should.include 'Add Post'

    it 'renders the right content', ->
      Backbone.sync.args[0][2].success [
        fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool'
        fabricate 'post', id: 'bitty-the-queen', title: 'Bitty is the best cat'
      ]
      @view.$el.html().should.include '<a href="/post/cats-rule-dogs-drool-literally" class="related-post-content">'
      @view.$el.html().should.include '<a href="/post/bitty-the-queen" class="related-post-content">'
      @view.$el.find('li').length.should.equal 2
      @view.$el.find('a.related-posts-show-all').length.should.equal 0

    it 'correctly allows you to click see more', ->
      Backbone.sync.args[0][2].success [
        fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool'
        fabricate 'post', id: 'bitty-the-queen', title: 'Bitty is the best cat'
        fabricate 'post', id: 'dogs-are-just-ok', title: 'Dogs are eh'
      ]
      @view.$el.html().should.include '<a href="/post/cats-rule-dogs-drool-literally" class="related-post-content">'
      @view.$el.html().should.include '<a href="/post/bitty-the-queen" class="related-post-content">'
      @view.$el.find('li').length.should.equal 2
      @view.$el.find('a.related-posts-show-all').length.should.equal 1
      @view.$el.find('a.related-posts-show-all').click()
      @view.$el.html().should.include '<a href="/post/cats-rule-dogs-drool-literally" class="related-post-content">'
      @view.$el.html().should.include '<a href="/post/bitty-the-queen" class="related-post-content">'
      @view.$el.html().should.include '<a href="/post/dogs-are-just-ok" class="related-post-content">'
      @view.$el.find('li').length.should.equal 3

    describe 'has 1 result', ->
      it 'properly pluralizes the headline', ->
        Backbone.sync.args[0][2].success [
          fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool'
        ]
        @view.$el.html().should.include '1 Featured Post About This Artist'

    describe 'has 2 results', ->
      it 'properly pluralizes the headline', ->
        Backbone.sync.args[0][2].success [
          fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool'
          fabricate 'post', id: 'bitty-the-queen', title: 'Bitty is the best cat'
        ]
        @view.$el.html().should.include '2 Featured Posts About This Artist'

    describe '#addPost', ->
      beforeEach ->
        @e = preventDefault: sinon.stub()
        sinon.stub location, 'reload'

      afterEach ->
        location.reload.restore()

      it 'should pass through if user exists', ->
        @view.currentUser = new CurrentUser fabricate('user', id: 'current-user-id')
        @view.addPost @e
        @e.preventDefault.called.should.be.ok
        _.last(Backbone.sync.args)[2].success { results: [
          fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool'
        ]}
        _.last(Backbone.sync.args)[2].success([])
        location.href.should.contain '/post'

      it 'should intercept if user is *not* logged in', ->
        RelatedPostsView.currentUser = false
        @view.addPost @e
        @e.preventDefault.called.should.be.ok
