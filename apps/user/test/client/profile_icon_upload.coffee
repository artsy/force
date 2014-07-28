_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

Icon = require '../../../../models/icon.coffee'
Profile = require '../../../../models/profile.coffee'

describe 'ProfileIconUpload', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @accessToken = '01001001001000000110000101101101001000000100101101100101011110010111001101100101011100100010000001010011001111110111101001100101'
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

      benv.render resolve(__dirname, '../../templates/profile_icon.jade'), {
        profile: @profile
      }, =>
        @ProfileIconUpload = benv.requireWithJadeify(
          (resolve __dirname, '../../client/profile_icon_upload.coffee'), []
        )
        stubChildClasses @ProfileIconUpload, this,
          ['GeminiForm']
          []
        @profileIconUpload = new @ProfileIconUpload
          el: $ '.settings-profile-icon-upload'
          model: @profile.icon()
          profile: @profile
          accessToken: @accessToken
        done()

    it 'renders a default image', ->
      @profileIconUpload.$profileIcon.css('background-image').should.containEql Icon.DefaultUserIconUrl

    it 'does not render a remove action', ->
      @profileIconUpload.$el.hasClass('has-image').should.be.false

  describe 'with a profile icon', ->

    beforeEach (done) ->
      @profile = new Profile fabricate 'profile'
      benv.render resolve(__dirname, '../../templates/profile_icon.jade'), {
        profile: @profile
      }, =>
        @ProfileIconUpload = benv.requireWithJadeify(
          (resolve __dirname, '../../client/profile_icon_upload.coffee'), []
        )
        stubChildClasses @ProfileIconUpload, this,
          ['GeminiForm']
          []
        @profileIconUpload = new @ProfileIconUpload
          el: $ '.settings-profile-icon-upload'
          model: @profile.icon()
          profile: @profile
          accessToken: @accessToken
        done()

    it 'allows the user to remove the image', ->
      @profileIconUpload.$el.hasClass('has-image').should.be.true
