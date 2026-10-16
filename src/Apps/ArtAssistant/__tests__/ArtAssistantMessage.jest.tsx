import { fireEvent, render, screen } from "@testing-library/react"
import { ArtAssistantMessage } from "Apps/ArtAssistant/Components/ArtAssistantMessage"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("Apps/ArtAssistant/Components/ArtAssistantArtistRail", () => ({
  ArtAssistantArtistRail: ({ ids }) => {
    return <div>Artists: {ids.join(",")}</div>
  },
}))
jest.mock("Apps/ArtAssistant/Components/ArtAssistantArtworkRail", () => ({
  ArtAssistantArtworkRail: ({ ids }) => {
    return <div>Artworks: {ids.join(",")}</div>
  },
}))

describe("Art Assistant messages", () => {
  it("shows status without unfinished prose", () => {
    render(
      <MockBoot>
        <ArtAssistantMessage
          message={{
            id: "a",
            role: "assistant",
            phase: "responding",
            text: "Draft",
            activity: "Searching artists…",
          }}
        />
      </MockBoot>,
    )
    expect(screen.getByRole("status")).toHaveTextContent("Searching artists…")
    expect(screen.queryByText("Draft")).not.toBeInTheDocument()
  })
  it("renders sections and sends suggested replies", () => {
    const onSuggestedReply = jest.fn()
    render(
      <MockBoot>
        <ArtAssistantMessage
          onSuggestedReply={onSuggestedReply}
          message={{
            id: "answer",
            role: "assistant",
            phase: "complete",
            text: "Here are some artists",
            sections: [{ type: "artists", ids: ["two", "one"] }],
            suggestedReplies: ["Show more"],
          }}
        />
      </MockBoot>,
    )
    expect(screen.getByText("Artists: two,one")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Show more" }))
    expect(onSuggestedReply).toHaveBeenCalledWith("Show more", 0, "answer")
  })
})
