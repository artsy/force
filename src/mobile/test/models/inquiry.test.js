/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Inquiry = require("../../models/inquiry")
const { fabricate } = require("@artsy/antigravity")

describe("Inquiry", function () {
  beforeEach(function () {
    return (this.inquiry = new Inquiry(fabricate("artwork_inquiry_request")))
  })

  return describe("#validate", function () {
    it("ensures a name and email for inquiries with a session", function () {
      this.inquiry.set({ session_id: "foobar", name: null })
      return this.inquiry
        .validate(this.inquiry.toJSON())
        .should.containEql("Please include a valid name")
    })

    it("allows valid emails and names", function () {
      this.inquiry.set({
        session_id: "foobar",
        name: "Craig",
        email: "craigspaeth@gmail.com",
      })
      return (
        this.inquiry.validate(this.inquiry.toJSON()) != null
      ).should.not.be.ok()
    })

    return it("doesnt complain about trailing/leading whitespace", function () {
      this.inquiry.set({
        session_id: "foobar",
        name: "Craig",
        email: "craigspaeth@gmail.com ",
      })
      return (
        this.inquiry.validate(this.inquiry.toJSON()) != null
      ).should.not.be.ok()
    })
  })
})
