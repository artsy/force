import { act, fireEvent, render, screen } from "@testing-library/react"
import { useFlag, useFlagsStatus } from "@unleash/proxy-client-react"
import { ArtAssistantApp } from "Apps/ArtAssistant/ArtAssistantApp"
import { MockBoot } from "DevTools/MockBoot"
import { createMockEnvironment } from "relay-test-utils"

jest.unmock("react-relay")
jest.mock("uuid", () => ({
  v4: (() => {
    let id = 0
    return () => `chat-${id++}`
  })(),
}))
jest.mock("Components/NavBar/useNavBarHeight", () => ({
  useNavBarHeight: () => ({ mobile: 100, desktop: 150 }),
}))
jest.mock("Apps/ArtAssistant/Components/ArtAssistantArtistRail", () => ({
  ArtAssistantArtistRail: () => {
    return <div>Artist cards</div>
  },
}))
jest.mock("Apps/ArtAssistant/Components/ArtAssistantArtworkRail", () => ({
  ArtAssistantArtworkRail: () => {
    return <div>Artwork cards</div>
  },
}))

describe("Art Assistant page", () => {
  beforeEach(() => {
    localStorage.clear()
    ;(useFlag as jest.Mock).mockReturnValue(true)
    ;(useFlagsStatus as jest.Mock).mockReturnValue({ flagsReady: true })
  })
  it("sends a prompt, renders the final response and starts another chat", () => {
    const environment = createMockEnvironment()
    render(
      <MockBoot
        user={{ id: "user", accessToken: "token", type: "User" }}
        context={{ user: { id: "user", accessToken: "token", type: "User" } }}
        relayEnvironment={environment}
      >
        <ArtAssistantApp />
      </MockBoot>,
    )
    expect(screen.getByText("What are you looking for?")).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "Debug" }),
    ).not.toBeInTheDocument()
    fireEvent.change(
      screen.getByRole("textbox", { name: "Art Assistant prompt" }),
      { target: { value: "Find art" } },
    )
    fireEvent.click(screen.getByRole("button", { name: "Send" }))
    expect(screen.getByRole("status")).toHaveTextContent("Thinking…")
    const operation = environment.mock.getMostRecentOperation()
    act(() =>
      environment.mock.nextValue(operation, {
        data: {
          aiAgentTurn: {
            __typename: "AIAgentTurnComplete",
            message: "Here are some works",
            stopReason: "end_turn",
            toolCallCount: 1,
            sections: [
              {
                __typename: "AIAgentArtworksSection",
                artworks: [{ internalID: "work" }],
              },
            ],
            artworks: [{ internalID: "work" }],
            suggestedReplies: [{ text: "More like this" }],
          },
        },
      }),
    )
    expect(screen.getByText("Here are some works")).toBeInTheDocument()
    expect(screen.getByText("Artwork cards")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "More like this" }))
    expect(
      environment.mock.getMostRecentOperation().request.variables.input.history,
    ).toHaveLength(2)
    fireEvent.click(screen.getAllByRole("button", { name: "New chat" })[0])
    expect(screen.getByText("What are you looking for?")).toBeInTheDocument()
    expect(
      screen.getByRole("navigation", { name: "Chat history" }),
    ).toHaveTextContent("Find art")
  })
  it("opens chat history on mobile", () => {
    render(
      <MockBoot
        breakpoint="xs"
        user={{ id: "user", accessToken: "token", type: "User" }}
        context={{ user: { id: "user", accessToken: "token", type: "User" } }}
        relayEnvironment={createMockEnvironment()}
      >
        <ArtAssistantApp />
      </MockBoot>,
    )
    fireEvent.click(screen.getByRole("button", { name: "History" }))
    expect(
      screen.getByRole("navigation", { name: "Chat history" }),
    ).toBeInTheDocument()
  })
  it("lets an admin opt in to live debug details", () => {
    const environment = createMockEnvironment()
    const user = { id: "admin", accessToken: "token", type: "Admin" }
    render(
      <MockBoot user={user} context={{ user }} relayEnvironment={environment}>
        <ArtAssistantApp />
      </MockBoot>,
    )
    const toggle = screen.getByRole("button", { name: "Debug" })
    expect(toggle).toHaveAttribute("aria-pressed", "false")
    fireEvent.click(toggle)
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Find art" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Send" }))
    const operation = environment.mock.getMostRecentOperation()
    expect(operation.request.variables.input.includeDebugToolCalls).toBe(true)
    act(() =>
      environment.mock.nextValue(operation, {
        data: {
          aiAgentTurn: {
            __typename: "AIAgentToolCall",
            activity: "SEARCHING_ARTWORKS",
            toolName: "search",
            summary: "Searching",
            debugSummary: "debug arguments",
          },
        },
      }),
    )
    fireEvent.click(screen.getByText("Agent debug"))
    expect(screen.getByText("debug arguments")).toBeVisible()
    expect(localStorage.getItem("artsy.artAssistant.v1.admin")).not.toContain(
      "debug arguments",
    )
  })
})
