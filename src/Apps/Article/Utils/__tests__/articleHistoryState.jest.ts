import { getTocJumpState, pushTocJumpEntry } from "../articleHistoryState"

describe("articleHistoryState", () => {
  const originalState = window.history.state

  beforeEach(() => {
    window.history.replaceState({}, "")
  })

  afterAll(() => {
    window.history.replaceState(originalState, "")
  })

  describe("getTocJumpState", () => {
    it("returns null for null state", () => {
      expect(getTocJumpState(null)).toBeNull()
    })

    it("returns null for empty object", () => {
      expect(getTocJumpState({})).toBeNull()
    })

    it("returns null when articleTocJump has no session", () => {
      expect(getTocJumpState({ articleTocJump: { scrollY: 100 } })).toBeNull()
    })

    it("extracts a back-restore marker (session + scrollY)", () => {
      const marker = { session: 0, scrollY: 250 }

      expect(getTocJumpState({ articleTocJump: marker })).toEqual(marker)
    })

    it("extracts a forward-jump marker (session + targetId)", () => {
      const marker = { session: 1, targetId: "a--heading" }

      expect(getTocJumpState({ articleTocJump: marker })).toEqual(marker)
    })
  })

  describe("pushTocJumpEntry", () => {
    it("stamps the current entry with scrollY and pushes a new entry with targetId", () => {
      const replaceSpy = jest.spyOn(window.history, "replaceState")
      const pushSpy = jest.spyOn(window.history, "pushState")

      pushTocJumpEntry({
        scrollY: 500,
        targetId: "a--intro",
        session: 3,
        hash: "#JUMP--a--intro",
      })

      expect(replaceSpy).toHaveBeenCalledTimes(1)
      const replacedState = replaceSpy.mock.calls[0][0] as Record<string, any>
      expect(replacedState.articleTocJump).toEqual({
        session: 3,
        scrollY: 500,
      })

      expect(pushSpy).toHaveBeenCalledTimes(1)
      const [pushedState, , pushedUrl] = pushSpy.mock.calls[0]
      expect((pushedState as Record<string, any>).articleTocJump).toEqual({
        session: 3,
        targetId: "a--intro",
      })
      expect(pushedUrl).toBe("#JUMP--a--intro")

      replaceSpy.mockRestore()
      pushSpy.mockRestore()
    })

    it("preserves unrelated existing history state", () => {
      window.history.replaceState({ existing: true }, "")

      pushTocJumpEntry({
        scrollY: 0,
        targetId: "b--foo",
        session: 0,
        hash: "#JUMP--b--foo",
      })

      expect(window.history.state.existing).toBe(true)
      expect(window.history.state.articleTocJump).toEqual({
        session: 0,
        targetId: "b--foo",
      })
    })

    it("does not leak scrollY from the stamped entry into the pushed entry", () => {
      pushTocJumpEntry({
        scrollY: 999,
        targetId: "c--bar",
        session: 7,
        hash: "#JUMP--c--bar",
      })

      expect(window.history.state.articleTocJump).toEqual({
        session: 7,
        targetId: "c--bar",
      })
      expect(window.history.state.articleTocJump.scrollY).toBeUndefined()
    })
  })
})
