import { renderHook } from "@testing-library/react-hooks"
import {
  createChannelsHolder,
  useCable,
} from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"

jest.mock("Apps/Conversations/context/ConversationsWebsocketContext", () => {
  const actual = jest.requireActual(
    "Apps/Conversations/context/ConversationsWebsocketContext",
  )

  return { ...actual, useCable: jest.fn() }
})

const mockUseCable = useCable as jest.Mock

const ACCESS_TOKEN = "test-token"

const event = {
  type: "message.sent" as const,
  conversation_id: "conv-1",
  message_id: "msg-1",
  created_at: "2026-08-06T00:00:00Z",
}

describe("useConversationsWebsocket", () => {
  const setupCable = ({
    create,
    accessToken = ACCESS_TOKEN,
    cable = { subscriptions: { create } },
    channelsHolder = createChannelsHolder(),
  }: {
    create: jest.Mock
    accessToken?: string | null
    cable?: unknown
    channelsHolder?: ReturnType<typeof createChannelsHolder>
  }) => {
    mockUseCable.mockReturnValue({ cable, channelsHolder, accessToken })

    return { channelsHolder }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("does not subscribe when disabled", () => {
    const create = jest.fn()
    setupCable({ create })

    renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: false,
        onEvent: jest.fn(),
      }),
    )

    expect(create).not.toHaveBeenCalled()
  })

  it("does not subscribe when there is no access token", () => {
    const create = jest.fn()
    setupCable({ create, accessToken: null })

    renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: true,
        onEvent: jest.fn(),
      }),
    )

    expect(create).not.toHaveBeenCalled()
  })

  it("subscribes to the ConversationsChannel with the key and access token", () => {
    const create = jest.fn().mockReturnValue({ unsubscribe: jest.fn() })
    setupCable({ create })

    renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: true,
        onEvent: jest.fn(),
      }),
    )

    expect(create).toHaveBeenCalledWith(
      {
        channel: "ConversationsChannel",
        key: "inbox",
        access_token: ACCESS_TOKEN,
      },
      expect.objectContaining({ received: expect.any(Function) }),
    )
  })

  it("subscribes once the cable arrives, not before", () => {
    const create = jest.fn().mockReturnValue({ unsubscribe: jest.fn() })
    const channelsHolder = createChannelsHolder()

    mockUseCable.mockReturnValue({
      cable: null,
      channelsHolder,
      accessToken: ACCESS_TOKEN,
    })

    const { rerender } = renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: true,
        onEvent: jest.fn(),
      }),
    )

    expect(create).not.toHaveBeenCalled()

    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder,
      accessToken: ACCESS_TOKEN,
    })

    rerender()

    expect(create).toHaveBeenCalledTimes(1)
  })

  it("unsubscribes its own channel on unmount", () => {
    const unsubscribe = jest.fn()
    const create = jest.fn().mockReturnValue({ unsubscribe })
    setupCable({ create })

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

  it("shares one physical subscription across two instances of the same key, and delivers events to both", () => {
    let received: (payload: unknown) => void = () => {}
    const unsubscribe = jest.fn()
    const create = jest.fn((_channelInfo, callbacks) => {
      received = callbacks.received
      return { unsubscribe }
    })
    const { channelsHolder } = setupCable({ create })

    const desktopOnEvent = jest.fn()
    const mobileOnEvent = jest.fn()

    const renderInstance = (onEvent: jest.Mock) => {
      return renderHook(() =>
        useConversationsWebsocket({
          subscriptionKey: "inbox",
          enabled: true,
          onEvent,
        }),
      )
    }

    const desktop = renderInstance(desktopOnEvent)
    const mobile = renderInstance(mobileOnEvent)

    expect(create).toHaveBeenCalledTimes(1)

    received(event)

    expect(desktopOnEvent).toHaveBeenCalledWith(event)
    expect(mobileOnEvent).toHaveBeenCalledWith(event)

    // The physical subscription survives until the last listener goes away
    desktop.unmount()

    expect(unsubscribe).not.toHaveBeenCalled()
    expect(channelsHolder.hasSubscription("conversations:inbox")).toBe(true)

    received(event)

    expect(desktopOnEvent).toHaveBeenCalledTimes(1)
    expect(mobileOnEvent).toHaveBeenCalledTimes(2)

    mobile.unmount()

    expect(unsubscribe).toHaveBeenCalledTimes(1)
    expect(channelsHolder.hasSubscription("conversations:inbox")).toBe(false)
  })

  it("always invokes the latest onEvent callback, even after a re-render changed it", () => {
    let received: (payload: unknown) => void = () => {}
    const create = jest.fn((_channelInfo, callbacks) => {
      received = callbacks.received
      return { unsubscribe: jest.fn() }
    })
    setupCable({ create })

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

    received(event)

    expect(firstOnEvent).not.toHaveBeenCalled()
    expect(secondOnEvent).toHaveBeenCalledWith(event)
  })
})
