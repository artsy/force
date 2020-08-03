/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const benv = require("benv")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Activator", function () {
  describe("/foo/bar", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          sd: { CURRENT_PATH: "/foo/bar" },
        })
        this.$cases = $(render("activator")())
        return done()
      })
    })

    after(function () {
      benv.teardown()
      return this.$cases.remove()
    })

    return it("activates properly", function () {
      this.$cases.find("#case-1").text().should.equal("is-active")
      this.$cases.find("#case-2").text().should.equal("is-active")
      this.$cases.find("#case-3").text().should.equal("is-inactive")
      this.$cases.find("#case-4").text().should.equal("is-inactive")
      this.$cases.find("#case-5").text().should.equal("is-inactive")
      return this.$cases.find("#case-6").text().should.equal("is-inactive")
    })
  })

  describe("/foo/bar", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          sd: { CURRENT_PATH: "/foo/bar/" },
        })
        this.$cases = $(render("activator")())
        return done()
      })
    })

    after(function () {
      this.$cases.remove()
      return benv.teardown()
    })

    return it("activates properly", function () {
      this.$cases.find("#case-1").text().should.equal("is-active")
      this.$cases.find("#case-2").text().should.equal("is-active")
      this.$cases.find("#case-3").text().should.equal("is-inactive")
      this.$cases.find("#case-4").text().should.equal("is-inactive")
      this.$cases.find("#case-5").text().should.equal("is-inactive")
      return this.$cases.find("#case-6").text().should.equal("is-inactive")
    })
  })

  describe("/foo/baz", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          sd: { CURRENT_PATH: "/foo/baz" },
        })
        this.$cases = $(render("activator")())
        return done()
      })
    })

    after(function () {
      this.$cases.remove()
      return benv.teardown()
    })

    return it("activates properly", function () {
      this.$cases.find("#case-1").text().should.equal("is-inactive")
      this.$cases.find("#case-2").text().should.equal("is-inactive")
      this.$cases.find("#case-3").text().should.equal("is-active")
      this.$cases.find("#case-4").text().should.equal("is-inactive")
      this.$cases.find("#case-5").text().should.equal("is-inactive")
      return this.$cases.find("#case-6").text().should.equal("is-inactive")
    })
  })

  describe("/about", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          sd: { CURRENT_PATH: "/about" },
        })
        this.$cases = $(render("activator")())
        return done()
      })
    })

    after(function () {
      this.$cases.remove()
      return benv.teardown()
    })

    return it("activates properly", function () {
      this.$cases.find("#case-1").text().should.equal("is-inactive")
      this.$cases.find("#case-2").text().should.equal("is-inactive")
      this.$cases.find("#case-3").text().should.equal("is-inactive")
      this.$cases.find("#case-4").text().should.equal("is-inactive")
      this.$cases.find("#case-5").text().should.equal("is-active")
      return this.$cases.find("#case-6").text().should.equal("is-inactive")
    })
  })

  return describe("/about/foobar", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          sd: { CURRENT_PATH: "/about/foobar" },
        })
        this.$cases = $(render("activator")())
        return done()
      })
    })

    after(function () {
      this.$cases.remove()
      return benv.teardown()
    })

    return it("activates properly", function () {
      this.$cases.find("#case-1").text().should.equal("is-inactive")
      this.$cases.find("#case-2").text().should.equal("is-inactive")
      this.$cases.find("#case-3").text().should.equal("is-inactive")
      this.$cases.find("#case-4").text().should.equal("is-inactive")
      this.$cases.find("#case-5").text().should.equal("is-active")
      return this.$cases.find("#case-6").text().should.equal("is-active")
    })
  })
})
