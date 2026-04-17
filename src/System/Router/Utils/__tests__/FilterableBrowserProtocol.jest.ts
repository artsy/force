import { FilterableBrowserProtocol } from "System/Router/Utils/FilterableBrowserProtocol"

const dispatchPopState = (state: unknown) => {
  window.history.replaceState(state, "")
  window.dispatchEvent(new PopStateEvent("popstate", { state }))
}

describe("FilterableBrowserProtocol", () => {
  let protocol: FilterableBrowserProtocol
  let listener: jest.Mock
  let unsubscribe: () => void

  const originalState = window.history.state

  beforeEach(() => {
    protocol = new FilterableBrowserProtocol()
    listener = jest.fn()
    unsubscribe = protocol.subscribe(listener)
  })

  afterEach(() => {
    unsubscribe()
    window.history.replaceState(originalState, "")
  })

  describe("addPopStateHandler", () => {
    it("does not block the router when no handler is registered", () => {
      dispatchPopState({ foo: 1 })

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it("does not block the router when a handler returns false", () => {
      protocol.addPopStateHandler(() => false)

      dispatchPopState({ foo: 1 })

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it("blocks the router when a handler returns true", () => {
      protocol.addPopStateHandler(() => true)

      dispatchPopState({ foo: 1 })

      expect(listener).not.toHaveBeenCalled()
    })

    it("short-circuits at the first handler that returns true", () => {
      const a = jest.fn().mockReturnValue(false)
      const b = jest.fn().mockReturnValue(true)
      const c = jest.fn().mockReturnValue(true)

      protocol.addPopStateHandler(a)
      protocol.addPopStateHandler(b)
      protocol.addPopStateHandler(c)

      dispatchPopState({ foo: 1 })

      expect(a).toHaveBeenCalled()
      expect(b).toHaveBeenCalled()
      expect(c).not.toHaveBeenCalled()
      expect(listener).not.toHaveBeenCalled()
    })

    it("passes the current history state to the handler", () => {
      const handler = jest.fn().mockReturnValue(false)
      protocol.addPopStateHandler(handler)

      dispatchPopState({ marker: "hello" })

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ marker: "hello" }),
      )
    })

    it("removes the handler when the returned dispose fn is called", () => {
      const handler = jest.fn().mockReturnValue(true)
      const dispose = protocol.addPopStateHandler(handler)

      dispose()

      dispatchPopState({ foo: 1 })

      expect(handler).not.toHaveBeenCalled()
      expect(listener).toHaveBeenCalledTimes(1)
    })
  })

  describe("getSession", () => {
    it("starts at 0", () => {
      expect(protocol.getSession()).toBe(0)
    })

    it("increments on PUSH navigations", () => {
      protocol.navigate({ pathname: "/a", action: "PUSH" } as any)
      expect(protocol.getSession()).toBe(1)

      protocol.navigate({ pathname: "/b", action: "PUSH" } as any)
      expect(protocol.getSession()).toBe(2)
    })

    it("does not increment on REPLACE navigations", () => {
      protocol.navigate({ pathname: "/a", action: "REPLACE" } as any)
      expect(protocol.getSession()).toBe(0)
    })
  })
})
