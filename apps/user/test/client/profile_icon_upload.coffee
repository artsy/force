_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

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
          (resolve __dirname, '../../client/profile_icon_upload.coffee'), [ 's3UploadForm' ]
        )
        @profileIconUpload = new @ProfileIconUpload
          el: $ '.settings-profile-icon-upload'
          model: @profile.icon()
          profile: @profile
          accessToken: @accessToken
        done()

    it 'requests S3 credentials properly', ->
      args = $.ajax.args[0][0]
      args.url.should.containEql 'uploads/new.json'
      args.data.acl.should.equal 'private'

    it 'renders the upload directly to S3 form with the right fields', ->
      response = { "policy_encoded":"eyJleHBpcmF0aW9uIjoiMjAxNC0wNy0yMlQwNTowNDo1Mi4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoiYXJ0c3ktbWVkaWEtdXBsb2FkcyJ9LFsic3RhcnRzLXdpdGgiLCIka2V5IiwiTWs3OWZXQjhlVFJVd3N4anR2ODVRUSJdLHsiYWNsIjoicHJpdmF0ZSJ9LHsic3VjY2Vzc19hY3Rpb25fc3RhdHVzIjoiMjAxIn0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MDBdLFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiIl1dfQ==","policy_document":{"expiration":"2014-07-22T05:04:52.000Z","conditions":[{"bucket":"artsy-media-uploads"},["starts-with","$key","Mk79fWB8eTRUwsxjtv85QQ"],{"acl":"private"},{"success_action_status":"201"},["content-length-range",0,104857600],["starts-with","$Content-Type",""]]},"signature":"IbfcKEara8htFedSWLFsuHEBtdU=" }
      $.ajax.args[0][0].success(response)
      form = $(@profileIconUpload.$formPlaceholder.find('form')[0])
      form.attr('action').should == 'https://artsy-media-uploads.s3.amazonaws.com'
      key = $(@profileIconUpload.$formPlaceholder.find("input[name='key']")[0])
      key.val.should == 'Mk79fWB8eTRUwsxjtv85QQ/${filename}'
      signature = $(@profileIconUpload.$formPlaceholder.find("input[name='signature']")[0])
      signature.val.should == 'IbfcKEara8htFedSWLFsuHEBtdU='

    it 'makes an image processing request after upload', ->
      data = { key: 'percy', bucket: 'cat', files: [ { name: 'bitty' } ] }
      @profileIconUpload.makeGeminiRequest(data)
      args = $.ajax.args[1][0]
      args.url.should.containEql '/entries.json'
      entry = args.data.entry
      entry.source_key.should == 'percy'
      entry.source_bucket.should == 'cat'
      entry.template_key.should == 'profile-icon'
      entry.metadata.id.should == @profile.get('id')
      entry.metadata._type.should == 'ProfileIcon'

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
        @profileIconUpload = new @ProfileIconUpload
          el: $ '.settings-profile-icon-upload'
          model: @profile.icon()
          profile: @profile
          accessToken: @accessToken
        done()

    it 'allows the user to remove the image', ->
      @profileIconUpload.$el.hasClass('has-image').should.be.true
