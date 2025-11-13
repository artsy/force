import { ArtistCareerHighlightsFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistCareerHighlights"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Artist/Components/ArtistHeader/ArtistHeader", () => ({
  ARTIST_HEADER_NUMBER_OF_INSIGHTS: 0,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    return (
      <MockBoot breakpoint="lg">
        <ArtistCareerHighlightsFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtistCareerHighlights_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistCareerHighlights_artist
      }
    }
  `,
})

describe("ArtistCareerHighlights", () => {
  it("renders one Career Highlight correctly", () => {
    renderWithRelay({
      Artist: () => ({
        insights: [
          {
            label: "Solo show at a major institution",
            entities: ["Foo Museum"],
            kind: "SOLO_SHOW",
            description: null,
          },
        ],
        name: "Test Artist",
        slug: "test-artist",
      }),
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(screen.getByText("Highlights and Achievements")).toBeInTheDocument()
    expect(
      screen.getByText("Solo show at a major institution")
    ).toBeInTheDocument()
    expect(screen.getByText("Foo Museum")).toBeInTheDocument()
    expect(screen.getByText("View CV")).toBeInTheDocument()
  })

  it("renders one Career Highlight with commas correctly", () => {
    renderWithRelay({
      Artist: () => ({
        insights: [
          {
            label: "Solo show at a major institution",
            entities: ["National Gallery of Art, Washington, D.C."],
            kind: "SOLO_SHOW",
            description: null,
          },
        ],
        name: "Test Artist",
        slug: "test-artist",
      }),
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(
      screen.getByText("National Gallery of Art, Washington, D.C.")
    ).toBeInTheDocument()
  })

  it("renders multiple Career Highlights correctly", () => {
    renderWithRelay({
      Artist: () => ({
        insights: [
          {
            label: "Solo show at 2 major institutions",
            entities: ["Foo Museum", "Bar Museum"],
            kind: "SOLO_SHOW",
            description: null,
          },
        ],
        name: "Test Artist",
        slug: "test-artist",
      }),
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(screen.getByText("Highlights and Achievements")).toBeInTheDocument()
    expect(
      screen.getByText("Solo show at 2 major institutions")
    ).toBeInTheDocument()
    expect(screen.getByText("Foo Museum and Bar Museum")).toBeInTheDocument()
    expect(screen.getByText("View CV")).toBeInTheDocument()
  })

  it("renders multiple Career Highlights with commas correctly", () => {
    renderWithRelay({
      Artist: () => ({
        insights: [
          {
            label: "Solo show at major institutions",
            entities: [
              "Tate Modern",
              "Museum of Modern Art, New York",
              "National Gallery of Art, Washington, D.C.",
            ],
            kind: "SOLO_SHOW",
            description: null,
          },
        ],
        name: "Test Artist",
        slug: "test-artist",
      }),
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(
      screen.getByText(
        "Tate Modern, Museum of Modern Art, New York, and National Gallery of Art, Washington, D.C."
      )
    ).toBeInTheDocument()
  })

  it("does not render if there are no Career Highlights", () => {
    renderWithRelay({
      Artist: () => ({
        insights: [],
        name: "Test Artist",
        slug: "test-artist",
      }),
    })

    expect(
      screen.queryByText("Highlights and Achievements")
    ).not.toBeInTheDocument()
    expect(screen.queryByText("View CV")).not.toBeInTheDocument()
  })
})
