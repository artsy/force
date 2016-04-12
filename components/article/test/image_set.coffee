_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
fixtures = require '../../../test/helpers/fixtures.coffee'
sd = require('sharify').data
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'ImageSetView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.fn.imagesLoaded = ->
      @ImageSetView = benv.requireWithJadeify(
        resolve(__dirname, '../image_set')
        ['template' ]
      )
      @ImageSetView.__set__ 'resize', (url) -> url
      @ImageSetView.__set__ 'Follow', { Following: sinon.stub(), FollowButton: sinon.stub() }
      stubChildClasses @ImageSetView, this,
        ['addFollowButton', 'setupFollowButtons' ]
        []
      @user = sinon.stub()
      @collection = [
        { type: 'image', caption: 'This is a caption', url: 'http://image.com/img.png' }
        {
          type: 'artwork',
          artist: name: 'Van Gogh', slug: 'van-gogh'
          partner: name: 'Partner Gallery'
          title: 'Starry Night'
          image: 'http://partnergallery.com/image.png'
          slug: 'van-gogh-starry-night'
          date: '1999'
        }
      ]
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new @ImageSetView
      el: $('body')
      items: @collection
      user: @user
      startIndex: 0

  afterEach ->
    Backbone.sync.restore()

  describe 'slideshow is functional', ->

    it 'slideshow starts at index 0', ->
      @view.currentIndex.should.equal 0

    it 'iterates to the next page on next', ->
      @view.next()
      @view.currentIndex.should.equal 1

    it 'loops back to the beginning on last image', ->
      @view.next()
      @view.next()
      @view.currentIndex.should.equal 0

    it 'iterates to previous page on previous', ->
      @view.next()
      @view.previous()
      @view.currentIndex.should.equal 0

    it 'loops to the end on first image on previous', ->
      @view.previous()
      @view.currentIndex.should.equal 1

  describe '#render', ->

    it 'renders a regular image', ->
      @view.render()
      @view.$el.html().should.containEql '1/2'
      @view.$el.html().should.containEql 'This is a caption'
      @view.$el.html().should.containEql 'http://image.com/img.png'

    it 'renders an artwork on next()', ->
      @view.render()
      @view.next()
      @view.$el.html().should.containEql '2/2'
      @view.$el.html().should.containEql 'Starry Night'
      @view.$el.html().should.containEql 'Partner Gallery'
      @view.$el.html().should.containEql 'van-gogh-starry-night'
      @view.$el.html().should.containEql '1999'
      @view.$el.html().should.containEql 'http://partnergallery.com/image.png'
