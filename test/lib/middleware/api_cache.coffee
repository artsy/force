_ = require 'underscore'
rewire = require 'rewire'
sinon = require 'sinon'
express = require 'express'
request = require 'superagent'
config = require '../../../config'
config.CLIENT_CACHE_ROUTES = ['/api/artwork/:id']
apiCache = rewire '../../../lib/middleware/api_cache'

app = express()
app.use (req, res, next) ->
  res.locals.sd = { ARTSY_URL: 'api.artsy.net' }
  next()
app.use apiCache
app.get '/locals', (req, res) ->
  res.send res.locals
app.get '/api*', (req, res) ->
  proxy.web req, res, { target: 'http://localhost:5003' }

grav = express()
grav.get '/api/artwork/foo', (req, res) ->
  res.send { title: 'Foo at the bar' }

describe 'API cache middleware', ->

  beforeEach (done) ->
    apiCache.__set__ 'cache', @cache = {
      set: sinon.stub()
      get: sinon.stub()
    }
    apiCache.__set__ 'ARTSY_URL', 'http://localhost:5003'
    done = _.after 2, done
    @gravServer = grav.listen "5003", done
    @server = app.listen "5002", done

  afterEach ->
    @server.close()
    @gravServer.close()

  it 'overrides the ARTSY_URL to use the locals', (done) ->
    request.get('http://localhost:5002/locals').end (res) ->
      res.body.sd.ARTSY_URL.should.equal ''
      done()

  it 'caches a white listed request to the api', (done) ->
    @cache.get.callsArg 1
    request.get('http://localhost:5002/api/artwork/foo').end (res) =>
      @cache.set.args[0][0].should
        .equal 'client-api-cache:http://localhost:5003/api/artwork/foo'
      @cache.set.args[0][1].should.equal '{"title":"Foo at the bar"}'
      res.body.title.should.equal 'Foo at the bar'
      done()

  it 'pulls from the cache', (done) ->
    @cache.get.callsArgWith 1, null, JSON.stringify { title: 'Bar at the baz' }
    request.get('http://localhost:5002/api/artwork/foo').end (res) ->
      res.body.title.should.equal 'Bar at the baz'
      done()
