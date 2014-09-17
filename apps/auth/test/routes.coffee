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
