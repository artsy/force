import { act, fireEvent, render, screen, within } from "@testing-library/react"
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
      screen.queryByRole("heading", { name: "Art Assistant" }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "New chat" })).toBeInTheDocument()
    expect(
      screen.queryByText("Chats are saved in this browser."),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("switch", { name: "Debug" }),
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
    fireEvent.click(screen.getByRole("button", { name: "New chat" }))
    expect(screen.getByText("What are you looking for?")).toBeInTheDocument()
    expect(
      screen.getByRole("navigation", { name: "Recents" }),
    ).toHaveTextContent("Find art")
    expect(
      screen.queryByRole("button", { name: /^Delete/ }),
    ).not.toBeInTheDocument()
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
    fireEvent.click(screen.getByRole("button", { name: "Recents" }))
    expect(
      screen.getByRole("navigation", { name: "Recents" }),
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
    const toggle = screen.getByRole("switch", { name: "Debug" })
    expect(
      within(screen.getByRole("navigation", { name: "Recents" })).queryByRole(
        "switch",
        { name: "Debug" },
      ),
    ).not.toBeInTheDocument()
    expect(toggle).not.toBeChecked()
    expect(screen.getByText("Debug off")).toBeInTheDocument()
    fireEvent.click(toggle)
    expect(toggle).toBeChecked()
    expect(screen.getByText("Debug on")).toBeInTheDocument()
    expect(screen.getByRole("note")).toHaveTextContent("Send a new message")
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
    expect(screen.getByText("debug arguments")).toBeVisible()
    expect(localStorage.getItem("artsy.artAssistant.v1.admin")).not.toContain(
      "debug arguments",
    )
    fireEvent.click(toggle)
    expect(toggle).not.toBeChecked()
    expect(screen.getByText("Debug off")).toBeInTheDocument()
    expect(screen.queryByText("debug arguments")).not.toBeInTheDocument()
  })
  it("can reveal tool activity from an admin's turn started with debug off", () => {
    const environment = createMockEnvironment()
    const user = { id: "admin", accessToken: "token", type: "Admin" }
    render(
      <MockBoot user={user} context={{ user }} relayEnvironment={environment}>
        <ArtAssistantApp />
      </MockBoot>,
    )
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Find art" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Send" }))
    const operation = environment.mock.getMostRecentOperation()
    expect(operation.request.variables.includeDebug).toBe(false)
    expect(
      operation.request.variables.input.includeDebugToolCalls,
    ).toBeUndefined()
    act(() =>
      environment.mock.nextValue(operation, {
        data: {
          aiAgentTurn: {
            __typename: "AIAgentToolCall",
            activity: "SEARCHING_ARTWORKS",
            toolName: "search",
            summary: "Searching saved artists",
          },
        },
      }),
    )
    expect(
      screen.queryByText("Searching saved artists"),
    ).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole("switch", { name: "Debug" }))
    expect(screen.getByText("Searching saved artists")).toBeVisible()
    expect(
      screen.getByText(
        "Detailed tool data is collected only for messages sent with Debug on.",
      ),
    ).toBeVisible()
    expect(localStorage.getItem("artsy.artAssistant.v1.admin")).not.toContain(
      "Searching saved artists",
    )
  })
})
