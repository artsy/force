/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { buildBodyClass } = require("../../lib/template_helpers")

describe("Helpers", () =>
  describe("#buildBodyClass", function () {
    it("returns a body class given an empty object and base class", () =>
      buildBodyClass({}, "my-base-class").should.equal("my-base-class"))

    it("returns a body class given a data object and base class", function () {
      buildBodyClass(
        {
          IGNORE: true,
          MICROSITE: true,
          EIGEN: false,
        },
        "my-base-class"
      ).should.equal("my-base-class is-microsite")

      return buildBodyClass(
        {
          IGNORE: true,
          MICROSITE: true,
          EIGEN: true,
        },
        "my-base-class"
      ).should.equal("my-base-class is-microsite body-eigen")
    })

    return it("returns a body class given a data object", () =>
      buildBodyClass({
        IGNORE: true,
        MICROSITE: true,
        EIGEN: true,
      }).should.equal("is-microsite body-eigen"))
  }))
