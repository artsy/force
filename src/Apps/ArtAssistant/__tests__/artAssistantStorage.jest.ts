import {
  readArtAssistantConversations,
  writeArtAssistantConversations,
  type StoredArtAssistantConversation,
  clearArtAssistantConversations,
  conversationTitle,
  MAX_STORED_THUMBNAIL_LENGTH,
} from "Apps/ArtAssistant/utils/artAssistantStorage"

const conversation: StoredArtAssistantConversation = {
  id: "chat",
  title: "Art",
  updatedAt: "2026-10-16T12:00:00.000Z",
  messages: [
    { id: "u", role: "user", text: "Find art" },
    {
      id: "a",
      role: "assistant",
      text: "",
      phase: "responding",
      activity: "Searching…",
    },
  ],
}

describe("Art Assistant local history", () => {
  beforeEach(() => localStorage.clear())
  it("restores the error category and copy without storing debug details", () => {
    writeArtAssistantConversations({
      userID: "one",
      conversations: [
        {
          ...conversation,
          messages: [
            {
              id: "a",
              role: "assistant",
              text: "old copy",
              phase: "error",
              error: "timeout",
              debug: {
                events: [{ type: "call", toolName: "private", elapsedMs: 1 }],
              },
            },
          ],
        },
      ],
    })
    const restored = readArtAssistantConversations("one")[0].messages[0]
    expect(restored).toMatchObject({ error: "timeout", phase: "error" })
    expect(restored.text).toContain("Would you mind asking us once more?")
    expect(restored).not.toHaveProperty("debug")
  })
  it("allows logout when storage is unavailable", () => {
    const storage = jest
      .spyOn(Storage.prototype, "key")
      .mockImplementation(() => {
        throw new Error("Blocked")
      })
    localStorage.setItem("unrelated", "value")
    try {
      expect(() => clearArtAssistantConversations()).not.toThrow()
    } finally {
      storage.mockRestore()
    }
  })
  it("isolates users and restores interrupted turns as errors", () => {
    writeArtAssistantConversations({
      userID: "one",
      conversations: [conversation],
    })
    expect(readArtAssistantConversations("two")).toEqual([])
    expect(readArtAssistantConversations("one")[0].messages[1]).toMatchObject({
      phase: "error",
    })
    expect(localStorage.getItem("artsy.artAssistant.v1.one")).not.toContain(
      "Searching",
    )
  })
  it("rejects invalid nested messages and corrupt JSON", () => {
    localStorage.setItem(
      "artsy.artAssistant.v1.one",
      JSON.stringify([
        { ...conversation, messages: [{ id: "bad", role: "user", text: 1 }] },
      ]),
    )
    expect(readArtAssistantConversations("one")).toEqual([])
    localStorage.setItem("artsy.artAssistant.v1.one", "{")
    expect(readArtAssistantConversations("one")).toEqual([])
  })
  it("caps the list and tolerates unavailable storage", () => {
    writeArtAssistantConversations({
      userID: "one",
      conversations: Array.from({ length: 25 }, (_, index) => ({
        ...conversation,
        id: String(index),
      })),
    })
    expect(readArtAssistantConversations("one")).toHaveLength(20)
    const write = jest
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("Quota")
      })
    expect(() =>
      writeArtAssistantConversations({
        userID: "one",
        conversations: [conversation],
      }),
    ).not.toThrow()
    write.mockRestore()
  })

  it("keeps attached images and drops oversized thumbnails", () => {
    const thumbnailURL = "data:image/jpeg;base64,abc"
    writeArtAssistantConversations({
      userID: "one",
      conversations: [
        {
          ...conversation,
          messages: [
            {
              id: "u1",
              role: "user",
              text: "",
              image: { s3Key: "key-1", s3Bucket: "bucket", thumbnailURL },
            },
            {
              id: "u2",
              role: "user",
              text: "Again",
              image: {
                s3Key: "key-2",
                s3Bucket: "bucket",
                thumbnailURL: `data:image/jpeg;base64,${"a".repeat(MAX_STORED_THUMBNAIL_LENGTH)}`,
              },
            },
          ],
        },
      ],
    })
    expect(readArtAssistantConversations("one")[0].messages).toEqual([
      {
        id: "u1",
        role: "user",
        text: "",
        image: { s3Key: "key-1", s3Bucket: "bucket", thumbnailURL },
      },
      {
        id: "u2",
        role: "user",
        text: "Again",
        image: { s3Key: "key-2", s3Bucket: "bucket" },
      },
    ])
  })

  it("titles image-only chats", () => {
    expect(conversationTitle("  ")).toBe("Image search")
  })
})
