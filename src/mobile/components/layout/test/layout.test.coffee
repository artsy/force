jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
benv = require 'benv'
{ resolve } = require 'path'
sd = require('sharify').data
rewire = require 'rewire'
sinon = require 'sinon'

{ fabricate } = require '@artsy/antigravity'

xdescribe 'Bootstrapping client-side environment', ->
  # FIXME: this whole file errors setting up due to react-flickity jquery errors
  # Uncaught TypeError: Cannot set property 'imagesLoaded' of undefined
  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: require 'jquery'
        matchMedia: sinon.stub().returns({
          matches: false,
          addListener: sinon.stub()
          removeListener: sinon.stub()
        })

      sd['API_URL'] = 'http://localhost:5000'
      sd['ARTSY_XAPP_TOKEN'] = 'xappfoobar'
      sd['CURRENT_USER'] = { accessToken: 'accessfoobar' }
      sd['APP_URL'] = 'http://m.artsy.net'
      @bootstrap = rewire '../bootstrap'
      @bootstrap.__set__('mountStitch', sinon.stub())
      @bootstrap()
      done()

  afterEach ->
    benv.teardown()

  it 'adds the XAPP token to ajax requests', ->
    $.ajaxSettings.headers['X-XAPP-TOKEN'].should.equal 'xappfoobar'

  it 'adds the access token to ajax requests', ->
    $.ajaxSettings.headers['X-ACCESS-TOKEN'].should.equal 'accessfoobar'

xdescribe 'Layout init code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: require 'jquery'
        matchMedia: sinon.stub().returns({
          matches: false,
          addListener: sinon.stub()
          removeListener: sinon.stub()
        })
      sd['ARTSY_XAPP_TOKEN'] = 'xappfoobar'
      sd['CURRENT_USER'] = { accessToken: 'accessfoobar' }
      sd['APP_URL'] = 'http://m.artsy.net'
      require('../bootstrap')()
      sinon.stub $, 'ajax'
      { @syncAuth } = require '../bootstrap'
      done()

  afterEach ->
    benv.teardown()

  it 'logs you out if Gravity throws an auth error', ->
    sd.CURRENT_USER = fabricate 'user'
    @syncAuth()
    $.ajax.args[0][0].url.should.containEql 'api/v1/me'
    $.ajax.args[0][0].error()
    window.location.should.equal '/users/sign_out'
    sd.CURRENT_USER = null

describe 'Canonical url', ->

  xit "renders the canonical meta tag", ->
    filename = path.resolve __dirname, "../templates/main.jade"
    jade.compile(
      fs.readFileSync(filename),
      { filename: filename }
    )(pathname: '/test', sd: { APP_URL: 'http://artsy.net'}).should.containEql "link href=\"http://artsy.net/test\" rel=\"canonical\""

xdescribe 'inquiry cookies', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: require 'jquery'
        matchMedia: sinon.stub().returns({
          matches: false,
          addListener: sinon.stub()
          removeListener: sinon.stub()
        })
      @bootstrap = rewire '../bootstrap'
      @bootstrap.__set__ 'Cookies', @Cookies = {
        set: sinon.stub(),
        get: sinon.stub()
      }
      @bootstrap.__set__ 'sd', { APP_URL: 'http://artsy.net' }
      @bootstrap.__set__('mountStitch', sinon.stub())
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

xdescribe 'afterSignUpAction', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: require 'jquery'
        matchMedia: sinon.stub().returns({
          matches: false,
          addListener: sinon.stub()
          removeListener: sinon.stub()
        })
      @bootstrap = rewire '../bootstrap'
      @getCookie = sinon.stub()
      @bootstrap.__set__ 'Cookies', @Cookies = {
        set: sinon.stub()
        get: @getCookie
        expire: sinon.stub()
      }
      @bootstrap.__set__ 'CurrentUser', {
        orNull: sinon.stub().returns({
          initializeDefaultArtworkCollection: sinon.stub(),
          defaultArtworkCollection: sinon.stub().returns({
            saveArtwork: @saveArtwork = sinon.stub()
          }),
          follow: @follow = sinon.stub()
        })
      }
      @bootstrap.__set__('mountStitch', sinon.stub())
      done()

  afterEach ->
    benv.teardown()

  it 'returns if there is not a user', ->
    @bootstrap.__set__ 'CurrentUser', {
      orNull: sinon.stub().returns(false)
    }
    @bootstrap()
    @Cookies.expire.callCount.should.equal 0
  
  it 'saves an artwork', ->
    @getCookie.returns(
      JSON.stringify({
        action: 'save',
        objectId: '123',
        kind: 'artist'
      })
    )
    @bootstrap()
    @saveArtwork.args[0][0].should.equal '123'

  it 'follows an entity', ->
    @getCookie.returns(
      JSON.stringify({
        action: 'follow',
        objectId: '123',
        kind: 'gallery'
      })
    )
    @bootstrap()
    @follow.args[0][0].should.equal '123'
    @follow.args[0][1].should.equal 'gallery'

  it 'expires the cookie afterwards', ->
    @getCookie.returns(
      JSON.stringify({
        action: 'follow',
        objectId: '123',
        kind: 'gallery'
      })
    )
    @bootstrap()
    @Cookies.expire.args[0][0].should.equal 'afterSignUpAction'
