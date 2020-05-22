import { defaultCollectionHeaderArtworks } from "v2/Apps/Collect/Routes/Collection/Components/Header/__tests__/fixtures/artworks"
import {
  CollectionDefaultHeader,
  fitHeaderArtworks,
} from "v2/Apps/Collect/Routes/Collection/Components/Header/DefaultHeader"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("default collections header artworks", () => {
  it("duplicates header artworks when the quantity of artworks in collection are small in a large viewport", () => {
    const artworks = defaultCollectionHeaderArtworks.edges.slice(0, 3)
    const headerArtworks = fitHeaderArtworks(artworks as any, 1275, false)

    expect(headerArtworks.length).toBeGreaterThan(artworks.length)
    expect(headerArtworks).toHaveLength(10)
  })

  it("duplicates header artworks when the quantity of artworks in collection are small in a small viewport", () => {
    const artworks = defaultCollectionHeaderArtworks.edges.slice(0, 2)
    const headerArtworks = fitHeaderArtworks(artworks as any, 375, true)

    expect(headerArtworks.length).toBeGreaterThan(artworks.length)
    expect(headerArtworks).toHaveLength(7)
  })

  it("returns only the number of artworks necessary to fill the header", () => {
    const artworks = defaultCollectionHeaderArtworks.edges
    const headerArtworks = fitHeaderArtworks(artworks as any, 675, false)

    expect(headerArtworks.length).toBeLessThan(artworks.length)
    expect(headerArtworks).toHaveLength(5)
  })
})

describe("default header component", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      headerArtworks: defaultCollectionHeaderArtworks,
      defaultHeaderImageHeight: 1000,
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = headerProps => {
    return mount(<CollectionDefaultHeader {...headerProps} />)
  }

  it("a header image's anchor tag references the correct artwork slug ", () => {
    const wrapper = getWrapper(props)

    expect(
      wrapper
        .find("a")
        .at(0)
        .props().href
    ).toEqual("/artwork/carrie-mae-weems-untitled-woman-feeding-bird")
  })

  describe("Tracking", () => {
    it("Tracks collection click", () => {
      const component = mount(<CollectionDefaultHeader {...props} />)

      component
        .find("a")
        .at(0)
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_page: "Collection",
        context_module: "ArtworkBanner",
        context_page_owner_type: "Collection",
        destination_path:
          "/artwork/carrie-mae-weems-untitled-woman-feeding-bird",
        context_page_owner_id: undefined,
        context_page_owner_slug: undefined,
      })
    })
  })
})
