import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { InsightsOverviewTestQuery } from "__generated__/InsightsOverviewTestQuery.graphql"
import { InsightsOverviewFragmentContainer } from "Apps/Settings/Routes/Insights/Components/InsightsOverview"

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
