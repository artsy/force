Backbone = require 'backbone'
sinon = require 'sinon'
middleware = require '../../../lib/middleware/locals'

describe 'locals middleware', ->

  it 'adds a session id', ->
    middleware req = { url: 'localhost:3000', session: {}, get: (->)},
      res = { locals: { sd: {} } }, ->
    req.session.id.length.should.be.above 0
    res.locals.sd.SESSION_ID.should.equal req.session.id

  it 'adds the user agent', ->
    middleware req = { url: 'localhost:3000', get: -> 'foobar<script>omg</script>' },
      res = { locals: { sd: {} } }, ->
    res.locals.userAgent.should.equal 'foobar%3Cscript%3Eomg%3C/script%3E'

  it 'current_path does not include query params', ->
    middleware req = { url: 'localhost:3000/foo?bar=baz', get: -> 'foobar' },
      res = { locals: { sd: {} } }, ->
    res.locals.sd.CURRENT_PATH.should.equal '/foo'

  it 'flags eigen', ->
    middleware req = { url: 'localhost:3000/foo?bar=baz', get: -> 'Something something Artsy-Mobile' },
      res = { locals: { sd: {} } }, ->
    res.locals.sd.EIGEN.should.be.ok()

  it 'adds the referrer "medium"', ->
    middleware(
      req = { url: 'localhost:3000', get: -> 'https://www.google.com/' }
      res = { locals: { sd: {} } }
      ->
    )
    res.locals.sd.MEDIUM.should.equal 'search'

  it 'flags reflection', ->
    middleware req = { url: 'localhost:3000/foo?bar=baz', get: -> 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari' },
      res = { locals: { sd: {} } }, ->
    res.locals.sd.REFLECTION.should.be.ok()

  it 'works if there is no user agent', ->
    middleware req = { url: '', get: -> null }, res = { locals: { sd: {} } }, ->
    res.locals.sd.EIGEN.should.equal(false)
