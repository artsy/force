/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const ArtworkInquiry = require("../../models/artwork_inquiry")

describe("ArtworkInquiry", function () {
  beforeEach(function () {
    return (this.inquiry = new ArtworkInquiry())
  })

  return describe("#send", function () {
    beforeEach(() =>
      sinon
        .stub(Backbone, "sync")
        .yieldsTo("success")
        .returns(Promise.resolve())
    )

    afterEach(() => Backbone.sync.restore())

    it("sends the inquiry immediately", function () {
      const success = sinon.spy()
      return this.inquiry
        .set({ id: "foo" })
        .send(null, { success })
        .then(function () {
          success.called.should.be.ok()
          return Backbone.sync.args[0][2].url.should.containEql(
            "/api/v1/me/artwork_inquiry_request/foo/send"
          )
        })
    })

    return it("saves the inquiry first if its new", function () {
      this.inquiry.save = sinon.stub().returns(Promise.resolve())
      this.inquiry.send()
      return this.inquiry.save.called.should.be.ok()
    })
  })
})
