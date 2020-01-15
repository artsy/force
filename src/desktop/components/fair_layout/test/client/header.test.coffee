_ = require 'underscore'
Backbone = require 'backbone'
benv = require 'benv'
sd = require('sharify').data
Profile = require '../../../../models/profile.coffee'
Fair = require '../../../../models/fair.coffee'
{ resolve } = require 'path'
sinon = require 'sinon'
mediator = require '../../../../lib/mediator.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
{ fabricate } = require '@artsy/antigravity'

describe 'HeaderView', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
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
        FairHeaderView.__set__ 'AuthModalView', @authModalView = sinon.stub()
        FairHeaderView.__set__ 'mediator', @mediator = { trigger: sinon.stub(), on: sinon.stub() }
        @view = new FairHeaderView el: $('.fair-layout-header-right'), model: @profile, fair: @fair
        @$template = $('body')
        done()

    afterEach ->
      Backbone.sync.restore()
      $.ajax.restore()

    describe '#login', ->
      it 'triggers the mediator', ->
        @view.$('.mlh-login').click()
        @mediator.trigger.args[0][0].should.equal 'open:auth'
        @mediator.trigger.args[0][1].mode.should.equal 'login'

    describe '#signup', ->
      it 'triggers the mediator', ->
        @view.$('.mlh-signup').click()
        @mediator.trigger.args[0][0].should.equal 'open:auth'
        @mediator.trigger.args[0][1].mode.should.equal 'signup'

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
        $.ajax.args[0][0].type.should.equal 'DELETE'
        $.ajax.args[0][0].url.should.equal '/users/sign_out'
