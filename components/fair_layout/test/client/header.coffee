_ = require 'underscore'
Backbone = require 'backbone'
benv = require 'benv'
sd = require('sharify').data
Profile = require '../../../../models/profile.coffee'
Fair = require '../../../../models/fair.coffee'
SearchBar = require './search_bar.coffee'
{ resolve } = require 'path'

sinon = require 'sinon'
mediator = require '../../../../lib/mediator.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
analytics = require '../../../../lib/analytics.coffee'
{ fabricate } = require 'antigravity'

describe 'HeaderView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'user is signed out', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      sinon.stub $, 'ajax'
      @fair = new Fair fabricate 'fair'
      @profile = new Profile fabricate 'fair_profile'
      benv.render resolve(__dirname, '../../templates/header.jade'), {sd: {}, _: _}, =>
        FairHeaderView = benv.require resolve(__dirname, '../../client/header')
        @view = new FairHeaderView el: $('.fair-layout-header-right'), model: @profile, fair: @fair
        @$template = $('body')
        done()

    afterEach ->
      Backbone.sync.restore()
      $.ajax.restore()

    describe '#login', ->
      it 'triggers the mediator', ->
        spy = sinon.spy mediator, 'trigger'
        @view.$('.mlh-login').click()

        spy.args[0][0].should.equal 'open:auth'
        spy.args[0][1].mode.should.equal 'login'

        mediator.trigger.restore()

    describe '#signup', ->
      it 'triggers the mediator', ->
        spy = sinon.spy mediator, 'trigger'
        @view.$('.mlh-signup').click()

        spy.args[0][0].should.equal 'open:auth'
        spy.args[0][1].mode.should.equal 'signup'

        mediator.trigger.restore()

  describe 'user signed in', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      sinon.stub $, 'ajax'
      @fair = new Fair fabricate 'fair'
      @profile = new Profile fabricate 'fair_profile'
      @user = new CurrentUser fabricate('user')
      sd = { CURRENT_USER: @user }
      benv.render resolve(__dirname, '../../templates/header.jade'), { sd: sd, _: _, user: @user }, =>
        FairHeaderView = benv.require resolve(__dirname, '../../client/header')
        @view = new FairHeaderView el: $('.fair-layout-header-right'), model: @profile, fair: @fair
        @$template = $('body')
        done()

    afterEach ->
      Backbone.sync.restore()
      $.ajax.restore()

    describe '#logout', ->

      it 'signs out user with ajax', ->
        @view.$('.mlh-logout').click()

        console.log $.ajax.args

        $.ajax.args[0][0].type.should.equal 'DELETE'
        $.ajax.args[0][0].url.should.equal '/users/sign_out'
