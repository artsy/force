sinon = require 'sinon'
redirectExternalLinks = require '../../../lib/middleware/redirect_external_links.coffee'

describe 'redirectExternalLinks', ->

  beforeEach ->
    @req = { headers: { 'user-agent': 'Artsy-Mobile' }, url: '/http://2013.artsy.net' }
    @res = { redirect: sinon.stub() }
    redirectExternalLinks @req, @res, @next

  it 'redirects the native app trying to get to an external site based on a relative path', ->
    @res.redirect.args[0][0].should.equal 'http://2013.artsy.net'
