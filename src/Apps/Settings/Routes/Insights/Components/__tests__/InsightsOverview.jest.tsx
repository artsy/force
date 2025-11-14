import { InsightsOverviewFragmentContainer } from "Apps/Settings/Routes/Insights/Components/InsightsOverview"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { InsightsOverviewTestQuery } from "__generated__/InsightsOverviewTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("InsightsOverview", () => {
  const { renderWithRelay } = setupTestWrapperTL<InsightsOverviewTestQuery>({
    Component: ({ me }) => {
      if (me?.myCollectionInfo) {
        return (
          <InsightsOverviewFragmentContainer
            info={me?.myCollectionInfo as any}
          />
        )
      }
      return null
    },
    query: graphql`
      query InsightsOverviewTestQuery @relay_test_operation {
        me {
          myCollectionInfo {
            ...InsightsOverview_info
          }
        }
      }
    `,
  })

  it("renders My Collection info properly", () => {
    renderWithRelay({
      MyCollectionInfo: () => ({ artistsCount: 7, artworksCount: 21 }),
    })

    expect(screen.getByText("Total Artists")).toBeInTheDocument()
    expect(screen.getByText("7")).toBeInTheDocument()
    expect(screen.getByText("Total Artworks")).toBeInTheDocument()
    expect(screen.getByText("21")).toBeInTheDocument()
  })
})
