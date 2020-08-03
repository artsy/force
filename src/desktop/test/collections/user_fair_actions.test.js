/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const UserFairActions = require("../../collections/user_fair_actions")

describe("UserFairActions", function () {
  beforeEach(function () {
    this.userFairActions = new UserFairActions()
    this.userFairActions.attendFair({ id: "the-armory-show" })
    return this.userFairActions.attendFair({ id: "frieze-new-york" })
  })

  return describe("#isAttending", () =>
    it("returns true if the fair attendance action is present", function () {
      this.userFairActions
        .isAttending({ id: "the-armory-show" })
        .should.be.true()
      this.userFairActions
        .isAttending({ id: "some-other-fair" })
        .should.be.false()
      return this.userFairActions
        .isAttending({ id: "frieze-new-york" })
        .should.be.true()
    }))
})
