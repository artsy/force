import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const { Tag } = require("../../models/tag")
import sinon from "sinon"

describe("Tag", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    testContext.tag = new Tag(fabricate("tag"))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#fetchFilterSuggest", () => {
    it("fetches the filter meta data", done => {
      testContext.tag.fetchFilterSuggest(
        { sort: "-foo" },
        {
          success(m, res) {
            res.total.should.equal(100)
            done()
          },
        }
      )
      Backbone.sync.args[0][2].data.sort.should.equal("-foo")
      Backbone.sync.args[0][2].success({ total: 100 })
    })
  })
})
