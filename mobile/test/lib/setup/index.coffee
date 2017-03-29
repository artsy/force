sinon = require 'sinon'
rewire = require 'rewire'
setup = rewire '../../../lib/setup'
express = require 'express'

describe 'setup production environment', ->

  beforeEach ->
    setup.__set__
      NODE_ENV: 'production'
      MAX_SOCKETS: 10
      artsyPassport: @artsyPassport = sinon.stub().returns((req, res, next) -> next())
      session: @session = sinon.stub().returns((req, res, next) -> next())
      bodyParser:
        json: @json = sinon.stub().returns((req, res, next) -> next())
        urlencoded: @urlencoded = sinon.stub().returns((req, res, next) -> next())
      bucketAssets: @bucketAssets = sinon.stub().returns((req, res, next) -> next())
      artsyPassport: @artsyPassport = sinon.stub().returns((req, res, next) -> next())
      logger: @logger = sinon.stub().returns((req, res, next) -> next())
      http: @http = globalAgent: {}
    @app = express()
    sinon.spy @app, 'use'
    sinon.spy @app, 'get'
    sinon.spy @app, 'set'
    setup @app

  it 'increases max sockets', ->
    @http.globalAgent.maxSockets.should.equal 10

  it 'overrides Backbone sync', ->
    sync = (setup.__get__ 'Backbone').sync
    sync.toString().should.containEql "options.headers['X-XAPP-TOKEN']"

  it 'mounts cookie and session middleware', ->
    @app.use.args[9][0].name.should.equal 'cookieParser'
    @app.set.args[3][0].should.equal 'trust proxy'
    @app.set.args[3][1].should.be.true()
    @session.args[0][0].secret.should.equal 'artsyoss'
    @session.args[0][0].name.should.equal 'microgravity-sess'
    @session.args[0][0].maxAge.should.equal 31536000000
    @session.args[0][0].secure.should.equal true

  it 'mounts bodyparser', ->
    @json.callCount.should.equal 1
    @urlencoded.callCount.should.equal 1
    @urlencoded.args[0][0].extended.should.be.true()

  it 'mounts passport with extended config', ->
    @artsyPassport.callCount.should.equal 1
    @artsyPassport.args[0][0].ARTSY_URL.should.equal 'http://localhost:3000'
    @artsyPassport.args[0][0].APP_URL.should.equal 'http://localhost:3003'
    @artsyPassport.args[0][0].CurrentUser.should.be.ok()
    @artsyPassport.args[0][0].signupRedirect.should.equal '/personalize'

  it 'mounts generic middleware', ->
    @bucketAssets.called.should.be.true()

  it 'sets up logger with custom format', ->
    @logger.called.should.be.true()
    tokens =
      status: -> 200
      method: -> 'GET'
      url: -> 'https://artsy.net'
      'response-time': -> 1000
      'remote-addr': -> '0.0.0.0'
      'user-agent': -> 'Mozilla'
    @logger.args[0][0](tokens, {}, {}).should.equal '\u001b[34mGET\u001b[39m \u001b[32mhttps://artsy.net 200\u001b[39m \u001b[36m1000ms\u001b[39m \u001b[37m0.0.0.0\u001b[39m "\u001b[37mMozilla\u001b[39m"'

  it 'sets up system up', ->
    @app.get.args[2][0].should.equal '/system/up'

describe 'development environment', ->

  beforeEach ->
    setup.__set__
      NODE_ENV: 'development'
      MAX_SOCKETS: -1
      http: @http = globalAgent: {}
      session: @session = sinon.stub().returns((req, res, next) -> next())
      logger: @logger = sinon.stub().returns((req, res, next) -> next())
    @app = express()
    sinon.spy @app, 'use'
    sinon.spy @app, 'get'
    sinon.spy @app, 'set'
    setup @app

  it 'sets morgan logs to dev mode', ->
    @logger.args[0][0].should.equal 'dev'

  it 'mounts cookie and session middleware', ->
    @session.args[0][0].secure.should.equal false

  it 'mounts stylus', ->
    @app.use.args[15][0].name.should.equal 'stylus'

  it 'uses a default max socket value', ->
    @http.globalAgent.maxSockets.should.equal Number.MAX_VALUE

describe 'test environment', ->

  beforeEach ->
    setup.__set__
      NODE_ENV: 'test'
    @app = express()
    sinon.spy @app, 'use'
    sinon.spy @app, 'get'
    sinon.spy @app, 'set'
    setup @app

  it 'mounts test middleware', ->
    @app.use.args[13][0].should.equal '/__gravity'
    @app.use.args[14][0].should.equal '/__positron'