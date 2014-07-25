_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Profile = require '../../../../models/profile.coffee'
UserEdit = require '../../models/user_edit.coffee'
ProfileForm = benv.requireWithJadeify((resolve __dirname, '../../client/profile_form.coffee'), ['template'])
ProfileForm.__set__ 'LocationSearchView', Backbone.View
ProfileForm.__set__ 'ProfileIconUplaod', Backbone.View

describe 'ProfileForm', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @userEdit = new UserEdit fabricate 'user', public_favorites: true
    @userEdit.initializeDefaultArtworkCollection()
    @profile = new Profile fabricate 'profile', private: false
    @view = new ProfileForm profile: @profile, userEdit: @userEdit
    @view.render()

    sinon.stub Backbone, 'sync'
    sinon.stub $, 'ajax'

    done()

  afterEach ->
    Backbone.sync.restore()
    $.ajax.restore()

  describe '#render', ->
    it 'renders the view', ->
      @view.$el.html().should.containEql 'Your Profile Information'

  describe '#initialize', ->
    it 'ensures the publish favorites checkbox is kept in sync with the user model', ->
      @userEdit.set 'public_favorites', false
      @view.$('#profile-favorites').prop('checked').should.be.false
      @userEdit.set 'public_favorites', true
      @view.$('#profile-favorites').prop('checked').should.be.true

  describe 'toggleProfile', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success'
      @view.$('.settings-toggle-profile').click()

    it 'unpublishes the favorites', ->
      $.ajax.called.should.be.true
      @userEdit.get('public_favorites').should.be.false

    it 'disables the profile', ->
      @profile.get('private').should.be.true
      Backbone.sync.called.should.be.true
      Backbone.sync.args[0][0].should.equal 'update'
      Backbone.sync.args[0][1].attributes.private.should.be.true
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/profile/alessandra'

    it 'renders the private template', ->
      @view.$el.html().should.containEql 'Your profile is currently disabled'
