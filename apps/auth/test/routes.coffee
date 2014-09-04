_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'

describe 'Auth routes', ->
  beforeEach ->
    routes.__set__ 'request', del: @del = sinon.stub().returns(send: @send = sinon.stub().returns(end: (cb) -> cb()))
    @req = params: {}, logout: sinon.stub(), user: new Backbone.Model(accessToken: 'secret'), body: {}, query: {}, get: sinon.stub()
    @res = render: sinon.stub(), locals: { sd: {} }, send: sinon.stub(), redirect: sinon.stub()
    @next = sinon.stub()

  describe '#resetPassword', ->
    it 'renders the homepage', ->
      routes.resetPassword @req, @res
      @res.render.args[0][0].should.equal 'templates/reset_password'

  describe '#twitterLastStep', ->
    it 'renders the last step email page', ->
      routes.twitterLastStep @req, @res
      @res.render.args[0][0].should.equal 'templates/twitter_email'

  describe '#logout', ->
    it 'logs out, deletes the auth token, and redirects home', ->
      routes.logout @req, @res, @next
      @req.logout.called.should.be.true
      @del.args[0][0].should.containEql '/api/v1/access_token'
      @send.args[0][0].should.eql access_token: 'secret'
      @next.called.should.be.true

    it 'still works if there is no access token', ->
      @req.user = undefined
      routes.logout @req, @res, @next
      @req.logout.called.should.be.true
      @del.args[0][0].should.containEql '/api/v1/access_token'
      @send.args[0][0].should.eql access_token: undefined
      @next.called.should.be.true
