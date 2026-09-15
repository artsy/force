import { render, screen } from "@testing-library/react"
import { AISearchMessage } from "Components/AISearch/Components/AISearchMessage"
import type { AISearchAssistantMessage } from "Components/AISearch/Hooks/useAISearchConversation"
import type { AISearchDebugEntry } from "Components/AISearch/Utils/aiSearchTypes"
import { MockBoot } from "DevTools/MockBoot"

const DEBUG_ENTRIES: AISearchDebugEntry[] = [
  {
    id: "artworksConnection-0",
    toolName: "artworksConnection",
    activity: "SEARCHING_ARTWORKS",
    query: "artworksConnection(keyword: “Warhol”, first: 10)",
    resultSummary: null,
    status: "OK",
  },
]

const assistantMessage = (
  overrides: Partial<AISearchAssistantMessage> = {},
): AISearchAssistantMessage => {
  return {
    id: "assistant-1",
    role: "ASSISTANT",
    text: "",
    activity: "SEARCHING_ARTWORKS",
    isPreparingArtworkResults: false,
    phase: "THINKING",
    artworkIDs: [],
    artistIDs: [],
    artworkFilters: null,
    debugEntries: DEBUG_ENTRIES,
    ...overrides,
  }
}

const renderMessage = (message: AISearchAssistantMessage) => {
  render(
    <MockBoot>
      <AISearchMessage message={message} />
    </MockBoot>,
  )
}

describe("AISearchMessage", () => {
  describe("debug detail", () => {
    it("stays hidden while the agent is still working", () => {
      renderMessage(assistantMessage({ phase: "THINKING" }))

      expect(screen.queryByText(/Debug:/)).not.toBeInTheDocument()
    })

    it("stays hidden while the answer is streaming in", () => {
      renderMessage(assistantMessage({ phase: "STREAMING", text: "Warhol…" }))

      expect(screen.queryByText(/Debug:/)).not.toBeInTheDocument()
    })

    it("appears once a text-only turn has settled", () => {
      renderMessage(
        assistantMessage({ phase: "RESULT", text: "Warhol was a painter." }),
      )

      expect(screen.getByText("Debug: 1 query")).toBeInTheDocument()
    })

    it("appears on a failed turn, where the queries explain the failure", () => {
      renderMessage(
        assistantMessage({ phase: "ERROR", errorMessage: "Something broke." }),
      )

      expect(screen.getByText("Debug: 1 query")).toBeInTheDocument()
    })
  })
})
