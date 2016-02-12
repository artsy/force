_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../../test/helpers/stubs'
Icon = require '../../../../../models/icon'
Profile = require '../../../../../models/profile'

xdescribe 'ProfilePictureView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @accessToken = 'xxx'
    $.fn.geminiUpload = (->)
    $.fn.fileupload = (->)
    sinon.stub $, 'ajax'
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()
    $.ajax.restore()

  describe 'without a profile icon', ->
    beforeEach (done) ->
      @profile = new Profile fabricate 'profile'
      @profile.set 'icon', null

      benv.render resolve(__dirname, '../index.jade'), {
        profile: @profile
      }, =>
        @ProfilePictureView = benv.requireWithJadeify(
          (resolve __dirname, '../view.coffee'), []
        )
        stubChildClasses @ProfilePictureView, this,
          ['GeminiForm']
          []
        @profileIconUpload = new @ProfilePictureView
          el: $ '.settings-profile-icon-upload'
          model: @profile.icon()
          profile: @profile
          accessToken: @accessToken
        done()

    it 'renders a default image', ->
      @profileIconUpload.$profileIcon.css('background-image').should.containEql Icon.DefaultUserIconUrl

    it 'does not render a remove action', ->
      @profileIconUpload.$el.hasClass('has-image').should.be.false()

  describe 'with a profile icon', ->

    beforeEach (done) ->
      @profile = new Profile fabricate 'profile'
      benv.render resolve(__dirname, '../index.jade'), {
        profile: @profile
      }, =>
        @ProfilePictureView = benv.requireWithJadeify(
          (resolve __dirname, '../view.coffee'), []
        )
        stubChildClasses @ProfilePictureView, this,
          ['GeminiForm']
          []
        @profileIconUpload = new @ProfilePictureView
          el: $ '.settings-profile-icon-upload'
          model: @profile.icon()
          profile: @profile
          accessToken: @accessToken
        done()

    it 'allows the user to remove the image', ->
      @profileIconUpload.$el.hasClass('has-image').should.be.true()

    it 'saves the token during the callback', ->
      @profileIconUpload.onUploadComplete({ token: 'cat' })
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][1].attributes.gemini_token.should.equal 'cat'
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/profile/alessandra/icon'
