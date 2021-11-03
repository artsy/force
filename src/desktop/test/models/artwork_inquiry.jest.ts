import sinon from "sinon"
import Backbone from "backbone"
const { ArtworkInquiry } = require("../../models/artwork_inquiry")

describe("ArtworkInquiry", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.inquiry = new ArtworkInquiry()
  })

  describe("#send", () => {
    beforeEach(() => {
      sinon
        .stub(Backbone, "sync")
        .yieldsTo("success")
        .returns(Promise.resolve())
    })

    afterEach(() => Backbone.sync.restore())

    it("sends the inquiry immediately", () => {
      const success = sinon.spy()
      testContext.inquiry
        .set({ id: "foo" })
        .send(null, { success })
        .then(function () {
          success.called.should.be.ok()
          Backbone.sync.args[0][2].url.should.containEql(
            "/api/v1/me/artwork_inquiry_request/foo/send"
          )
        })
    })

    it("saves the inquiry first if its new", () => {
      testContext.inquiry.save = sinon.stub().returns(Promise.resolve())
      testContext.inquiry.send()
      testContext.inquiry.save.called.should.be.ok()
    })
  })
})
