import { renderHook } from "@testing-library/react-hooks"
import { waitFor } from "@testing-library/react"
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

  it("creates exactly one consumer when multiple hooks read the cable from the same provider", async () => {
    const MultiConsumerWrapper = () => {
      const cableA = useCable()
      const cableB = useCable()
      return (
        <div>
          <span data-testid="cable-a">{String(cableA.cable !== null)}</span>
          <span data-testid="cable-b">{String(cableB.cable !== null)}</span>
          <span data-testid="same-cable">
            {String(cableA.cable === cableB.cable)}
          </span>
        </div>
      )
    }

    const { result } = renderHook(() => useCable(), {
      wrapper: ({ children }) => (
        <ConversationsWebsocketProvider>
          <MultiConsumerWrapper />
          {children}
        </ConversationsWebsocketProvider>
      ),
    })

    await waitFor(() => {
      expect(result.current.cable).not.toBeNull()
    })

    expect(mockCreateConsumer).toHaveBeenCalledTimes(1)
  })

  it("returns a null cable when the user has no access token", async () => {
    mockUseSystemContext.mockReturnValue({ user: null })

    const { result } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    await waitFor(() => {
      expect(result.current.cable).toBeNull()
    })

    expect(mockCreateConsumer).not.toHaveBeenCalled()
  })
})
