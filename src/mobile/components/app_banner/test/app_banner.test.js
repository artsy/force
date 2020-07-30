/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const rewire = require("rewire")
const sinon = require("sinon")

describe("AppBanner", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose(
        {
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        },
        (location.replace = sinon.stub())
      )
      this.AppBanner = rewire("../app_banner")
      $("body").html((this.$content = $('<div id="content"></div>')))
      this.AppBanner.__set__("Cookies", { get() {}, set() {} })
      return done()
    })
  })

  after(() => benv.teardown())

  beforeEach(function () {
    return (this.appBanner = new this.AppBanner(this.$content))
  })

  it("inserts the app banner before the passed in element", function () {
    $("body").html().should.containEql("Artsy for iPhone™")
    return $(".app-banner").siblings().attr("id").should.equal("content")
  })

  return describe("#shouldDisplay", () =>
    describe("has not seen", function () {
      beforeEach(function () {
        return (this.UA = this.AppBanner.__get__("USER_AGENT"))
      })

      afterEach(function () {
        return this.AppBanner.__set__("USER_AGENT", this.UA)
      })

      xit("true when iPhone but not Safari (i.e., Chrome on iOS)", function () {
        this.AppBanner.__set__(
          "USER_AGENT",
          "Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en-gb) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3"
        )
        return this.AppBanner.shouldDisplay().should.be.true()
      })

      it("false when Eigen", function () {
        this.AppBanner.__set__(
          "USER_AGENT",
          "Mozilla/5.0 Artsy-Mobile/3.0.3 Eigen/2016.12.02.09/3.0.3 (iPad; iOS 10.1.1; Scale/2.00) AppleWebKit/601.1.46 (KHTML, like Gecko)"
        )
        return this.AppBanner.shouldDisplay().should.be.false()
      })

      return it("false when iPhone/Safari, where meta tag supersedes this", function () {
        this.AppBanner.__set__(
          "USER_AGENT",
          "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        )
        return this.AppBanner.shouldDisplay().should.be.false()
      })
    }))
})
