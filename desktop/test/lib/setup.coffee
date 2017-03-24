sinon = require 'sinon'
rewire = require 'rewire'
setup = rewire '../../lib/setup'
express = require 'express'

describe 'setup', ->

  beforeEach ->
    setup.__set__
      ipfilter = @ipfilter = sinon.stub()
      setupAuth: @setupAuth = sinon.stub()
      setupEnv: @setupEnv = sinon.stub()
      session: @session = sinon.stub().returns((req, res, next) -> next())
      morgan: @morgan = sinon.stub().returns((req, res, next) -> next())
      bodyParser:
        json: @json = sinon.stub().returns((req, res, next) -> next())
        urlencoded: @urlencoded = sinon.stub().returns((req, res, next) -> next())
      bucketAssets: @bucketAssets = sinon.stub().returns((req, res, next) -> next())
    @app = express()
    sinon.spy @app, 'use'
    sinon.spy @app, 'get'
    sinon.spy @app, 'set'
    setup @app

  it 'blacklists ips', ->
    @app.get.args[0][0].should.equal '/system/up'

  it 'rate limits', ->

  it 'uses ssl', ->

  it 'increases max sockets', ->

  it 'overrides Backbone sync', ->

  it 'uses sharify', ->

  it 'mounts development middleware', ->

  it 'mounts test middleware', ->

  it 'mounts cookie and session middleware', ->

  it 'proxies gravity api', ->

  it 'mounts bodyparser', ->

  it 'mounts passport', ->

  it ''


  it 'mounts generic middleware', ->
    @setupEnv.called.should.be.true()
    @app.use.args[1][0].name.should.containEql 'cookieParser'
    @json.args[0][0].limit.should.equal '5mb'
    @json.args[0][0].extended.should.be.true()
    @urlencoded.args[0][0].limit.should.equal '5mb'
    @urlencoded.args[0][0].extended.should.be.true()
    @bucketAssets.called.should.be.true()
    @setupAuth.called.should.be.true()

  it 'sets morgan logs to custom mode', ->
    tokens =
      status: -> 200
      method: -> 'GET'
      url: -> 'https://writer.artsy.net'
      'response-time': -> 1000
      'remote-addr': -> '0.0.0.0'
      'user-agent': -> 'Mozilla'
    @morgan.args[0][0](tokens, {}, {}).should.equal '\u001b[33mCLIENT:\u001b[39m \u001b[34mGET\u001b[39m \u001b[32mhttps://writer.artsy.net 200\u001b[39m \u001b[36m1000ms\u001b[39m \u001b[37m0.0.0.0\u001b[39m "\u001b[37mMozilla\u001b[39m"'

describe 'development environment', ->

  beforeEach ->
    setup.__set__
      NODE_ENV: 'development'
      setupAuth: @setupAuth = sinon.stub()
      setupEnv: @setupEnv = sinon.stub()
      session: @session = sinon.stub().returns((req, res, next) -> next())
      morgan: @morgan = sinon.stub().returns((req, res, next) -> next())
    @app = express()
    sinon.spy @app, 'use'
    sinon.spy @app, 'get'
    sinon.spy @app, 'set'
    setup @app

  it 'sets morgan logs to dev mode', ->
    @morgan.args[0][0].should.equal 'dev'

describe 'production environment', ->

  beforeEach ->
    setup.__set__
      NODE_ENV: 'production'
      setupAuth: @setupAuth = sinon.stub()
      setupEnv: @setupEnv = sinon.stub()
      session: @session = sinon.stub().returns((req, res, next) -> next())
      morgan: @morgan = sinon.stub().returns((req, res, next) -> next())
    @app = express()
    sinon.spy @app, 'use'
    sinon.spy @app, 'get'
    sinon.spy @app, 'set'
    setup @app

  it 'sets morgan logs to custom mode', ->
    tokens =
      status: -> 200
      method: -> 'GET'
      url: -> 'https://writer.artsy.net'
      'response-time': -> 1000
      'remote-addr': -> '0.0.0.0'
      'user-agent': -> 'Mozilla'
    @morgan.args[0][0](tokens, {}, {}).should.equal '\u001b[33mCLIENT:\u001b[39m \u001b[34mGET\u001b[39m \u001b[32mhttps://writer.artsy.net 200\u001b[39m \u001b[36m1000ms\u001b[39m \u001b[37m0.0.0.0\u001b[39m "\u001b[37mMozilla\u001b[39m"'

  it 'sets SSL options', ->
    @app.set.args[3][0].should.equal 'forceSSLOptions'
    @app.set.args[3][1].trustXFPHeader.should.be.true()