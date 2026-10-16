import { toArtAssistantHistory } from "Apps/ArtAssistant/utils/artAssistantHistory"
import type { ArtAssistantMessage } from "Apps/ArtAssistant/types"
import { TextEncoder } from "util"

global.TextEncoder = TextEncoder

const exchange = (text: string): ArtAssistantMessage[] => [
  { id: `${text}-user`, role: "user", text },
  {
    id: `${text}-assistant`,
    role: "assistant",
    text: "Answer",
    phase: "complete",
  },
]

describe("Art Assistant history limits", () => {
  it("keeps the last 20 complete exchanges", () => {
    const messages = Array.from({ length: 25 }, (_, index) =>
      exchange(String(index)),
    ).flat()
    const history = toArtAssistantHistory({ messages, prompt: "Next" })
    expect(history).toHaveLength(40)
    expect(history[0].content).toBe("5")
  })
  it("drops failed exchanges", () => {
    const messages: ArtAssistantMessage[] = [
      ...exchange("Okay"),
      { id: "u", role: "user", text: "Failed prompt" },
      { id: "a", role: "assistant", text: "Error", phase: "error" },
    ]
    expect(toArtAssistantHistory({ messages, prompt: "Next" })).toHaveLength(2)
  })
  it("counts UTF-8 bytes including card IDs and section types", () => {
    const messages = exchange("Old")
    messages.push(
      { id: "u", role: "user", text: "New" },
      {
        id: "a",
        role: "assistant",
        text: "Answer",
        phase: "complete",
        sections: [{ type: "artists", ids: ["世".repeat(34_000)] }],
      },
    )
    expect(toArtAssistantHistory({ messages, prompt: "Next" })).toEqual([])
    expect(() =>
      toArtAssistantHistory({ messages: [], prompt: "世".repeat(34_000) }),
    ).toThrow("too long")
  })
})
