_               = require 'underscore'
rewire          = require 'rewire'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

Artworks          = require '../../../../collections/artworks.coffee'
ArtworkCollection = require '../../../../models/artwork_collection.coffee'
Profile           = require '../../../../models/profile.coffee'
ProfileEdit       = require '../../models/profile_edit.coffee'
UserEdit          = require '../../models/user_edit.coffee'

describe 'ProfileForm', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @userEdit = new UserEdit fabricate 'user', location: fabricate 'location'
    @favs = new ArtworkCollection
      default : true
      private : true
      userId  : @userEdit.get 'id'
    @favs.get('artworks').add fabricate('artwork'), { at: 0 }
    @profile = new Profile fabricate 'profile'
    @profileEdit = new ProfileEdit fabricate 'profile'
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/profile.jade'), {
      sd: {}
      profile: @profile
      profileEdit: @profileEdit
      user: @userEdit
    }, =>
      @ProfileForm = benv.requireWithJadeify(
        (resolve __dirname, '../../client/profile_form.coffee'), []
      )
      done()


  afterEach ->
    Backbone.sync.restore()

  describe 'user has no favorites collection or an error occurs retrieving it', ->

    it 'does not reveal the enable public favorites toggle', ->
      @profileForm = new @ProfileForm
        el      : $('.settings-profile-form')
        model   : @profileEdit
        userEdit: @userEdit
      @profileForm.$('.settings-enable-public-favorites').should.have.lengthOf 1
      Backbone.sync.args[0][2].error()
      @profileForm.$('.settings-enable-public-favorites').should.have.lengthOf 0

  describe 'enable public favorites', ->

    beforeEach ->
      @profileForm = new @ProfileForm
        el      : $('.settings-profile-form')
        model   : @profileEdit
        userEdit: @userEdit
      Backbone.sync.args[0][2].success @favs.attributes
      sinon.stub $, 'ajax'

    afterEach ->
      $.ajax.restore()

    it 'correctly toggles the state', ->
      @favs.get('private').should.be.true
      @profileForm.$('#profile-favorites').attr('data-state').should.equal 'off'
      @profileForm.$('#profile-favorites').click()
      $.ajax.callCount.should.equal 1
      @profileForm.$('#profile-favorites').attr('data-state').should.equal 'on'

    it 'requires a public profile by setting it public', ->
      @profileForm.$('#profile-favorites').click()
      @profileForm.$('#profile-favorites').attr('data-state').should.equal 'on'
      @profileForm.$('#profile-public').attr('data-state').should.equal 'on'

    it 'toggles public favorites if the profile is made private', ->
      @profileForm.$('#profile-favorites').click()
      @profileForm.$('#profile-public').click()
      @profileForm.$('#profile-favorites').attr('data-state').should.equal 'off'
      @profileForm.$('#profile-public').attr('data-state').should.equal 'off'
