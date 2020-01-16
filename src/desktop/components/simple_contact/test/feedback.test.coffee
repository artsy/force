benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../models/current_user'
FeedbackView = benv.requireWithJadeify require.resolve('../views/feedback'), ['template']

describe 'FeedbackView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new FeedbackView
    sinon.stub(Backbone, 'sync').yieldsTo 'success'

  afterEach ->
    Backbone.sync.restore()

  describe 'logged out', ->
    beforeEach ->
      @view.render()

    it 'renders correctly', ->
      @view.$('h1').text().should.equal 'Send feedback to Artsy'
      @view.$('textarea').attr('placeholder').should.equal 'Leave your comments'
      @view.$('.scontact-from').should.have.lengthOf 0
      @view.$('input[name="user_name"]').should.have.lengthOf 1
      @view.$('input[name="user_email"]').should.have.lengthOf 1

    it 'submits the feedback', ->
      Backbone.sync.called.should.be.false()
      @view.$('input[name="user_name"]').val 'Iam Loggedout'
      @view.$('input[name="user_email"]').val 'foo@bar.com'
      @view.$('textarea[name="message"]').val 'My message'
      @view.$('button').click()
      Backbone.sync.called.should.be.true()
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/feedback'
      Backbone.sync.args[0][1].attributes.should.have.keys 'url', 'message', 'user_name', 'user_email'
      Backbone.sync.args[0][1].attributes.user_name.should.equal 'Iam Loggedout'
      Backbone.sync.args[0][1].attributes.message.should.equal 'My message'

  describe 'logged in', ->
    before ->
      sinon.stub(CurrentUser, 'orNull')
        .returns new CurrentUser(fabricate 'user', name: 'Iam Loggedin')

    after ->
      CurrentUser.orNull.restore()

    beforeEach ->
      @view.render()

    it 'renders correctly', ->
      @view.$('h1').text().should.equal 'Send feedback to Artsy'
      @view.$('textarea').attr('placeholder').should.equal 'Leave your comments'
      @view.$('.scontact-from').text().should.equal 'From: Iam Loggedin (craigspaeth@gmail.com)'

    it 'submits the feedback', ->
      Backbone.sync.called.should.be.false()
      @view.$('textarea[name="message"]').val 'My message'
      @view.$('button').click()
      Backbone.sync.called.should.be.true()
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/feedback'
      Backbone.sync.args[0][1].attributes.should.have.keys 'url', 'message', 'user_name', 'user_email'
      Backbone.sync.args[0][1].attributes.message.should.equal 'My message'
