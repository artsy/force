/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const excluded = require("../excluded")

describe("excluded", () =>
  it("returns true or false depending on the current path", function () {
    sinon.stub(excluded, "path").returns("/personalize")
    excluded.check().should.be.true()
    excluded.path.restore()

    sinon.stub(excluded, "path").returns("/personalize/")
    excluded.check().should.be.true()
    excluded.path.restore()

    sinon.stub(excluded, "path").returns("/personalize/categories")
    excluded.check().should.be.true()
    excluded.path.restore()

    sinon.stub(excluded, "path").returns("/")
    excluded.check().should.be.false()
    excluded.path.restore()

    sinon.stub(excluded, "path").returns("/about")
    excluded.check().should.be.false()
    excluded.path.restore()

    sinon.stub(excluded, "path").returns("/article/cool-article")
    excluded.check().should.be.false()
    return excluded.path.restore()
  }))
