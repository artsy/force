sinon = require 'sinon'
rewire = require 'rewire'
setup = rewire '../../lib/setup'
express = require 'express'

describe 'setup', ->

  beforeEach ->
    setup.__set__
      ipfilter: @ipfilter = sinon.stub().returns((req, res, next) -> next())
      artsyPassport: @artsyPassport = sinon.stub().returns((req, res, next) -> next())
      session: @session = sinon.stub().returns((req, res, next) -> next())
      bodyParser:
        json: @json = sinon.stub().returns((req, res, next) -> next())
        urlencoded: @urlencoded = sinon.stub().returns((req, res, next) -> next())
      bucketAssets: @bucketAssets = sinon.stub().returns((req, res, next) -> next())
      cors: @cors = sinon.stub().returns((req, res, next) -> next())
      artsyPassport: @artsyPassport = sinon.stub().returns((req, res, next) -> next())
      flash: @flash = sinon.stub().returns((req, res, next) -> next())
      logger: @logger = sinon.stub().returns((req, res, next) -> next())
    @app = express()
    sinon.spy @app, 'use'
    sinon.spy @app, 'get'
    sinon.spy @app, 'set'
    setup @app

  it 'blacklists ips', ->
    @ipfilter.args[0][1].log.should.be.false()
    @ipfilter.args[0][1].mode.should.equal 'deny'

  xit 'rate limits requests', ->

  xit 'increases max sockets', ->

  xit 'overrides Backbone sync', ->
    sync = (setup.__get__ 'Backbone').sync
    console.log sync()

  it 'mounts cookie and session middleware', ->
    @app.use.args[7][0].name.should.equal 'cookieParser'
    @app.set.args[3][0].should.equal 'trust proxy'
    @app.set.args[3][1].should.be.true()
    @session.args[0][0].secret.should.equal 'change-me'
    @session.args[0][0].name.should.equal 'force.sess'
    @session.args[0][0].maxAge.should.equal 31536000000
    @session.args[0][0].secure.should.equal false

  it 'proxies gravity api', ->
    @app.use.args[10][0].should.equal '/api'

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
    @logger.called.should.be.true()
    @logger.args[0][0].should.equal 'dev'

  it 'sets up system time', ->
    @app.get.args[1][0].should.equal '/system/time'

  it 'sets up system up', ->
    @app.get.args[2][0].should.equal '/system/up'
    console.log @app.get.args[2][1]

# describe 'development environment', ->

#   beforeEach ->
#     setup.__set__
#       NODE_ENV: 'development'
#       setupAuth: @setupAuth = sinon.stub()
#       setupEnv: @setupEnv = sinon.stub()
#       session: @session = sinon.stub().returns((req, res, next) -> next())
#       morgan: @morgan = sinon.stub().returns((req, res, next) -> next())
#     @app = express()
#     sinon.spy @app, 'use'
#     sinon.spy @app, 'get'
#     sinon.spy @app, 'set'
#     setup @app

#   it 'sets morgan logs to dev mode', ->
#     @morgan.args[0][0].should.equal 'dev'

#   it 'mounts development middleware', ->

# describe 'test environment', ->

#   beforeEach ->
#     setup.__set__
#       NODE_ENV: 'production'
#       setupAuth: @setupAuth = sinon.stub()
#       setupEnv: @setupEnv = sinon.stub()
#       session: @session = sinon.stub().returns((req, res, next) -> next())
#       morgan: @morgan = sinon.stub().returns((req, res, next) -> next())
#     @app = express()
#     sinon.spy @app, 'use'
#     sinon.spy @app, 'get'
#     sinon.spy @app, 'set'
#     setup @app

#   it 'mounts test middleware', ->
