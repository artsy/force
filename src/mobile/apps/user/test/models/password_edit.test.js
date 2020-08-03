/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const CurrentUser = require("../../../../models/current_user.coffee")
const PasswordEdit = require("../../models/password_edit.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("PasswordEdit", function () {
  beforeEach(function () {
    this.passwordEdit = new PasswordEdit(fabricate("user"))
    return (this.user = new CurrentUser(fabricate("user")))
  })

  describe("#url", () =>
    it("should leverage the parent url", function () {
      return this.passwordEdit.url().should.equal(`${this.user.url()}/password`)
    }))

  return describe("#validate (client validation)", function () {
    beforeEach(function () {
      return (this.values = {})
    })

    it("ensures that the password is at least six chars long", function () {
      this.values.new_password = "12345"
      this.passwordEdit
        .validate(this.values)
        .new_password.should.equal(
          this.passwordEdit.errorMessages.new_password_min
        )
      this.values.new_password = "123456"
      return _.isUndefined(
        this.passwordEdit.validate(this.values)
      ).should.be.true()
    })

    it("ensures the confirmation password matches the new", function () {
      this.values.new_password = "123456"
      this.values.password_confirmation = "654321"
      this.passwordEdit
        .validate(this.values)
        .password_confirmation.should.equal(
          this.passwordEdit.errorMessages.password_confirmation
        )
      this.values.password_confirmation = "123456"
      return _.isUndefined(
        this.passwordEdit.validate(this.values)
      ).should.be.true()
    })

    return it("ensures the new isn't the old", function () {
      this.values = {
        new_password: "123456",
        password_confirmation: "123456",
        current_password: "123456",
      }
      this.passwordEdit
        .validate(this.values)
        .new_password.should.equal(
          this.passwordEdit.errorMessages.new_password_same
        )
      this.values.current_password = "654321"
      return _.isUndefined(
        this.passwordEdit.validate(this.values)
      ).should.be.true()
    })
  })
})
