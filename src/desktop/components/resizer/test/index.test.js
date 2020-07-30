/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { extend } = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")

const dispatch = rewire("../services/index")
const embedly = rewire("../services/embedly")
embedly.__set__("resizer", dispatch)
const gemini = rewire("../services/gemini")
gemini.__set__("resizer", dispatch)

const resizer = rewire("../index")
resizer.__set__("SERVICES", { EMBEDLY: embedly, GEMINI: gemini })

describe("resizer", function () {
  before(function () {
    return (this.src =
      "https://d32dm0rphc51dk.cloudfront.net/RhCPuRWITO6WFW2Zu_u3EQ/large.jpg")
  })

  describe("using the embedly proxy", function () {
    before(function () {
      embedly.__set__("EMBEDLY_KEY", "xxx")

      this.config = resizer.__get__("config")
      return resizer.__set__(
        "config",
        extend({}, this.config, { proxy: "EMBEDLY" })
      )
    })

    after(function () {
      return resizer.__set__("config", this.config)
    })

    describe("#resize", function () {
      it("returns the appropriate URL", function () {
        return resizer
          .resize(this.src, { width: 32, height: 32 })
          .should.equal(
            "https://i.embed.ly/1/display/resize?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&quality=80&key=xxx"
          )
      })

      it("supports options", function () {
        return resizer
          .resize(this.src, { width: 300, height: 200, quality: 50 })
          .should.equal(
            "https://i.embed.ly/1/display/resize?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&height=200&quality=50&key=xxx"
          )
      })

      return it("falls back when it has invalid options", function () {
        return resizer
          .resize(this.src, { width: 0, height: 100 })
          .should.equal(this.src)
      })
    })

    describe("#crop", function () {
      it("returns the appropriate URL", function () {
        return resizer
          .crop(this.src, { width: 32, height: 32 })
          .should.equal(
            "https://i.embed.ly/1/display/crop?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&quality=80&key=xxx"
          )
      })

      it("supports options", function () {
        return resizer
          .crop(this.src, { width: 300, height: 200, quality: 50 })
          .should.equal(
            "https://i.embed.ly/1/display/crop?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&height=200&quality=50&key=xxx"
          )
      })

      return it("falls back when it has invalid options", function () {
        return resizer
          .crop(this.src, { width: 0, height: 100 })
          .should.equal(this.src)
      })
    })

    describe("#fill", function () {
      it("returns the appropriate URL", function () {
        return resizer
          .fill(this.src, { width: 32, height: 32 })
          .should.equal(
            "https://i.embed.ly/1/display/fill?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&color=fff&quality=80&key=xxx"
          )
      })

      it("supports options", function () {
        return resizer
          .fill(this.src, {
            width: 300,
            height: 200,
            quality: 50,
            color: "ff00cc",
          })
          .should.equal(
            "https://i.embed.ly/1/display/fill?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&height=200&color=ff00cc&quality=50&key=xxx"
          )
      })

      return it("falls back when it has invalid options", function () {
        return resizer
          .fill(this.src, { width: 0, height: 100 })
          .should.equal(this.src)
      })
    })

    return describe("when disabled", function () {
      beforeEach(() => dispatch.__set__("enabled", false))

      afterEach(() => dispatch.__set__("enabled", true))

      return it("returns the non-proxied URL", function () {
        resizer
          .resize(this.src, { width: 32, height: 32 })
          .should.equal(this.src)
        resizer.crop(this.src, { width: 32, height: 32 }).should.equal(this.src)
        return resizer
          .fill(this.src, { width: 32, height: 32 })
          .should.equal(this.src)
      })
    })
  })

  return describe("using the gemini proxy", function () {
    before(function () {
      gemini.endpoint = "https://d7hftxdivxxvm.cloudfront.net"

      this.config = resizer.__get__("config")
      return resizer.__set__(
        "config",
        extend({}, this.config, { proxy: "GEMINI" })
      )
    })

    after(function () {
      return resizer.__set__("config", this.config)
    })

    describe("#resize", function () {
      it("returns the appropriate URL when no width is specified", function () {
        return resizer
          .resize(this.src, { height: 300 })
          .should.equal(
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=height&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&height=300&quality=80"
          )
      })

      it("returns the appropriate URL when no height is specified", function () {
        return resizer
          .resize(this.src, { width: 300 })
          .should.equal(
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&quality=80"
          )
      })

      return it("returns the appropriate URL when both a height and width are specified", function () {
        return resizer
          .resize(this.src, { width: 300, height: 200 })
          .should.equal(
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&height=200&quality=80"
          )
      })
    })

    describe("#crop", () =>
      it("returns the appropriate URL", function () {
        return resizer
          .crop(this.src, { width: 32, height: 32 })
          .should.equal(
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&quality=80"
          )
      }))

    return describe("#fill", () =>
      it("is not really supported and falls back to crop", function () {
        return resizer
          .fill(this.src, { width: 32, height: 32 })
          .should.equal(
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&quality=80"
          )
      }))
  })
})
