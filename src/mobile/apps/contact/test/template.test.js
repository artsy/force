/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const fs = require("fs")
const template = require("jade").compileFile(
  require.resolve("../templates/template.jade")
)
const fixture = require("../fixtures/contact.json")
const data = _.extend({}, { asset() {}, sd: {}, data: fixture, markdown() {} })

describe("/contact", () =>
  describe("index", () =>
    it("renders correctly", () =>
      template(data).should.containEql(
        '<h4 class="contact-section-headers">Contact Us</h4>'
      ))))
