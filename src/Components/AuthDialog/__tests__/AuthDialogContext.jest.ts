import { INITIAL_STATE, reducer } from "Components/AuthDialog/AuthDialogContext"

describe("AuthDialogContext", () => {
  describe("FALLBACK", () => {
    it("retains the submitted email when falling back to login", () => {
      const state = reducer(INITIAL_STATE, {
        type: "FALLBACK",
        payload: { email: "example@example.com" },
      })

      expect(state).toMatchObject({
        mode: "Login",
        isFallback: true,
        values: { email: "example@example.com" },
      })
    })
  })
})
