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
  beforeEach(() => localStorage.clear())
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
})
