jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
benv = require 'benv'
{ resolve } = require 'path'
sd = require('sharify').data
servers = require '../../../test/helpers/servers'
Browser = require 'zombie'
rewire = require 'rewire'
sinon = require 'sinon'

{ fabricate } = require 'antigravity'

describe 'Bootstrapping client-side environment', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: require 'jquery'

      sd['API_URL'] = 'http://localhost:5000'
      sd['ARTSY_XAPP_TOKEN'] = 'xappfoobar'
      sd['CURRENT_USER'] = { accessToken: 'accessfoobar' }
      sd['APP_URL'] = 'http://m.artsy.net'
      require('../bootstrap')()
      done()

  afterEach ->
    benv.teardown()

  it 'adds the XAPP token to ajax requests', ->
    $.ajaxSettings.headers['X-XAPP-TOKEN'].should.equal 'xappfoobar'

  it 'adds the access token to ajax requests', ->
    $.ajaxSettings.headers['X-ACCESS-TOKEN'].should.equal 'accessfoobar'

describe 'Layout init code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: require 'jquery'

      sd['ARTSY_XAPP_TOKEN'] = 'xappfoobar'
      sd['CURRENT_USER'] = { accessToken: 'accessfoobar' }
      sd['APP_URL'] = 'http://m.artsy.net'
      require('../bootstrap')()
      sinon.stub $, 'ajax'
      { @syncAuth } = require '../bootstrap'
      done()

  afterEach ->
    benv.teardown()

  xit 'logs you out if Gravity throws an auth error', ->
    sd.CURRENT_USER = fabricate 'user'
    @syncAuth()
    $.ajax.args[0][0].url.should.containEql 'api/v1/me'
    $.ajax.args[0][0].error()
    window.location.should.equal '/users/sign_out'
    sd.CURRENT_USER = null

describe 'Html class from user agent', ->

  before (done) ->
    servers.setup -> done()

  after ->
    servers.teardown()

  it 'adds the hide header/footer artsy-mobile class to the html tag', (done) ->
    browser = new Browser(userAgent: 'Artsy-Mobile')
    browser.visit 'http://localhost:5000', ->
      browser.wait ->
        browser.querySelector('html').className.should.containEql 'layout-artsy-mobile-app'
        done()

describe 'Canonical url', ->

  xit "renders the canonical meta tag", ->
    filename = path.resolve __dirname, "../templates/main.jade"
    jade.compile(
      fs.readFileSync(filename),
      { filename: filename }
    )(pathname: '/test', sd: { ARTSY_URL: 'http://artsy.net'}).should.containEql "link href=\"http://artsy.net/test\" rel=\"canonical\""

describe 'inquiry cookies', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: require 'jquery'

      @bootstrap = rewire '../bootstrap'
      @bootstrap.__set__ 'Cookies', @Cookies = { set: sinon.stub() }
      @bootstrap.__set__ 'sd', { APP_URL: 'http://artsy.net' }
      done()

  afterEach ->
    benv.teardown()

  it 'sets the inquiry-session-start and inquiry-referrer cookies', ->
    @bootstrap.__set__ 'doc', { referrer: 'http://google.com' }
    @bootstrap()
    @Cookies.set.args[0][0].should.equal 'inquiry-referrer'
    @Cookies.set.args[1][0].should.equal 'inquiry-session-start'

  it 'does not set the referrer if its from artsy.net', ->
    @bootstrap.__set__ 'doc', { referrer: 'http://m.artsy.net/artwork/foo' }
    @bootstrap()
    @Cookies.set.called.should.not.be.ok()
