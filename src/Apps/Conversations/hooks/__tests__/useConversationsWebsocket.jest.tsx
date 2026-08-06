import { renderHook } from "@testing-library/react-hooks"
import { useCable } from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"

jest.mock("Apps/Conversations/context/ConversationsWebsocketContext")

const mockUseCable = useCable as jest.Mock

const makeChannelsHolder = () => {
  const channels = new Map()
  return {
    setChannel: jest.fn((key, subscription) => {
      channels.set(key, subscription)
      return subscription
    }),
    getChannel: jest.fn(key => channels.get(key)),
    removeChannel: jest.fn(key => channels.delete(key)),
  }
}

describe("useConversationsWebsocket", () => {
  it("does not subscribe when disabled", () => {
    const create = jest.fn()
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder: makeChannelsHolder(),
    })

    renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: false,
        onEvent: jest.fn(),
      }),
    )

    expect(create).not.toHaveBeenCalled()
  })

  it("subscribes to the ConversationsChannel with the given key when enabled", () => {
    const create = jest.fn().mockReturnValue({ unsubscribe: jest.fn() })
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder: makeChannelsHolder(),
    })

    renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: true,
        onEvent: jest.fn(),
      }),
    )

    expect(create).toHaveBeenCalledWith(
      { channel: "ConversationsChannel", key: "inbox" },
      expect.objectContaining({ received: expect.any(Function) }),
    )
  })

  it("unsubscribes its own channel on unmount", () => {
    const unsubscribe = jest.fn()
    const create = jest.fn().mockReturnValue({ unsubscribe })
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder: makeChannelsHolder(),
    })

    const { unmount } = renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: true,
        onEvent: jest.fn(),
      }),
    )

    unmount()

    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })

  it("does not create a duplicate subscription for a key that already has one", () => {
    const create = jest.fn().mockReturnValue({ unsubscribe: jest.fn() })
    const channelsHolder = makeChannelsHolder()
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder,
    })

    const { rerender } = renderHook(
      ({ subscriptionKey }) =>
        useConversationsWebsocket({
          subscriptionKey,
          enabled: true,
          onEvent: jest.fn(),
        }),
      { initialProps: { subscriptionKey: "inbox" } },
    )

    rerender({ subscriptionKey: "inbox" })

    expect(create).toHaveBeenCalledTimes(1)
  })

  it("always invokes the latest onEvent callback, even after a re-render changed it", () => {
    let receivedCallback: (event: unknown) => void = () => {}
    const create = jest.fn((_channelInfo, callbacks) => {
      receivedCallback = callbacks.received
      return { unsubscribe: jest.fn() }
    })
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder: makeChannelsHolder(),
    })

    const firstOnEvent = jest.fn()
    const secondOnEvent = jest.fn()

    const { rerender } = renderHook(
      ({ onEvent }) =>
        useConversationsWebsocket({
          subscriptionKey: "inbox",
          enabled: true,
          onEvent,
        }),
      { initialProps: { onEvent: firstOnEvent } },
    )

    rerender({ onEvent: secondOnEvent })

    const event = {
      type: "message.sent" as const,
      conversation_id: "conv-1",
      message_id: "msg-1",
      created_at: "2026-08-06T00:00:00Z",
    }
    receivedCallback(event)

    expect(firstOnEvent).not.toHaveBeenCalled()
    expect(secondOnEvent).toHaveBeenCalledWith(event)
  })
})
