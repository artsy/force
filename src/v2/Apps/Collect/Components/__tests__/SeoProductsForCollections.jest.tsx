import { SeoProductsForCollections_ascending_artworks$data } from "v2/__generated__/SeoProductsForCollections_ascending_artworks.graphql"
import { SeoProductsForCollections_descending_artworks$data } from "v2/__generated__/SeoProductsForCollections_descending_artworks.graphql"
import { mount } from "enzyme"
import { HeadProvider } from "react-head"
import { SeoProductsForCollections } from "../SeoProductsForCollections"

describe("Seo Products for Collection Page", () => {
  function buildPriceRange(minPrice?, maxPrice?) {
    const minPriceObject = minPrice
      ? {
          minPrice: {
            major: minPrice,
            currencyCode: "USD",
          },
        }
      : {}

    const maxPriceObject = maxPrice
      ? {
          maxPrice: {
            major: maxPrice,
            currencyCode: "USD",
          },
        }
      : {}

    return {
      __typename: "PriceRange",
      ...minPriceObject,
      ...maxPriceObject,
    }
  }

  function buildIndividualPrice(price) {
    return {
      __typename: "Money",
      major: price,
      currencyCode: "USD",
    }
  }

  function buildEmptyPrice() {
    return undefined
  }

  function buildDescendingArtworks(
    listPrice
  ): SeoProductsForCollections_descending_artworks$data {
    return {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      " $refType": null,
      edges: [
        {
          node: {
            id: "1",
            availability: "yes",
            listPrice,
          },
        },
      ],
    }
  }

  function buildAscendingArtworks(
    listPrice
  ): SeoProductsForCollections_ascending_artworks$data {
    return {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      " $refType": null,
      edges: [
        {
          node: {
            id: "1",
            availability: "yes",
            listPrice,
          },
        },
      ],
    }
  }

  let props
  beforeEach(() => {
    props = {
      descending_artworks: buildDescendingArtworks(buildPriceRange(8800, 9000)),
      ascending_artworks: buildAscendingArtworks(buildPriceRange(10, 20)),
      collectionDescription: "A fake description for collection",
      collectionURL: "A fake URL for collection",
      collectionName: "A fake name for collection",
    }
  })

  const renderProducts = () => {
    return mount(
      <HeadProvider>
        <SeoProductsForCollections
          ascending_artworks={props.ascending_artworks}
          descending_artworks={props.descending_artworks}
          collectionDescription={props.collectionDescription}
          collectionName={props.collectionName}
          collectionURL={props.collectionURL}
        />
      </HeadProvider>
    )
  }

  it("renders collection metadata", () => {
    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toContain('"name": "A fake name for collection"')
    expect(html).toContain('"url": "A fake URL for collection"')
    expect(html).toContain('"description": "A fake description for collection"')
  })

  it("renders pricing data for collections with price ranges", () => {
    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toContain('"lowPrice": 10')
    expect(html).toContain('"highPrice": 9000')
  })

  it("falls back to maxPrice if the ascending artwork range is missing minPrice", () => {
    props.ascending_artworks = buildAscendingArtworks(buildPriceRange(null, 25))

    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toContain('"lowPrice": 25')
    expect(html).toContain('"highPrice": 9000')
  })

  it("falls back to minPrice if the descending artwork range is missing maxPrice", () => {
    props.descending_artworks = buildDescendingArtworks(
      buildPriceRange(500, null)
    )

    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toContain('"lowPrice": 10')
    expect(html).toContain('"highPrice": 500')
  })

  it("renders pricing data for collections with individual prices", () => {
    props.descending_artworks = buildDescendingArtworks(
      buildIndividualPrice(30)
    )
    props.ascending_artworks = buildAscendingArtworks(buildIndividualPrice(15))
    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toContain('"lowPrice": 15')
    expect(html).toContain('"highPrice": 30')
  })

  describe("no prices for descending artwork", () => {
    beforeEach(() => {
      props.descending_artworks = buildDescendingArtworks(buildEmptyPrice())
    })

    it("renders price from individual ascending artwork price", () => {
      props.ascending_artworks = buildAscendingArtworks(
        buildIndividualPrice(20)
      )
      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice": 20')
      expect(html).toContain('"highPrice": 20')
    })

    it("renders price from ascending artwork price range", () => {
      props.ascending_artworks = buildAscendingArtworks(buildPriceRange(11, 14))
      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice": 11')
      expect(html).toContain('"highPrice": 14')
    })
  })

  describe("no prices for ascending artwork", () => {
    beforeEach(() => {
      props.ascending_artworks = buildAscendingArtworks(buildEmptyPrice())
    })

    it("renders price from individual descending artwork price", () => {
      props.descending_artworks = buildDescendingArtworks(
        buildIndividualPrice(20)
      )
      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice": 20')
      expect(html).toContain('"highPrice": 20')
    })

    it("renders price from ascending artwork price range", () => {
      props.descending_artworks = buildDescendingArtworks(
        buildPriceRange(11, 14)
      )
      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice": 11')
      expect(html).toContain('"highPrice": 14')
    })
  })

  describe("when both a Money and a PriceRange are present", () => {
    it("uses the maxPrice when the descending is a PriceRange", () => {
      props.ascending_artworks = buildAscendingArtworks(
        buildIndividualPrice(42)
      )
      props.descending_artworks = buildDescendingArtworks(
        buildPriceRange(400, 420)
      )

      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice": 42')
      expect(html).toContain('"highPrice": 420')
    })

    it("uses the minPrice when the ascending is a PriceRange", () => {
      props.ascending_artworks = buildAscendingArtworks(
        buildPriceRange(42, 100)
      )
      props.descending_artworks = buildDescendingArtworks(
        buildIndividualPrice(420)
      )

      const wrapper = renderProducts()

      const html = wrapper.html()
      expect(html).toContain('"lowPrice": 42')
      expect(html).toContain('"highPrice": 420')
    })
  })

  it("does not render anything if there is no ascending or descending artwork price", () => {
    props.descending_artworks = buildDescendingArtworks(buildEmptyPrice())
    props.ascending_artworks = buildAscendingArtworks(buildEmptyPrice())
    const wrapper = renderProducts()

    const html = wrapper.html()
    expect(html).toBeFalsy()
  })
})
