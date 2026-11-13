import { fireEvent, screen } from "@testing-library/react"
import { ArtistAchievementsFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistAchievements"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "4d8b92b34eb68a1b2c0003f4",
    contextPageOwnerSlug: "heidi-lau",
    contextPageOwnerType: "artist",
  })),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    return (
      <MockBoot breakpoint="lg">
        <ArtistAchievementsFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtistAchievements_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistAchievements_artist
      }
    }
  `,
})

const NO_ACHIEVEMENTS = {
  href: "/artist/heidi-lau",
  soloShows: { edges: [] },
  fairBooths: { edges: [] },
  insights: [],
}

describe("ArtistAchievements", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  beforeEach(() => {
    trackEvent.mockClear()
  })

  it("renders nothing when the artist has no achievements", () => {
    renderWithRelay({ Artist: () => NO_ACHIEVEMENTS })

    expect(screen.queryByText("Achievements")).not.toBeInTheDocument()
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("renders only the accordions that have content", () => {
    renderWithRelay({
      Artist: () => ({
        ...NO_ACHIEVEMENTS,
        insights: [
          {
            kind: "RESIDENCIES",
            label: "Residencies",
            entities: ["Shandaken", "Storm King"],
          },
        ],
      }),
    })

    expect(screen.getByText("Achievements")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Recognition" })).toBeVisible()
    expect(screen.queryByText("Shows")).not.toBeInTheDocument()
    expect(
      screen.queryByText("Group exhibitions & institutions"),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("Recent fair presentations"),
    ).not.toBeInTheDocument()
  })

  it("renders all four accordions, closed until clicked", () => {
    renderWithRelay({
      Artist: () => ({
        ...NO_ACHIEVEMENTS,
        soloShows: {
          edges: [
            {
              node: {
                name: "Talisman",
                city: "New York",
                startAt: "2026",
                partner: { name: "YveYANG GALLERY" },
              },
            },
          ],
        },
        fairBooths: {
          edges: [
            {
              node: {
                name: "Sikkema Malloy Jenkins at Art Basel 2026",
                exhibitionPeriod: "Jun 18 – 21, 2026",
                fair: { name: "Art Basel 2026" },
                partner: { name: "Sikkema Malloy Jenkins" },
              },
            },
          ],
        },
        insights: [
          {
            kind: "GROUP_SHOW",
            label: "Group show at a major institution",
            entities: ["M+"],
          },
          {
            kind: "ARTSY_VANGUARD_YEAR",
            label: "Artsy Vanguard",
            entities: [],
          },
        ],
      }),
    })

    expect(screen.getAllByRole("button")).toHaveLength(4)
    expect(screen.queryByText("Talisman")).not.toBeVisible()

    fireEvent.click(screen.getByRole("button", { name: "Shows" }))
    expect(screen.getByText("Talisman")).toBeVisible()
    expect(
      screen.getByText("YveYANG GALLERY, New York · 2026"),
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole("button", { name: "Group exhibitions & institutions" }),
    )
    expect(screen.getByText("M+")).toBeVisible()
    expect(
      screen.getByText("Group show at a major institution"),
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole("button", { name: "Recent fair presentations" }),
    )
    expect(screen.getByText("Art Basel 2026")).toBeVisible()
    expect(
      screen.getByText("With Sikkema Malloy Jenkins · Jun 18 – 21, 2026"),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Recognition" }))
    expect(screen.getByText("Artsy Vanguard")).toBeVisible()
  })

  it("keeps every insight kind the header drops", () => {
    renderWithRelay({
      Artist: () => ({
        ...NO_ACHIEVEMENTS,
        insights: [
          { kind: "SOLO_SHOW", label: "Solo show", entities: ["Tate Modern"] },
          {
            kind: "HIGH_AUCTION_RECORD",
            label: "High auction record",
            entities: [],
          },
        ],
      }),
    })

    fireEvent.click(
      screen.getByRole("button", { name: "Group exhibitions & institutions" }),
    )
    fireEvent.click(screen.getByRole("button", { name: "Recognition" }))

    expect(screen.getByText("Tate Modern")).toBeVisible()
    expect(screen.getByText("High auction record")).toBeVisible()
  })

  it("links to the CV and tracks the click", () => {
    renderWithRelay({
      Artist: () => ({
        ...NO_ACHIEVEMENTS,
        insights: [
          {
            kind: "BIENNIAL",
            label: "Biennial",
            entities: ["Whitney Biennial"],
          },
        ],
      }),
    })

    const link = screen.getByRole("link", {
      name: "See all past shows and fair booths",
    })
    expect(link).toHaveAttribute("href", "/artist/heidi-lau/cv")

    fireEvent.click(link)

    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedCV",
        context_module: "artistAchievements",
      }),
    )
  })

  it("tracks accordion toggles", () => {
    renderWithRelay({
      Artist: () => ({
        ...NO_ACHIEVEMENTS,
        insights: [
          {
            kind: "BIENNIAL",
            label: "Biennial",
            entities: ["Whitney Biennial"],
          },
        ],
      }),
    })

    fireEvent.click(
      screen.getByRole("button", { name: "Group exhibitions & institutions" }),
    )

    expect(trackEvent).toHaveBeenCalledWith({
      action: "toggledAccordion",
      context_module: "artistAchievements",
      context_owner_type: "artist",
      subject: "group-exhibitions-and-institutions",
      expand: true,
    })
  })
})
