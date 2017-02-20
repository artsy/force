_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'

describe 'Auth routes', ->
  beforeEach ->
    routes.__set__ 'request', del: @del = sinon.stub().returns(send: @send = sinon.stub().returns(end: (cb) -> cb()))
    routes.__set__ 'sanitizeRedirect', (route) -> route

    @req =
      params: {}
      body: {}
      query: {}
      session: {}
      get: sinon.stub()
      logout: sinon.stub()
      user: new Backbone.Model accessToken: 'secret'
    @res = render: sinon.stub(), send: sinon.stub(), redirect: sinon.stub()
    @next = sinon.stub()

  describe '#resetPassword', ->
    it 'redirects to the reset password page; setting the token in the session', ->
      @req.query.reset_password_token = 'existy'
      routes.resetPassword @req, @res
      @res.redirect.called.should.be.true()
      @req.session.reset_password_token.should.equal 'existy'
      @res.redirect.args[0][0].should.equal '/reset_password'

    it 'renders the reset password page when there is no reset_password_token query param', ->
      routes.resetPassword @req, @res
      @res.render.args[0][0].should.equal 'reset_password'

  describe '#twitterLastStep', ->
    it 'renders the last step email page', ->
      routes.twitterLastStep @req, @res
      @res.render.args[0][0].should.equal 'twitter_email'
