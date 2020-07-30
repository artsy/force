/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Serializer = require("../serializer")
const { template } = require("./fixture")

describe("Serializer", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.$form = $(template)
    return (this.serializer = new Serializer(this.$form))
  })

  return describe("#data", function () {
    it("should return all named inputs as keys regardless of values", function () {
      return this.serializer
        .data()
        .should.have.keys("name", "email", "comment", "yes", "no")
    })

    it("should return all values corresponding to keys", function () {
      const values = {
        name: "Foo Bar",
        email: "foo@bar.com",
        comment: "Baz Qux Whatever",
        yes: true,
        no: false,
      }

      this.$form.find('input[name="name"]').val(values.name)
      this.$form.find('input[name="email"]').val(values.email)
      this.$form.find('textarea[name="comment"]').val(values.comment)

      return this.serializer.data().should.containEql(values)
    })

    it("should sanitize HTML", function () {
      const values = { name: "<script src=http://xss.rocks/xss.js></script>" }

      this.$form.find('input[name="name"]').val(values.name)

      return this.serializer
        .data()
        .should.containEql({
          name: "&lt;script src=http://xss.rocks/xss.js>&lt;/script>",
        })
    })

    return describe("multi-selects", function () {
      beforeEach(() =>
        sinon.stub($.fn, "serializeArray").returns([
          { name: "foo", value: "bar" },
          { name: "foo", value: "baz" },
          { name: "foo", value: "qux" },
        ])
      )

      afterEach(() => $.fn.serializeArray.restore())

      return it("properly handles multiple values on the same key", function () {
        return this.serializer.data().foo.should.eql(["bar", "baz", "qux"])
      })
    })
  })
})
