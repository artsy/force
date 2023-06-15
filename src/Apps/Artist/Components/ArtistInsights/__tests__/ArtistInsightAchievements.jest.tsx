import { fireEvent, screen } from "@testing-library/react"
import { ArtistInsightAchievementsFragmentContainer } from "Apps/Artist/Components/ArtistInsights/ArtistInsightAchievements"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistInsightAchievementsFragmentContainer,
  query: graphql`
    query ArtistInsightAchievements_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistInsightAchievements_artist
      }
    }
  `,
})

describe("ArtistInsightAchievements", () => {
  it("renders artist insight achievements", () => {
    renderWithRelay({
      Artist: () => ({
        insightAchievements: [
          {
            label: "Solo show at a major institution",
            entities: ["Foo Museum", "FooBar of American Art", "FooFrieze"],
            kind: "SOLO_SHOW",
          },
        ],
      }),
    })

    const expandableText = screen.getByTestId("expandable-dropdownlist")
      .innerHTML

    expect(
      screen.getByText("Solo show at a major institution")
    ).toBeInTheDocument()
    expect(expandableText).toContain("Foo Museum, and")
    expect(expandableText).toContain("2 more")
  })

  it("renders multiple achievements if present on the artist", () => {
    renderWithRelay({
      Artist: () => ({
        insightAchievements: [
          {
            label: "Reviewed by a major art publication",
            entities: [
              "FooBarforum",
              "Foofrieze",
              "The New FooBar",
              "FooBar Art",
            ],
            kind: "REVIEWED",
          },
        ],
      }),
    })

    const button = screen.getByText("3 more", { selector: "button" })
    fireEvent.click(button)

    expect(
      screen.getByText("FooBarforum, Foofrieze, The New FooBar, and FooBar Art")
    ).toBeInTheDocument()
  })

  it("does not render achievements if there are no insights on artist", () => {
    renderWithRelay({
      Artist: () => ({
        insightAchievements: [],
      }),
    })

    expect(
      screen.queryByText("Solo show at a major institution")
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("Group show at a major institution")
    ).not.toBeInTheDocument()
  })

  it("tracks read more expansion", () => {
    const spy = jest.fn()
    ;(useTracking as any).mockImplementation(() => ({ trackEvent: spy }))

    renderWithRelay({
      Artist: () => ({
        insightAchievements: [
          {
            label: "Reviewed by a major art publication",
            entities: [
              "FooBarforum",
              "Foofrieze",
              "The New FooBar",
              "FooBar Art",
            ],
            kind: "REVIEWED",
          },
        ],
      }),
    })

    const button = screen.getByText("3 more", { selector: "button" })
    fireEvent.click(button)
    expect(
      screen.getByText("FooBarforum, Foofrieze, The New FooBar, and FooBar Art")
    ).toBeInTheDocument()
    expect(spy).toHaveBeenCalledWith({
      action_type: "Click",
      subject: "Read more",
      type: "Link",
    })
  })
})
