errors  = require('../../../lib/middleware/errors')
sinon   = require 'sinon'

describe 'Errors middleware', ->
  it 'turns a path into a search term', ->
    errors.extractTerm('/artist/andy-warhole/auction-results').should.equal 'Andy warhole'
    errors.extractTerm('/artist/andy-warhole/auction-results/').should.equal 'Andy warhole'
    errors.extractTerm('/artist/i don\'t care').should.equal 'I don\'t care'

  it 'redirects to the search page', ->
    err = new Error({ error: 'Artist not found' })
    errors.errorHandler(err, req = { url: '/artist/andy-warhole' }, res = { statusCode: 404, redirect: sinon.stub() }, ->)
    res.redirect.args[0][0].should.equal '/search?q=Andy warhole&referrer=%2Fartist%2Fandy-warhole'
