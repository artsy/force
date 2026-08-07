import { render, screen, waitFor } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import {
  type ChannelListener,
  ConversationsWebsocketProvider,
  createChannelsHolder,
  useCable,
} from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useSystemContext as baseUseSystemContext } from "System/Hooks/useSystemContext"

jest.mock("System/Hooks/useSystemContext")

const mockUseSystemContext = baseUseSystemContext as jest.Mock

const mockDisconnect = jest.fn()

const mockCreateConsumer = jest.fn(() => ({
  subscriptions: { create: jest.fn() },
  disconnect: mockDisconnect,
}))

jest.mock("actioncable", () => ({
  createConsumer: (...args: unknown[]) => mockCreateConsumer(...(args as [])),
}))

describe("createChannelsHolder", () => {
  const makeSubscription = () => {
    return { unsubscribe: jest.fn() }
  }

  it("creates a single physical subscription shared by every listener for a key", () => {
    const holder = createChannelsHolder()
    const subscription = makeSubscription()
    const fanOuts: ChannelListener[] = []
    const createSubscription = jest.fn((onMessage: ChannelListener) => {
      fanOuts.push(onMessage)
      return subscription
    })

    const firstListener = jest.fn()
    const secondListener = jest.fn()

    holder.subscribe({
      key: "inbox",
      listener: firstListener,
      createSubscription,
    })
    holder.subscribe({
      key: "inbox",
      listener: secondListener,
      createSubscription,
    })

    expect(createSubscription).toHaveBeenCalledTimes(1)
    expect(holder.hasSubscription("inbox")).toBe(true)

    // Fan the inbound payload out through the callback handed to the creator
    fanOuts[0]({ type: "message.sent" })

    expect(firstListener).toHaveBeenCalledWith({ type: "message.sent" })
    expect(secondListener).toHaveBeenCalledWith({ type: "message.sent" })
  })

  it("only unsubscribes once the last listener for a key deregisters", () => {
    const holder = createChannelsHolder()
    const subscription = makeSubscription()
    const createSubscription = jest.fn(() => subscription)

    const deregisterFirst = holder.subscribe({
      key: "inbox",
      listener: jest.fn(),
      createSubscription,
    })
    const deregisterSecond = holder.subscribe({
      key: "inbox",
      listener: jest.fn(),
      createSubscription,
    })

    deregisterFirst()

    expect(subscription.unsubscribe).not.toHaveBeenCalled()
    expect(holder.hasSubscription("inbox")).toBe(true)

    deregisterSecond()

    expect(subscription.unsubscribe).toHaveBeenCalledTimes(1)
    expect(holder.hasSubscription("inbox")).toBe(false)
  })

  it("keeps separate keys independent", () => {
    const holder = createChannelsHolder()
    const fanOuts: ChannelListener[] = []
    const createSubscription = jest.fn((onMessage: ChannelListener) => {
      fanOuts.push(onMessage)
      return makeSubscription()
    })

    const inboxListener = jest.fn()
    const threadListener = jest.fn()

    holder.subscribe({
      key: "inbox",
      listener: inboxListener,
      createSubscription,
    })
    holder.subscribe({
      key: "conversation:1",
      listener: threadListener,
      createSubscription,
    })

    expect(createSubscription).toHaveBeenCalledTimes(2)

    fanOuts[0]({ type: "message.sent" })

    expect(inboxListener).toHaveBeenCalledTimes(1)
    expect(threadListener).not.toHaveBeenCalled()
  })

  it("drops the registry on reset without unsubscribing", () => {
    const holder = createChannelsHolder()
    const subscription = makeSubscription()

    const deregister = holder.subscribe({
      key: "inbox",
      listener: jest.fn(),
      createSubscription: () => subscription,
    })

    holder.reset()

    expect(holder.hasSubscription("inbox")).toBe(false)
    expect(subscription.unsubscribe).not.toHaveBeenCalled()

    // Deregistering after a reset is harmless
    expect(() => deregister()).not.toThrow()
  })
})

describe("ConversationsWebsocketContext", () => {
  it("returns an inert value when used outside a provider", () => {
    const { result } = renderHook(() => useCable())

    expect(result.current.cable).toBeNull()
    expect(result.current.accessToken).toBeNull()

    const createSubscription = jest.fn(() => ({ unsubscribe: jest.fn() }))

    result.current.channelsHolder.subscribe({
      key: "inbox",
      listener: jest.fn(),
      createSubscription,
    })

    expect(createSubscription).not.toHaveBeenCalled()
    expect(result.current.channelsHolder.hasSubscription("inbox")).toBe(false)
  })
})

describe("ConversationsWebsocketProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseSystemContext.mockReturnValue({
      user: { accessToken: "test-token" },
    })
  })

  it("creates exactly one consumer shared by every reader of the context", async () => {
    const MultiConsumerWrapper = () => {
      const cableA = useCable()
      const cableB = useCable()

      return (
        <div>
          <span data-testid="cable-ready">{String(cableA.cable !== null)}</span>
          <span data-testid="same-cable">
            {String(cableA.cable === cableB.cable)}
          </span>
        </div>
      )
    }

    render(
      <ConversationsWebsocketProvider>
        <MultiConsumerWrapper />
      </ConversationsWebsocketProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId("cable-ready")).toHaveTextContent("true")
    })

    expect(screen.getByTestId("same-cable")).toHaveTextContent("true")
    expect(mockCreateConsumer).toHaveBeenCalledTimes(1)
  })

  it("exposes the user's access token so subscriptions can authenticate", async () => {
    const { result } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    await waitFor(() => {
      expect(result.current.cable).not.toBeNull()
    })

    expect(result.current.accessToken).toBe("test-token")
  })

  it("does not put the access token in the socket url", async () => {
    const { result } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    await waitFor(() => {
      expect(result.current.cable).not.toBeNull()
    })

    const [url] = mockCreateConsumer.mock.calls[0] as unknown as [
      string | undefined,
    ]

    expect(String(url)).not.toContain("test-token")
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

  it("disconnects the consumer and clears the registry on unmount", async () => {
    const { result, unmount } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    await waitFor(() => {
      expect(result.current.cable).not.toBeNull()
    })

    const { channelsHolder } = result.current

    channelsHolder.subscribe({
      key: "inbox",
      listener: jest.fn(),
      createSubscription: () => ({ unsubscribe: jest.fn() }),
    })

    expect(channelsHolder.hasSubscription("inbox")).toBe(true)

    unmount()

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
    expect(channelsHolder.hasSubscription("inbox")).toBe(false)
  })

  it("disconnects the previous consumer when the access token changes", async () => {
    const { result, rerender } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    await waitFor(() => {
      expect(result.current.cable).not.toBeNull()
    })

    const firstCable = result.current.cable

    mockUseSystemContext.mockReturnValue({
      user: { accessToken: "another-token" },
    })

    rerender()

    await waitFor(() => {
      expect(result.current.cable).not.toBe(firstCable)
    })

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
    expect(mockCreateConsumer).toHaveBeenCalledTimes(2)
  })
})
