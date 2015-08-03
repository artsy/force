_ = require 'underscore'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
Backbone = require 'backbone'
User = require '../../models/user'
CurrentUser = require '../../models/current_user'
LoggedOutUser = require '../../models/logged_out_user'

describe 'User', ->
  describe 'base class', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'
      @user = new User

    afterEach ->
      Backbone.sync.restore()

    describe '#refresh', ->
      it 'hits the refresh endpoint', ->
        @user.refresh()
        Backbone.sync.args[0][2].url.should.equal '/user/refresh'

      it 'accepts a success callback', (done) ->
        Backbone.sync.restore()
        sinon.stub(Backbone, 'sync').yieldsTo 'success'
        @user.refresh(success: -> done())

      it 'accepts an error callback', (done) ->
        Backbone.sync.restore()
        sinon.stub(Backbone, 'sync').yieldsTo 'error'
        @user.refresh(error: -> done())

    describe '#isCollector', ->
      it 'returns false if the collector level is blank', ->
        @user.unset 'collector_level'
        @user.isCollector().should.be.false()

      it 'returns false if the collector level below 3', ->
        @user.set 'collector_level', 2
        @user.isCollector().should.be.false()

      it 'returns true if the collector level is 3', ->
        @user.set 'collector_level', 3
        @user.isCollector().should.be.true()

      it 'returns true if the collector level above 3', ->
        @user.set 'collector_level', 4
        @user.isCollector().should.be.true()

  describe '#findOrCreate', ->
    describe 'CurrentUser', ->
      beforeEach ->
        sinon.stub Backbone, 'sync'
        sinon.stub(User, 'instantiate').returns new CurrentUser
        @user = User.instantiate()

      afterEach ->
        User.instantiate.restore()
        Backbone.sync.restore()

      describe 'success', ->
        it 'fetches the user; returns a promise; calls a success callback', (done) ->
          promise = @user.findOrCreate success: (model) ->
            model.id.should.equal 'current-user'
            promise.isFulfilled().should.be.true()
            done()
          promise.isFulfilled().should.be.false()
          Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'
          Backbone.sync.args[0][2].success fabricate 'user', id: 'current-user'

      describe 'error', ->
        it 'fetches the user; returns a promise; calls a success callback', (done) ->
          promise = @user.findOrCreate error: ->
            promise.isRejected().should.be.true()
            done()
          promise.isFulfilled().should.be.false()
          Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'
          Backbone.sync.args[0][2].error()

    describe 'LoggedOutUser', ->
      beforeEach ->
        sinon.stub Backbone, 'sync'
        Backbone.__ANONYMOUS_SESSION_SYNC_WRAPPED__ = true
        sinon.stub(User, 'instantiate').returns new LoggedOutUser
        @user = User.instantiate()

      afterEach ->
        User.instantiate.restore()
        Backbone.sync.restore()

      describe 'existing session', ->
        it 'tries to get the anonymous session', (done) ->
          promise = @user.findOrCreate success: (collection) =>
            @user.id.should.equal 'anonymous-session-id'
            promise.isFulfilled().should.be.true()
            done()
          promise.isFulfilled().should.be.false()
          Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/anonymous_sessions'
          Backbone.sync.args[0][2].success [id: 'anonymous-session-id']

      describe 'no previous session', ->
        it 'tries to get the session and if it comes up empty it creates one', (done) ->
          promise = @user.findOrCreate success: =>
            @user.id.should.equal 'fresh-anonymous-session-id'
            promise.isFulfilled().should.be.true()
            done()
          promise.isFulfilled().should.be.false()
          Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/anonymous_sessions'
          Backbone.sync.args[0][2].success [] # No existing session
          # Creates one:
          promise.isFulfilled().should.be.false()
          Backbone.sync.args[1][0].should.equal 'create'
          Backbone.sync.args[1][1].url().should.containEql '/api/v1/me/anonymous_session'
          Backbone.sync.args[1][2].success id: 'fresh-anonymous-session-id'
