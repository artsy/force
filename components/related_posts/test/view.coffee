_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
Post = require '../../../models/post'

describe 'RelatedPostsView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @RelatedPostsView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @response = [
      fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool', attachments: [fabricate 'artwork_image', type: 'PostImage']
      fabricate 'post', id: 'bitty-the-queen', title: 'Bitty is the best cat', attachments: [fabricate 'artwork_image', type: 'PostImage']
      fabricate 'post', id: 'lame-no-image', title: 'Lame no image'
    ]
    @collection = new Backbone.Collection [], model: Post
    @view = new @RelatedPostsView collection: @collection, numToShow: 1
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'fetches the collection', ->
      Backbone.sync.called.should.be.true

  describe '#render', ->
    it 'doesnt render anything if there are no results', ->
      Backbone.sync.args[0][2].success []
      @view.$el.html().should.be.empty

    it 'renders the right content', ->
      Backbone.sync.args[0][2].success @response
      @collection.trigger 'sync'
      html = @view.$el.html()
      html.should.containEql 'href="/post/cats-rule-dogs-drool-literally"'
      html.should.not.containEql 'href="/post/bitty-the-queen"'
      html.should.not.containEql 'Lame no image'
      @view.$el.find('.related-post').length.should.equal 1
      @view.$el.find('.related-posts-show-all').length.should.equal 1
      @view.$el.find('.related-posts-show-all').click()
      html = @view.$el.html()
      html.should.containEql 'href="/post/bitty-the-queen"'
      @view.$el.find('.related-post').length.should.equal 2
      @view.$el.find('.related-posts-show-all').length.should.equal 0

    xdescribe '#addPost', ->
      beforeEach ->
        @e = preventDefault: sinon.stub()
        sinon.stub location, 'reload'

      afterEach ->
        location.reload.restore()

      it 'should pass through if user exists', ->
        @view.addToPostButton.currentUser = new CurrentUser fabricate('user', id: 'current-user-id')
        @view.addToPostButton.addPost @e
        @e.preventDefault.called.should.be.ok
        _.last(Backbone.sync.args)[2].success { results: [
          fabricate 'post', id: 'cats-rule-dogs-drool-literally', title: 'Cats rule, and dogs drool'
        ]}
        _.last(Backbone.sync.args)[2].success([])
        location.href.should.containEql '/post'

      it 'should intercept if user is *not* logged in', ->
        @RelatedPostsView.currentUser = false
        @view.addToPostButton.addPost @e
        @e.preventDefault.called.should.be.ok
