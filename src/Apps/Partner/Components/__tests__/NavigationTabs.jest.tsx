import { screen } from "@testing-library/react"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Partner/Components/NavigationTabs"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { NavigationTabsTestPartnerQuery } from "__generated__/NavigationTabsTestPartnerQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/RouteTabs")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

const { renderWithRelay } = setupTestWrapperTL<NavigationTabsTestPartnerQuery>({
  Component: ({ partner }: any) => {
    return <NavigationTabs partner={partner} />
  },
  query: graphql`
    query NavigationTabsTestPartnerQuery
    @raw_response_type
    @relay_test_operation {
      partner(id: "white-cube") {
        ...NavigationTabs_partner
      }
    }
  `,
})

describe("PartnerNavigationTabs", () => {
  it("renders all tabs by default", () => {
    renderWithRelay({
      Partner: () => ({
        id: "white-cube",
        slug: "white-cube",
        displayArtistsSection: true,
        representedArtists: { totalCount: 10 },
        notRepresentedArtists: { totalCount: 10 },
        displayWorksSection: true,
      }),
    })

    expect(screen.getByText("Overview")).toBeInTheDocument()
    expect(screen.getByText("Shows & Fairs")).toBeInTheDocument()
    expect(screen.getByText("Viewing Rooms")).toBeInTheDocument()
    expect(screen.getByText("Works")).toBeInTheDocument()
    expect(screen.getByText("Artists")).toBeInTheDocument()
    expect(screen.getByText("Articles")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })

  it("display Shop instead of Works for Brand partner", () => {
    renderWithRelay({
      Partner: () => ({
        id: "white-cube",
        partnerType: "Brand",
        displayWorksSection: true,
      }),
    })

    expect(screen.getByText("Shop")).toBeInTheDocument()
  })

  it("doesn't display contact tab if no locations", () => {
    renderWithRelay({
      Partner: () => ({ locations: { totalCount: null } }),
    })

    expect(screen.queryByText("Contact")).not.toBeInTheDocument()
  })

  it("doesn't display articles tab if no locations", () => {
    renderWithRelay({
      Partner: () => ({ articles: { totalCount: null } }),
    })

    expect(screen.queryByText("Articles")).not.toBeInTheDocument()
  })

  it("doesn't display artists tab if no artists", () => {
    renderWithRelay({
      Partner: () => ({
        displayArtistsSection: true,
        representedArtists: { totalCount: 0 },
        notRepresentedArtists: { totalCount: 0 },
      }),
    })

    expect(screen.queryByText("Artists")).not.toBeInTheDocument()
  })

  it("doesn't display artists tab if displayArtistsSection is false", () => {
    renderWithRelay({
      Partner: () => ({
        displayArtistsSection: false,
        representedArtists: { totalCount: 10 },
        notRepresentedArtists: { totalCount: 0 },
      }),
    })

    expect(screen.queryByText("Artists")).not.toBeInTheDocument()
  })

  it("doesn't display viewing rooms tab if no vieving rooms", () => {
    renderWithRelay({
      Partner: () => ({
        viewingRooms: { totalCount: 0 },
      }),
    })

    expect(screen.queryByText("Viewing Rooms")).not.toBeInTheDocument()
  })
})
