import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { NavigationTabs_Test_PartnerQuery } from "__generated__/NavigationTabs_Test_PartnerQuery.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Partner/Components/NavigationTabs"

jest.unmock("react-relay")
jest.mock("Components/RouteTabs")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

const { getWrapper } = setupTestWrapper<NavigationTabs_Test_PartnerQuery>({
  Component: ({ partner }: any) => {
    return <NavigationTabs partner={partner} />
  },
  query: graphql`
    query NavigationTabs_Test_PartnerQuery
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
    const { wrapper } = getWrapper({
      Partner: () => ({
        id: "white-cube",
        slug: "white-cube",
        displayArtistsSection: true,
        representedArtists: { totalCount: 10 },
        notRepresentedArtists: { totalCount: 10 },
        displayWorksSection: true,
      }),
    })
    const html = wrapper.html()

    expect(html).toContain("Overview")
    expect(html).toContain("Events")
    expect(html).toContain("Viewing Rooms")
    expect(html).toContain("Works")
    expect(html).toContain("Artists")
    expect(html).toContain("Articles")
    expect(html).toContain("Contact")
  })

  it("display Shop instead of Works for Brand partner", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        id: "white-cube",
        partnerType: "Brand",
        displayWorksSection: true,
      }),
    })
    const html = wrapper.html()

    expect(html).toContain("Shop")
  })

  it("doesn't display contact tab if no locations", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({ locations: { totalCount: null } }),
    })
    const html = wrapper.html()

    expect(html).not.toContain("Contact")
  })

  it("doesn't display articles tab if no locations", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({ articles: { totalCount: null } }),
    })
    const html = wrapper.html()

    expect(html).not.toContain("Articles")
  })

  it("doesn't display artists tab if no artists", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        displayArtistsSection: true,
        representedArtists: { totalCount: 0 },
        notRepresentedArtists: { totalCount: 0 },
      }),
    })
    const html = wrapper.html()

    expect(html).not.toContain("Artists")
  })

  it("doesn't display artists tab if displayArtistsSection is false", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        displayArtistsSection: false,
        representedArtists: { totalCount: 10 },
        notRepresentedArtists: { totalCount: 0 },
      }),
    })
    const html = wrapper.html()

    expect(html).not.toContain("Artists")
  })

  it("doesn't display viewing rooms tab if no vieving rooms", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        viewingRooms: { totalCount: 0 },
      }),
    })
    const html = wrapper.html()

    expect(html).not.toContain("Viewing Rooms")
  })
})
