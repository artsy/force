sinon = require 'sinon'
sanitizeRedirect = require '../index'

describe 'sanitizeRedirect', ->
  it 'lets artsy.net subdomains through', ->
    sanitizeRedirect('http://2013.artsy.net').should.equal 'http://2013.artsy.net'

  it 'lets deeply nested artsy.net subdomains through', ->
    sanitizeRedirect('https://foo.2013.artsy.net').should.equal 'https://foo.2013.artsy.net'

  it 'lets artsy.net links through', ->
    sanitizeRedirect('https://artsy.net/about').should.equal 'https://artsy.net/about'

  it 'lets localhost through', ->
    sanitizeRedirect('http://localhost:3003/artwork/joe-piccillo-a-riposo').should.equal 'http://localhost:3003/artwork/joe-piccillo-a-riposo'

  it 'lets internal paths through', ->
    sanitizeRedirect('/log_in?redirect-to=/foo/bar').should.equal '/log_in?redirect-to=/foo/bar'

  it 'blocks external links not whitelisted; redirects to root', ->
    sanitizeRedirect('http://google.com').should.equal '/'
