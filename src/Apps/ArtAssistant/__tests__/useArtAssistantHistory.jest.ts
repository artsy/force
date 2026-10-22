import { act, renderHook } from "@testing-library/react"
import { useArtAssistantHistory } from "Apps/ArtAssistant/hooks/useArtAssistantHistory"
import {
  readArtAssistantConversations,
  writeArtAssistantConversations,
  type StoredArtAssistantConversation,
} from "Apps/ArtAssistant/utils/artAssistantStorage"

describe("Art Assistant history controls", () => {
  const chat: StoredArtAssistantConversation = {
    id: "chat",
    title: "Find art",
    updatedAt: "2026-10-16T12:00:00.000Z",
    messages: [{ id: "u", role: "user", text: "Find art" }],
  }
  beforeEach(() => {
    localStorage.clear()
    jest.useFakeTimers()
    jest.setSystemTime(new Date("2026-10-22T12:00:00.000Z"))
  })
  afterEach(() => jest.useRealTimers())
  it("restores, selects and deletes a saved chat", () => {
    writeArtAssistantConversations({ userID: "one", conversations: [chat] })
    const loadConversation = jest.fn()
    const startNewConversation = jest.fn()
    const { result } = renderHook(() =>
      useArtAssistantHistory({
        userID: "one",
        conversationID: "chat",
        messages: [],
        loadConversation,
        startNewConversation,
      }),
    )
    expect(loadConversation).toHaveBeenCalledWith(chat)
    act(() => result.current.selectConversation("chat"))
    expect(loadConversation).toHaveBeenCalledTimes(2)
    act(() => result.current.removeConversation("chat"))
    expect(result.current.conversations).toEqual([])
    expect(startNewConversation).toHaveBeenCalled()
    expect(readArtAssistantConversations("one")).toEqual([])
  })
  it("does not persist the previous user's messages under a new user", () => {
    const props = {
      userID: "one",
      conversationID: "chat",
      messages: chat.messages,
      loadConversation: jest.fn(),
      startNewConversation: jest.fn(),
    }
    const { rerender } = renderHook(
      options => useArtAssistantHistory(options),
      { initialProps: props },
    )
    rerender({ ...props, userID: "two" })
    expect(readArtAssistantConversations("two")).toEqual([])
  })

  it.each(["2026-10-16T11:00:00.000Z", "2026-10-16T12:00:00.000Z"])(
    "preserves order and timestamps when opening a chat (%s)",
    updatedAt => {
      const newer = { ...chat, id: "newer" }
      const older = { ...chat, updatedAt }
      writeArtAssistantConversations({
        userID: "one",
        conversations: [newer, older],
      })
      const props: Parameters<typeof useArtAssistantHistory>[0] = {
        userID: "one",
        conversationID: "newer",
        messages: [],
        loadConversation: jest.fn(),
        startNewConversation: jest.fn(),
      }
      const { result, rerender } = renderHook(
        options => useArtAssistantHistory(options),
        { initialProps: props },
      )
      act(() => result.current.selectConversation(older.id))
      rerender({
        ...props,
        conversationID: older.id,
        messages: [...older.messages],
      })
      expect(result.current.conversations.map(item => item.id)).toEqual([
        "newer",
        "chat",
      ])
      expect(readArtAssistantConversations("one").map(item => item.id)).toEqual(
        ["newer", "chat"],
      )
      expect(
        result.current.conversations.find(item => item.id === older.id)
          ?.updatedAt,
      ).toBe(updatedAt)
    },
  )

  it("moves a chat only when the user sends a message, not when the assistant responds", () => {
    const newer = {
      ...chat,
      id: "newer",
      updatedAt: "2026-10-17T12:00:00.000Z",
    }
    writeArtAssistantConversations({
      userID: "one",
      conversations: [newer, chat],
    })
    const props: Parameters<typeof useArtAssistantHistory>[0] = {
      userID: "one",
      conversationID: chat.id,
      messages: [],
      loadConversation: jest.fn(),
      startNewConversation: jest.fn(),
    }
    const { result, rerender } = renderHook(
      options => useArtAssistantHistory(options),
      { initialProps: props },
    )
    const messages: typeof props.messages = [
      ...chat.messages,
      { id: "answer", role: "assistant", text: "", phase: "responding" },
    ]
    rerender({ ...props, messages })
    expect(result.current.conversations.map(item => item.id)).toEqual([
      "newer",
      "chat",
    ])

    const nextPrompt: typeof props.messages = [
      ...messages,
      { id: "next-user-message", role: "user", text: "Show more" },
    ]
    rerender({ ...props, messages: nextPrompt })
    expect(result.current.conversations.map(item => item.id)).toEqual([
      "chat",
      "newer",
    ])
    expect(result.current.conversations[0].updatedAt).toBe(
      "2026-10-22T12:00:00.000Z",
    )

    jest.setSystemTime(new Date("2026-10-22T13:00:00.000Z"))
    rerender({
      ...props,
      messages: [
        ...nextPrompt,
        {
          id: "next-answer",
          role: "assistant",
          text: "New results",
          phase: "complete",
        },
      ],
    })
    expect(result.current.conversations[0].updatedAt).toBe(
      "2026-10-22T12:00:00.000Z",
    )
    expect(readArtAssistantConversations("one")[0].updatedAt).toBe(
      "2026-10-22T12:00:00.000Z",
    )
  })
})
