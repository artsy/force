_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
ProfileEdit = require '../../models/profile_edit.coffee'
UserEdit = require '../../models/user_edit.coffee'
AccountForm = require '../../client/account_form.coffee'
Profile = require '../../../../models/profile.coffee'
CurrentUser = require '../../../../models/current_user.coffee'

describe 'AccountForm', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @userEdit = new UserEdit fabricate 'user', location: fabricate 'location'
      @profile = new Profile fabricate 'profile'
      @profileEdit = new ProfileEdit fabricate 'profile'
      benv.render resolve(__dirname, '../../templates/profile.jade'), {
        sd: {}
        profile: @profile
        profileEdit: @profileEdit
        user: @userEdit
      }, =>
        sinon.stub Backbone, 'sync'
        @view =  new AccountForm
          el: $ 'body'
          model: @userEdit
          profileEdit: @profileEdit
        done()


  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  it 'after linking redirects back to the user edit form', ->
    global.location.href = 'user/edit'
    @view.toggleLinked()
    window.location.should.include 'redirect-to='
    window.location.should.include 'user%2Fedit'