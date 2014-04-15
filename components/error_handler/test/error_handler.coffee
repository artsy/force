rewire = require 'rewire'
sinon = require 'sinon'
express = require 'express'
errorHandler = rewire '../'

describe '#internalError', ->

  it 'renders a 500 page', ->
    errorHandler.internalError new Error("Some blah error"), {}, { statusCode: 500, send: spy = sinon.spy() }
    spy.args[0][0].should.equal 500
    spy.args[0][1].should.include "Some blah error"

  it 'hides error details in production', ->
    errorHandler.__set__ 'REVEAL_ERRORS', false
    errorHandler.internalError new Error("Some blah error"), {}, { statusCode: 500, send: spy = sinon.spy() }
    spy.args[0][0].should.equal 500
    spy.args[0][1].should.not.include "Some blah error"

  it 'renders the status code', ->
    errorHandler.internalError new Error("Some blah error"), {}, { statusCode: 404, send: spy = sinon.spy() }
    spy.args[0][0].should.equal 404

  it 'renders sharify data', ->
    errorHandler.internalError new Error("Some blah error"), {}, { statusCode: 404, send: spy = sinon.spy(), locals: sharify: script: script = sinon.stub() }
    script.called.should.be.ok

describe '#pageNotFound', ->

  it 'renders a 404 page', ->
    # Fake a Express request object with Accept header set
    req = express.request
    req.headers = Accept: 'text/html'
    errorHandler.pageNotFound req, { send: spy = sinon.spy() }
    spy.args[0][0].should.equal 404
    spy.args[0][1].should.include "The page you were looking for doesn't exist"

describe '#socialAuthError', ->

  it 'redirects to a login error', ->
    errorHandler.socialAuthError "User Already Exists", {}, @res = { redirect: sinon.stub() }
    @res.redirect.args[0][0].should.equal '/log_in?error=already-signed-up'

  it 'uses gravity style error messages if coming from facebook', ->
    errorHandler.socialAuthError "User Already Exists", { url: 'facebook' }, @res = { redirect: sinon.stub() }
    @res.redirect.args[0][0].should.equal '/log_in?account_created_email=facebook'

  it 'uses gravity style error messages if coming from tiwtter', ->
    errorHandler.socialAuthError "User Already Exists", { url: 'twitter' }, @res = { redirect: sinon.stub() }
    @res.redirect.args[0][0].should.equal '/log_in?account_created_email=twitter'
