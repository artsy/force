sinon = require 'sinon'
rewire = require 'rewire'
express = require 'express'
path = require 'path'

describe 'setup', ->

  before ->
    @setup = rewire '../../lib/setup'

  describe 'setup production environment', ->

    before ->
      @setup.__set__
        NODE_ENV: 'production'
        MAX_SOCKETS: 10
        ipfilter: @ipfilter = sinon.stub().returns((req, res, next) -> next())
        artsyPassport: @artsyPassport = sinon.stub().returns((req, res, next) -> next())
        session: @session = sinon.stub().returns((req, res, next) -> next())
        bodyParser:
          json: @json = sinon.stub().returns((req, res, next) -> next())
          urlencoded: @urlencoded = sinon.stub().returns((req, res, next) -> next())
        bucketAssets: @bucketAssets = sinon.stub().returns((req, res, next) -> next())
        cors: @cors = sinon.stub().returns((req, res, next) -> next())
        flash: @flash = sinon.stub().returns((req, res, next) -> next())
        logger: @logger = sinon.stub().returns((req, res, next) -> next())
        http: @http = globalAgent: {}
      @app = express()
      sinon.stub @app, 'use'
      sinon.stub @app, 'get'
      sinon.stub @app, 'set'
      @setup @app

    it 'blacklists ips', ->
      @ipfilter.args[0][1].log.should.be.false()
      @ipfilter.args[0][1].mode.should.equal 'deny'

    it 'increases max sockets', ->
      @http.globalAgent.maxSockets.should.equal 10

    it 'overrides Backbone sync', ->
      sync = (@setup.__get__ 'Backbone').sync
      sync.toString().should.containEql "options.headers['X-XAPP-TOKEN']"

    it 'mounts cookie and session middleware', ->
      @app.use.args[5][0].name.should.equal 'cookieParser'
      @app.set.args[0][0].should.equal 'trust proxy'
      @app.set.args[0][1].should.be.true()
      @session.args[0][0].secret.should.equal 'change-me'
      @session.args[0][0].name.should.equal 'force.sess'
      @session.args[0][0].maxAge.should.equal 31536000000
      @session.args[0][0].secure.should.equal true

    it 'proxies gravity api', ->
      @app.use.args[7][0].should.equal '/api'

    it 'mounts bodyparser', ->
      @json.callCount.should.equal 1
      @urlencoded.callCount.should.equal 1
      @urlencoded.args[0][0].extended.should.be.true()

    it 'uses cors', ->
      @cors.callCount.should.equal 1
      @cors.args[0][0].origin[0].should.equal 'http://localhost:3004'
      @cors.args[0][0].origin[1].should.equal 'https://m.artsy.net'

    it 'mounts passport with extended config', ->
      @artsyPassport.callCount.should.equal 1
      @artsyPassport.args[0][0].userKeys.length.should.equal 10
      @artsyPassport.args[0][0].ARTSY_URL.should.equal 'http://localhost:3000'
      @artsyPassport.args[0][0].CurrentUser.should.be.ok()

    it 'mounts generic middleware', ->
      @bucketAssets.called.should.be.true()
      @flash.called.should.be.true()

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

    it 'sets up system time', ->
      @app.get.args[0][0].should.equal '/system/time'

    it 'sets up system up', ->
      @app.get.args[1][0].should.equal '/system/up'
      @app.get.args[1][1]

  describe 'development environment', ->

    before ->
      @setup.__set__
        NODE_ENV: 'development'
        MAX_SOCKETS: -1
        http: @http = globalAgent: {}
        session: @session = sinon.stub().returns((req, res, next) -> next())
        logger: @logger = sinon.stub().returns((req, res, next) -> next())
        sharify: sinon.stub().returns((req, res, next) -> next())
      @app = express()
      sinon.spy @app, 'use'
      sinon.spy @app, 'get'
      sinon.spy @app, 'set'
      @setup @app

    it 'sets morgan logs to dev mode', ->
      @logger.args[0][0].should.equal 'dev'

    it 'mounts cookie and session middleware', ->
      @session.args[0][0].secure.should.equal false

    it 'mounts stylus', ->
      @app.use.args[5][0].name.should.equal 'stylus'

    it 'uses a default max socket value', ->
      @http.globalAgent.maxSockets.should.equal Number.MAX_VALUE

  describe 'test environment', ->

    before ->
      @setup.__set__
        NODE_ENV: 'test'
        sharify: sinon.stub().returns((req, res, next) -> next())
      @app = express()
      sinon.spy @app, 'use'
      sinon.spy @app, 'get'
      sinon.spy @app, 'set'
      @setup @app

    it 'mounts test middleware', ->
      @app.use.args[6][0].should.equal '/__gravity'
