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
  it("shows default tabs", async () => {
    renderWithRelay()

    expect(screen.queryAllByText("Curators’ Picks")[0]).toBeInTheDocument()
    expect(screen.queryByText("Trending Lots")).toBeInTheDocument()
    expect(screen.queryByText("Lots for You")).not.toBeInTheDocument()
  })
})
