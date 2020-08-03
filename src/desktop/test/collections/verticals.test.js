/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const moment = require("moment")
const sinon = require("sinon")
const Backbone = require("backbone")
const fixtures = require("../helpers/fixtures")
const Sections = require("../../collections/sections")

describe("Sections", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.sections = new Sections([fixtures.section]))
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#running", () =>
    it("pulls the currently running sections", function () {
      this.sections.reset([
        _.extend(_.clone(fixtures.section), {
          start_at: moment().subtract(1, "days").format(),
          end_at: moment().add(1, "days").format(),
          title: "Andy Foobar's Retrospective",
        }),
        fixtures.section,
      ])
      this.sections.running().length.should.equal(1)
      return this.sections
        .running()[0]
        .get("title")
        .should.equal("Andy Foobar's Retrospective")
    }))
})
