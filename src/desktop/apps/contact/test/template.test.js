/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const template = require("jade").compileFile(
  require.resolve("../templates/index.jade")
)
const fixture = require("./fixture")
const data = _.extend({}, { asset() {}, sd: {} }, fixture, { markdown() {} })

describe("/contact", () =>
  describe("index", () =>
    it("renders correctly", () =>
      template(data).should.containEql("<h1>Contact Us</h1>"))))
