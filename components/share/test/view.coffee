_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
FacebookCustomView = require '../facebook_custom_view.coffee'
TwitterCustomView = require '../twitter_custom_view.coffee'
PinterestCustomView = require '../pinterest_custom_view.coffee'

describe 'Sharing Button Views', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    sharingContainer =
      """
        <ul>
          <li id='artist-facebook'>
          <li id='artist-twitter'>
          <li id='artist-pinterest'
        </ul>
      """
    @fbView = new FacebookCustomView
      el: sharingContainer
      url: 'http://cats.com/bitty' 
    @twitterView = new TwitterCustomView
      el: sharingContainer
      text: 'Check out the best cat'
      url: 'http://cats.com/bitty'
    @pinterestView = new PinterestCustomView
      el: sharingContainer
      description: 'Check out the best cat'
      media: 'bitty.jpg'
      url: 'http://cats.com/bitty'
    done()

  afterEach ->
    Backbone.sync.restore()

  describe 'FacebookCustomView', ->

    describe '#render', ->

      it 'renders the correct link to share on facebook', ->
        @fbView.render()
        @fbView.$el.find('a').attr('href').should.equal "http://www.facebook.com/sharer.php?u=#{encodeURIComponent('http://cats.com/bitty')}"

  describe 'PinterestCustomView', ->

    describe '#render', ->

      it 'renders the correct link to share on Pinterest', ->
        @pinterestView.render()
        params = 
          url: 'http://cats.com/bitty'
          media: 'bitty.jpg'
          description: 'Check out the best cat'
        queryParamString = $.param(params)
        @pinterestView.$el.find('a').attr('href').should.equal "//pinterest.com/pin/create/button/?#{queryParamString}"

  describe 'TwitterCustomView', ->

    describe '#render', ->

      it 'renders the correct link to share on twitter', ->
        @twitterView.render()
        params = 
          text: 'Check out the best cat'
          url: 'http://cats.com/bitty'
          related: 'artsy'
        queryParamString = $.param(params)
        @twitterView.$el.find('a').attr('href').should.equal "http://twitter.com/share?#{queryParamString}"
