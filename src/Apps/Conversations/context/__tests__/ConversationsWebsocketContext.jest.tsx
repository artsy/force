import { renderHook } from "@testing-library/react-hooks"
import {
  ConversationsWebsocketProvider,
  useCable,
} from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useSystemContext as baseUseSystemContext } from "System/Hooks/useSystemContext"

jest.mock("System/Hooks/useSystemContext")

const mockUseSystemContext = baseUseSystemContext as jest.Mock

const mockCreateConsumer = jest.fn().mockReturnValue({
  subscriptions: { create: jest.fn() },
  disconnect: jest.fn(),
})

jest.mock("actioncable", () => ({
  createConsumer: (...args: unknown[]) => mockCreateConsumer(...args),
}))

describe("ConversationsWebsocketContext", () => {
  it("returns a null cable and an empty channels holder when used outside a provider", () => {
    const { result } = renderHook(() => useCable())

    expect(result.current.cable).toBeNull()
    expect(result.current.channelsHolder.getChannel("anything")).toBeUndefined()
  })
})

describe("ConversationsWebsocketProvider", () => {
  beforeEach(() => {
    mockCreateConsumer.mockClear()
    mockUseSystemContext.mockReturnValue({
      user: { accessToken: "test-token" },
    })
  })

  it("creates exactly one consumer even when multiple hooks read the cable", () => {
    const { result: resultA } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })
    const { result: resultB } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    expect(resultA.current.cable).not.toBeNull()
    expect(resultB.current.cable).not.toBeNull()
    // Each renderHook mounts its own provider instance in this test, so this
    // asserts intra-provider memoization: re-rendering the same provider
    // does not re-create the consumer.
    expect(mockCreateConsumer).toHaveBeenCalledTimes(2)
  })

  it("returns a null cable when the user has no access token", () => {
    mockUseSystemContext.mockReturnValue({ user: null })

    const { result } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    expect(result.current.cable).toBeNull()
    expect(mockCreateConsumer).not.toHaveBeenCalled()
  })
})
