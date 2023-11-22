import { screen } from "@testing-library/react"
import { InsightsCareerHighlightRailFragmentContainer } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/InsightsCareerHighlightRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { InsightsCareerHighlightRailTestQuery } from "__generated__/InsightsCareerHighlightRailTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("InsightsCareerHighlightRail", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    InsightsCareerHighlightRailTestQuery
  >({
    Component: (props: any) => (
      <InsightsCareerHighlightRailFragmentContainer {...props} />
    ),
    query: graphql`
      query InsightsCareerHighlightRailTestQuery @relay_test_operation {
        me {
          ...InsightsCareerHighlightRail_me
        }
      }
    `,
  })

  describe("when a user collection has career highlights", () => {
    it("renders career highlights", () => {
      renderWithRelay(mockResolverData)

      // singular
      expect(
        screen.getByText("Artist was included in a major biennial.")
      ).toBeInTheDocument()
      expect(
        screen.getByText("Artist was in a group show at a major institution.")
      ).toBeInTheDocument()

      // plural
      expect(
        screen.getByText("Artists are collected by major institutions.")
      ).toBeInTheDocument()
      expect(
        screen.getByText("Artists were reviewed by major art publications.")
      ).toBeInTheDocument()

      // promo card
      expect(
        screen.getByText("Discover career highlights for artists you collect.")
      ).toBeInTheDocument()

      expect(
        screen.queryByText("Artist had a solo show at a major institution.")
      ).not.toBeInTheDocument()
    })
  })

  describe("when a user collection has no career highlights", () => {
    it("doesn't render career highlights or promo card", () => {
      renderWithRelay(mockResolverNoData)

      expect(
        screen.queryByText("Artist had a solo show at a major institution.")
      ).not.toBeInTheDocument()

      expect(
        screen.queryByText(
          "Discover career highlights for artists you collect."
        )
      ).not.toBeInTheDocument()
    })
  })
})

const mockResolverData = {
  Me: () => ({
    myCollectionInfo: {
      artistInsightsCount: {
        BIENNIAL: 1,
        COLLECTED: 2,
        GROUP_SHOW: 1,
        SOLO_SHOW: 0,
        REVIEWED: 4,
      },
    },
  }),
}

const mockResolverNoData = {
  Me: () => ({
    myCollectionInfo: {
      artistInsightsCount: {
        BIENNIAL: 0,
        COLLECTED: 0,
        GROUP_SHOW: 0,
        SOLO_SHOW: 0,
        REVIEWED: 0,
      },
    },
  }),
}
