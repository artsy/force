_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
fixtures = require '../../../test/helpers/fixtures.coffee'
sd = require('sharify').data
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'ImageSetView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        _s: benv.require('underscore.string')
      Backbone.$ = $
      $.fn.imagesLoaded = ->
      @ImageSetView = benv.requireWithJadeify(
        resolve(__dirname, '../client/image_set')
        ['template' ]
      )
      @ImageSetView.__set__ 'Image', ->
      @ImageSetView.__set__ 'resize', (url) -> url
      @ImageSetView.__set__ 'Follow', { Following: sinon.stub(), FollowButton: sinon.stub() }
      @flickity = { navigation: flickity:
        select: @select = sinon.stub()
        next: @next = sinon.stub()
        previous: @previous = sinon.stub()
      }
      @ImageSetView.__set__ 'initCarousel', sinon.stub().returns @flickity
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
      sinon.stub Backbone, 'sync'
      @view = new @ImageSetView
        el: $('body')
        items: @collection
        user: @user
        startIndex: 0
        _s: _s
      @view.carousel = @flickity
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe 'slideshow is functional', ->

    it 'iterates to the next page on next', ->
      @view.next()
      @next.called.should.be.true()

    it 'loops back to the beginning on last image', ->
      @view.next()
      @view.next()
      @next.callCount.should.equal 2

    it 'iterates to previous page on previous', ->
      @view.next()
      @view.previous()
      @next.callCount.should.equal 1
      @previous.callCount.should.equal 1

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
