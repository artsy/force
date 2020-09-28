import { SystemContextProvider } from "v2/Artsy"
import { MockBoot } from "v2/DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchApp } from "../SearchApp"

jest.mock("v2/Components/RouteTabs", () => ({
  RouteTab: ({ children }) => children,
  TabCarousel: ({ tabs }) => tabs,
}))

describe("SearchApp", () => {
  const getWrapper = (searchProps: any) => {
    const trackEvent = jest.fn()
    const tracking = { trackEvent }
    return mount(
      <MockBoot breakpoint="lg">
        <SystemContextProvider>
          <SearchApp {...searchProps} tracking={tracking} />
        </SystemContextProvider>
      </MockBoot>
    )
  }

  const props = {
    match: {
      location: {
        query: { term: "andy" },
      },
    },
    viewer: {
      searchConnection: {
        aggregations: [
          {
            slice: "TYPE",
            counts: [
              { name: "PartnerGallery", count: 100 },
              { name: "artist", count: 320 },
              { name: "gene", count: 0 },
            ],
          },
        ],
      },
      artworksConnection: {
        counts: {
          total: 100,
        },
      },
    },
  }

  it("includes the total count", () => {
    const wrapper = getWrapper(props).find("TotalResults")
    const html = wrapper.text()
    expect(html).toContain("520 results for \u201Candy\u201D")
  })

  it("includes tabs w/ counts", () => {
    const wrapper = getWrapper(props).find("NavigationTabs")
    const html = wrapper.text()
    expect(html).toMatch(/Artworks.*100/)
    expect(html).toMatch(/Artists.*320/)
    expect(html).toMatch(/Galleries.*100/)
    expect(html).not.toContain("Categories")
  })
})
