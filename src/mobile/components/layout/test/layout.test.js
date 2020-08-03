/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const benv = require("benv")
const { resolve } = require("path")
const sd = require("sharify").data
const rewire = require("rewire")
const sinon = require("sinon")

const { fabricate } = require("@artsy/antigravity")

xdescribe("Bootstrapping client-side environment", function () {
  // FIXME: this whole file errors setting up due to react-flickity jquery errors
  // Uncaught TypeError: Cannot set property 'imagesLoaded' of undefined
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: require("jquery"),
        matchMedia: sinon.stub().returns({
          matches: false,
          addListener: sinon.stub(),
          removeListener: sinon.stub(),
        }),
      })

      sd["API_URL"] = "http://localhost:5000"
      sd["ARTSY_XAPP_TOKEN"] = "xappfoobar"
      sd["CURRENT_USER"] = { accessToken: "accessfoobar" }
      sd["APP_URL"] = "http://m.artsy.net"
      this.bootstrap = rewire("../bootstrap")
      this.bootstrap.__set__("mountStitch", sinon.stub())
      this.bootstrap()
      return done()
    })
  })

  afterEach(() => benv.teardown())

  it("adds the XAPP token to ajax requests", () =>
    $.ajaxSettings.headers["X-XAPP-TOKEN"].should.equal("xappfoobar"))

  return it("adds the access token to ajax requests", () =>
    $.ajaxSettings.headers["X-ACCESS-TOKEN"].should.equal("accessfoobar"))
})

xdescribe("Layout init code", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: require("jquery"),
        matchMedia: sinon.stub().returns({
          matches: false,
          addListener: sinon.stub(),
          removeListener: sinon.stub(),
        }),
      })
      sd["ARTSY_XAPP_TOKEN"] = "xappfoobar"
      sd["CURRENT_USER"] = { accessToken: "accessfoobar" }
      sd["APP_URL"] = "http://m.artsy.net"
      require("../bootstrap")()
      sinon.stub($, "ajax")
      ;({ syncAuth: this.syncAuth } = require("../bootstrap"))
      return done()
    })
  })

  afterEach(() => benv.teardown())

  return it("logs you out if Gravity throws an auth error", function () {
    sd.CURRENT_USER = fabricate("user")
    this.syncAuth()
    $.ajax.args[0][0].url.should.containEql("api/v1/me")
    $.ajax.args[0][0].error()
    window.location.should.equal("/users/sign_out")
    return (sd.CURRENT_USER = null)
  })
})

describe("Canonical url", () =>
  xit("renders the canonical meta tag", function () {
    const filename = path.resolve(__dirname, "../templates/main.jade")
    return jade
      .compile(fs.readFileSync(filename), { filename })({
        pathname: "/test",
        sd: { APP_URL: "http://artsy.net" },
      })
      .should.containEql('link href="http://artsy.net/test" rel="canonical"')
  }))

xdescribe("inquiry cookies", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: require("jquery"),
        matchMedia: sinon.stub().returns({
          matches: false,
          addListener: sinon.stub(),
          removeListener: sinon.stub(),
        }),
      })
      this.bootstrap = rewire("../bootstrap")
      this.bootstrap.__set__(
        "Cookies",
        (this.Cookies = {
          set: sinon.stub(),
          get: sinon.stub(),
        })
      )
      this.bootstrap.__set__("sd", { APP_URL: "http://artsy.net" })
      this.bootstrap.__set__("mountStitch", sinon.stub())
      return done()
    })
  })

  afterEach(() => benv.teardown())

  it("sets the inquiry-session-start and inquiry-referrer cookies", function () {
    this.bootstrap.__set__("doc", { referrer: "http://google.com" })
    this.bootstrap()
    this.Cookies.set.args[0][0].should.equal("inquiry-referrer")
    return this.Cookies.set.args[1][0].should.equal("inquiry-session-start")
  })

  return it("does not set the referrer if its from artsy.net", function () {
    this.bootstrap.__set__("doc", {
      referrer: "http://m.artsy.net/artwork/foo",
    })
    this.bootstrap()
    return this.Cookies.set.called.should.not.be.ok()
  })
})

xdescribe("afterSignUpAction", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: require("jquery"),
        matchMedia: sinon.stub().returns({
          matches: false,
          addListener: sinon.stub(),
          removeListener: sinon.stub(),
        }),
      })
      this.bootstrap = rewire("../bootstrap")
      this.getCookie = sinon.stub()
      this.bootstrap.__set__(
        "Cookies",
        (this.Cookies = {
          set: sinon.stub(),
          get: this.getCookie,
          expire: sinon.stub(),
        })
      )
      this.bootstrap.__set__("CurrentUser", {
        orNull: sinon.stub().returns({
          initializeDefaultArtworkCollection: sinon.stub(),
          defaultArtworkCollection: sinon.stub().returns({
            saveArtwork: (this.saveArtwork = sinon.stub()),
          }),
          follow: (this.follow = sinon.stub()),
        }),
      })
      this.bootstrap.__set__("mountStitch", sinon.stub())
      return done()
    })
  })

  afterEach(() => benv.teardown())

  it("returns if there is not a user", function () {
    this.bootstrap.__set__("CurrentUser", {
      orNull: sinon.stub().returns(false),
    })
    this.bootstrap()
    return this.Cookies.expire.callCount.should.equal(0)
  })

  it("saves an artwork", function () {
    this.getCookie.returns(
      JSON.stringify({
        action: "save",
        objectId: "123",
        kind: "artist",
      })
    )
    this.bootstrap()
    return this.saveArtwork.args[0][0].should.equal("123")
  })

  it("follows an entity", function () {
    this.getCookie.returns(
      JSON.stringify({
        action: "follow",
        objectId: "123",
        kind: "gallery",
      })
    )
    this.bootstrap()
    this.follow.args[0][0].should.equal("123")
    return this.follow.args[0][1].should.equal("gallery")
  })

  return it("expires the cookie afterwards", function () {
    this.getCookie.returns(
      JSON.stringify({
        action: "follow",
        objectId: "123",
        kind: "gallery",
      })
    )
    this.bootstrap()
    return this.Cookies.expire.args[0][0].should.equal("afterSignUpAction")
  })
})

describe("logoutEventHandler", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      sinon.stub($, "ajax")
      sinon.stub(window.location, "reload")
      this.analyticsHooks = sinon.stub()
      this.analyticsHooks.trigger = sinon.stub()
      this.FlashMessage = sinon.stub()
      this.bootstrap = rewire("../bootstrap")
      this.bootstrap.__set__("analyticsHooks", this.analyticsHooks)
      this.bootstrap.__set__("FlashMessage", this.FlashMessage)
      this.logoutEventHandler = this.bootstrap.__get__("logoutEventHandler")
      return done()
    })
  })

  after(function () {
    window.location.reload.restore()
    $.ajax.restore()
    return benv.teardown()
  })

  it("logs out the user and tracks the logout event", function () {
    this.logoutEventHandler()
    $.ajax.args[0][0].url.should.be.eql("/users/sign_out")
    $.ajax.args[0][0].type.should.be.eql("DELETE")
    $.ajax.args[0][0].success()
    this.analyticsHooks.trigger.args[0][0].should.be.eql("auth:logged-out")
    return window.location.reload.should.be.called
  })

  return it("flashes an error message if an error occurs", function () {
    this.logoutEventHandler()
    $.ajax.args[0][0].error(null, null, "some error")
    return this.FlashMessage.args[0][0].message.should.be.eql("some error")
  })
})
