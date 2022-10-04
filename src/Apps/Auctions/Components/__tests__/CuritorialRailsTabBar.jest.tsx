import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { CuritorialRailsTabBarFragmentContainer } from "Apps/Auctions/Components/CuritorialRailsTabBar"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <CuritorialRailsTabBarFragmentContainer viewer={props.viewer} />
  },
  query: graphql`
    query CuritorialRailsTabBar_Test_Query @relay_test_operation {
      viewer {
        ...CuritorialRailsTabBar_viewer
      }
    }
  `,
})

describe("CuritorialRailsTabBar", () => {
  it("shows default tabs", () => {
    renderWithRelay()

    expect(screen.queryByText("Current Highlights")).toBeInTheDocument()
    expect(screen.queryByText("Trending Lots")).toBeInTheDocument()
  })

  it('hides "Works For You" tab if no sale artworks', () => {
    renderWithRelay({
      SaleArtworksConnection: () => ({
        counts: {
          total: 0,
        },
      }),
    })

    expect(screen.queryByText("Works For You")).not.toBeInTheDocument()
  })

  it('shows "Works For You" tab if sale artworks', () => {
    renderWithRelay({
      SaleArtworksConnection: () => ({
        counts: {
          total: 1,
        },
        edges: [{ node: { sale: { isClosed: false } } }],
      }),
    })

    expect(screen.queryByText("Works For You")).toBeInTheDocument()
  })
})
