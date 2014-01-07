errors  = require('../../../lib/middleware/errors')
sinon   = require 'sinon'

describe 'Errors middleware', ->

  it 'turns a path into a search term', ->
    errors.extractTerm('/artist/andy-warhole/auction-results').should.equal 'Andy warhole'
    errors.extractTerm('/artist/andy-warhole/auction-results/').should.equal 'Andy warhole'
    errors.extractTerm('/artist/i don\'t care').should.equal 'I don\'t care'

  it 'redirects to the search page', ->
    err = new Error({ error: 'Artist not found' })
    errors.notFoundError(err, req = { url: '/artist/andy-warhole' }, res = { statusCode: 404, redirect: sinon.stub() }, ->)
    res.redirect.args[0][0].should.equal '/search?q=Andy warhole&referrer=%2Fartist%2Fandy-warhole'

describe '#loginError', ->

  beforeEach ->
    @req = {}
    @res = { send: sinon.stub(), status: sinon.stub() }

  it 'sends a 403 for bad passwords', ->
    errors.loginError { message: 'invalid email or password' }, @req, @res, ->
    @res.status.args[0][0].should.equal 403
    @res.send.args[0][0].error.should.equal 'invalid email or password'