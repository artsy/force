const { buildBodyClass } = require("../../lib/template_helpers")

describe("Helpers", () => {
  describe("#buildBodyClass", () => {
    it("returns a body class given an empty object and base class", () => {
      buildBodyClass({}, "my-base-class").should.equal("my-base-class")
    })

    it("returns a body class given a data object and base class", () => {
      buildBodyClass(
        {
          EIGEN: false,
          IGNORE: true,
          MICROSITE: true,
        },
        "my-base-class"
      ).should.equal("my-base-class is-microsite")

      buildBodyClass(
        {
          EIGEN: true,
          IGNORE: true,
          MICROSITE: true,
        },
        "my-base-class"
      ).should.equal("my-base-class is-microsite body-eigen")
    })

    it("returns a body class given a data object", () => {
      buildBodyClass({
        EIGEN: true,
        IGNORE: true,
        MICROSITE: true,
      }).should.equal("is-microsite body-eigen")
    })
  })
})
