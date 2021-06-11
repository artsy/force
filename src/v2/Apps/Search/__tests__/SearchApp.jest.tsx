import { SystemContextProvider } from "v2/System"
import { MockBoot } from "v2/DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchApp } from "../SearchApp"

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
      artworksConnection: {
        counts: {
          total: 100,
        },
      },
      searchConnection: {
        aggregations: [
          {
            counts: [
              { count: 100, name: "PartnerGallery" },
              { count: 320, name: "artist" },
              { count: 0, name: "gene" },
            ],
            slice: "TYPE",
          },
        ],
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
