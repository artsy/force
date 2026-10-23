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
  it("rejects a full chat instead of silently losing its earlier context", () => {
    const messages = Array.from({ length: 25 }, (_, index) =>
      exchange(String(index)),
    ).flat()
    expect(() => toArtAssistantHistory({ messages, prompt: "Next" })).toThrow(
      "history is too long",
    )
    expect(
      toArtAssistantHistory({
        messages: messages.slice(0, 40),
        prompt: "Next",
      }),
    ).toHaveLength(40)
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
    expect(() => toArtAssistantHistory({ messages, prompt: "Next" })).toThrow(
      "input is too large",
    )
    expect(() =>
      toArtAssistantHistory({ messages: [], prompt: "世".repeat(34_000) }),
    ).toThrow("input is too large")
  })
})
