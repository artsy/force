import Backbone from "backbone"
import { clone, extend } from "lodash"
import moment from "moment"
const fixtures = require("../../test/helpers/fixtures.coffee")
const Sections = require("../sections.coffee")

describe("Sections", () => {
  let sections

  beforeEach(() => {
    Backbone.sync = jest.fn()
    sections = new Sections([fixtures.section])
  })

  describe("#running", () => {
    it("pulls the currently running sections", () => {
      sections.reset([
        extend(clone(fixtures.section), {
          end_at: moment().add(1, "days").format(),
          start_at: moment().subtract(1, "days").format(),
          title: "Andy Foobar's Retrospective",
        }),
        fixtures.section,
      ])
      sections.running().length.should.equal(1)
      sections
        .running()[0]
        .get("title")
        .should.equal("Andy Foobar's Retrospective")
    })
  })
})
