/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const fs = require("fs")
const template = require("jade").compileFile(
  require.resolve("../templates/index.jade")
)
const fixture = require("./fixture")
fixture.categories = _.groupBy(fixture.jobs, "category")
const resizer = require("../../../components/resizer")
const data = _.extend({}, { asset() {}, sd: {} }, fixture, resizer, {
  markdown() {},
})

describe("/jobs", () =>
  describe("index", () =>
    it("renders correctly", () =>
      template(data).should.containEql(
        '<h1 class="jobs-header-headline bisected-header-cell">Join Our Team</h1>'
      ))))
