_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
sd = require('sharify').data
benv = require 'benv'
CurrentUser = require '../../../models/current_user'
{ fabricate } = require '@artsy/antigravity'

describe 'UserSettingsView', ->

  beforeEach (done) ->
    @user = new CurrentUser fabricate 'user'
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      sinon.stub $, 'ajax'
      global.location = { assign: sinon.stub() }
      UserSettingsView = require '../client/view.coffee'
      @view = new UserSettingsView.UserSettingsView
        el: $("<div id='settings'>
          <div id='#settings-generic-error'></div>
            <div class='js--settings-logout'></div>
          </div>")
      done()

  afterEach ->
    $.ajax.restore()
    benv.teardown()
    Backbone.sync.restore()

  describe '#logout', ->

    it 'logs out a user who was signed in', ->
      @view.$('.js--settings-logout').click()
      $.ajax.args[0][0].success()
      global.location.assign.args[0][0].should.containEql '/'
