const { UserFairActions } = require("../user_fair_actions")

describe("UserFairActions", () => {
  let userFairActions

  beforeEach(() => {
    userFairActions = new UserFairActions()
    userFairActions.attendFair({ id: "the-armory-show" })
    userFairActions.attendFair({ id: "frieze-new-york" })
  })

  describe("#isAttending", () => {
    it("returns true if the fair attendance action is present", () => {
      userFairActions.isAttending({ id: "the-armory-show" }).should.be.true()
      userFairActions.isAttending({ id: "some-other-fair" }).should.be.false()
      userFairActions.isAttending({ id: "frieze-new-york" }).should.be.true()
    })
  })
})
