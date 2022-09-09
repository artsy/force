import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { useSystemContext } from "System/useSystemContext"
import { InsightsOverviewTestQuery } from "__generated__/InsightsOverviewTestQuery.graphql"
import { InsightsOverviewFragmentContainer } from "../InsightsOverview"

jest.unmock("react-relay")
jest.mock("System/useSystemContext")

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

  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "my-collection-web-phase-7-insights": { flagEnabled: true },
      },
    }))
  })

  it("renders My Collection info properly", () => {
    renderWithRelay(
      { MyCollectionInfo: () => ({ artistsCount: 7, artworksCount: 21 }) },
      false
    )

    expect(screen.getByText("Total Artists")).toBeInTheDocument()
    expect(screen.getByText("7")).toBeInTheDocument()
    expect(screen.getByText("Total Artworks")).toBeInTheDocument()
    expect(screen.getByText("21")).toBeInTheDocument()
  })
})
