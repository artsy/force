import { fireEvent, screen } from "@testing-library/react"
import { ArtistCareerHighlightsFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistCareerHighlights"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("Apps/Artist/Components/ArtistHeader/ArtistHeader", () => ({
  ARTIST_HEADER_NUMBER_OF_INSIGHTS: 0,
}))

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "4d8b92b34eb68a1b2c0003f4",
    contextPageOwnerSlug: "andy-warhol",
    contextPageOwnerType: "artist",
  })),
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
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
  })

  beforeEach(() => {
    trackEvent.mockClear()
  })

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
      screen.getByText("Solo show at a major institution"),
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
      screen.getByText("National Gallery of Art, Washington, D.C."),
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
      screen.getByText("Solo show at 2 major institutions"),
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
        "Tate Modern, Museum of Modern Art, New York, and National Gallery of Art, Washington, D.C.",
      ),
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
      screen.queryByText("Highlights and Achievements"),
    ).not.toBeInTheDocument()
    expect(screen.queryByText("View CV")).not.toBeInTheDocument()
  })

  describe("Tracking", () => {
    it("tracks toggledAccordion event when expanding accordion with artistAchievements context", () => {
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

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent).toHaveBeenCalledWith({
        action: "toggledAccordion",
        context_module: "artistAchievements",
        context_owner_type: "artist",
        subject: "SOLO_SHOW",
        expand: true,
      })
    })

    it("tracks toggledAccordion event when collapsing accordion", () => {
      renderWithRelay({
        Artist: () => ({
          insights: [
            {
              label: "Critically acclaimed",
              entities: [],
              kind: "CRITICALLY_ACCLAIMED",
              description: "<p>Test description</p>",
            },
          ],
          name: "Test Artist",
          slug: "test-artist",
        }),
      })

      const button = screen.getByRole("button")

      // Expand
      fireEvent.click(button)
      expect(trackEvent).toHaveBeenCalledWith({
        action: "toggledAccordion",
        context_module: "artistAchievements",
        context_owner_type: "artist",
        subject: "CRITICALLY_ACCLAIMED",
        expand: true,
      })

      // Collapse
      fireEvent.click(button)
      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenCalledWith({
        action: "toggledAccordion",
        context_module: "artistAchievements",
        context_owner_type: "artist",
        subject: "CRITICALLY_ACCLAIMED",
        expand: false,
      })
    })

    it("tracks correct subject for different insight types", () => {
      renderWithRelay({
        Artist: () => ({
          insights: [
            {
              label: "High auction record",
              entities: [],
              kind: "HIGH_AUCTION_RECORD",
              description: "<p>US$195.0m</p>",
            },
            {
              label: "Collected by a major institution",
              entities: ["MoMA", "Tate"],
              kind: "COLLECTED",
              description: null,
            },
          ],
          name: "Test Artist",
          slug: "test-artist",
        }),
      })

      const buttons = screen.getAllByRole("button")

      // Click first accordion
      fireEvent.click(buttons[0])
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: "HIGH_AUCTION_RECORD",
        }),
      )

      // Click second accordion
      fireEvent.click(buttons[1])
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: "COLLECTED",
        }),
      )
    })

    it("tracks clickedCV event when clicking View CV link", () => {
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
          href: "/artist/test-artist",
          slug: "test-artist",
        }),
      })

      const viewCVLink = screen.getByText("View CV")
      fireEvent.click(viewCVLink)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedCV",
        context_module: "artistAchievements",
        context_page_owner_type: "artist",
        context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
        context_page_owner_slug: "andy-warhol",
      })
    })
  })
})
