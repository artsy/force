/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const UserEdit = require("../../models/user_edit.coffee")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")

describe("UserEdit", function () {
  beforeEach(function () {
    this.userEdit = new UserEdit(fabricate("user"))
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("#validate (client validation)", function () {
    beforeEach(function () {
      return (this.values = {})
    })

    describe("email", function () {
      it("ensures that the email is confirmed", function () {
        this.values.email = "bob@example.com"
        this.userEdit
          .validate(this.values)
          .email_confirmation.should.equal(
            this.userEdit.errorMessages.email_confirmation_emtpy
          )

        this.values.email_confirmation = "bob.mckenzie@example.com"
        this.userEdit
          .validate(this.values)
          .email_confirmation.should.equal(
            this.userEdit.errorMessages.email_confirmation
          )

        this.values.email_confirmation = "bob@example.com"
        return _.isUndefined(
          this.userEdit.validate(this.values)
        ).should.be.true()
      })

      return it("does not validate if the email is unchanged", function () {
        this.values.email = this.userEdit.get("email")
        return _.isUndefined(
          this.userEdit.validate(this.values)
        ).should.be.true()
      })
    })

    return describe("name", () =>
      it("is required", function () {
        this.values.name = " "
        this.userEdit
          .validate(this.values)
          .name.should.equal(this.userEdit.errorMessages.name_empty)
        this.values.name = this.userEdit.get("name")
        return _.isUndefined(
          this.userEdit.validate(this.values)
        ).should.be.true()
      }))
  })

  return describe("#refresh", () =>
    it("makes a client request to /user/refresh", function () {
      this.userEdit.refresh()
      return Backbone.sync.args[0][2].url.should.equal("/user/refresh")
    }))
})
