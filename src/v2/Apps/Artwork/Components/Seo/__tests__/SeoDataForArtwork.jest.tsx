import { MockBoot, renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"

import { SeoDataForArtwork_Test_QueryRawResponse } from "v2/__generated__/SeoDataForArtwork_Test_Query.graphql"
import { CreativeWork } from "v2/Components/Seo/CreativeWork"
import { Product } from "v2/Components/Seo/Product"
import React from "react"
import {
  AVAILABILITY,
  SeoDataForArtworkFragmentContainer,
} from "../SeoDataForArtwork"
import { SeoDataForArtworkFixture } from "./SeoDataForArtwork.fixture"

jest.unmock("react-relay")
jest.mock("sharify", () => ({
  data: {
    APP_URL: "test-url",
  },
}))

describe("SeoDataForArtwork", () => {
  const getWrapper = async (
    artwork: SeoDataForArtwork_Test_QueryRawResponse["artwork"]
  ) => {
    return await renderRelayTree({
      Component: SeoDataForArtworkFragmentContainer,
      mockData: { artwork } as SeoDataForArtwork_Test_QueryRawResponse,
      query: graphql`
        query SeoDataForArtwork_Test_Query @raw_response_type {
          artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
            ...SeoDataForArtwork_artwork
          }
        }
      `,
      wrapper: renderer => <MockBoot>{renderer}</MockBoot>,
    })
  }

  const getProductData = wrapper =>
    wrapper
      .find(Product)
      .first()
      .props().data

  describe("SeoDataForArtworkFragmentContainer", () => {
    it("Renders without a partner", async () => {
      const wrapper = await getWrapper({
        ...SeoDataForArtworkFixture,
        partner: null,
      })

      expect(wrapper).toBeTruthy()
    })
    it("Renders a CreativeWork for an institution", async () => {
      const wrapper = await getWrapper({
        ...SeoDataForArtworkFixture,
        partner: {
          ...SeoDataForArtworkFixture.partner,
          type: "Institution",
        },
      })

      expect(wrapper.find(CreativeWork).length).toEqual(1)

      const data = wrapper
        .find(CreativeWork)
        .first()
        .props().data
      expect(data).toEqual({
        brand: {
          "@type": "Person",
          name: "Artist McArtist",
        },
        description: "artwork description",
        height: "2 in",
        image: "artwork-image",
        name: "artwork title",
        url: "test-url/artwork/an-artwork",
        width: "1 in",
      })
    })

    it("Renders a Product for a non-institution", async () => {
      const wrapper = await getWrapper({
        ...SeoDataForArtworkFixture,
        listPrice: {
          __typename: "Money",
          currencyCode: "USD",
          major: 1000,
        },
      })

      expect(wrapper.find(Product).length).toEqual(1)

      const data = wrapper
        .find(Product)
        .first()
        .props().data
      expect(data).toEqual({
        brand: { "@type": "Person", name: "Artist McArtist" },
        category: "Design/Decorative Art",
        description: "artwork description",
        height: "2 in",
        image: "artwork-image",
        name: "artwork title",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: 1000,
          priceCurrency: "USD",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        },
        productionDate: "1950",
        url: "test-url/artwork/an-artwork",
        width: "1 in",
      })
    })

    describe("Artwork availability", () => {
      it("Renders InStock when 'for sale'", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          availability: "for sale",
          listPrice: {
            __typename: "Money",
            currencyCode: "USD",
            major: 1000,
          },
        })

        expect(getProductData(wrapper).offers.availability).toEqual(
          AVAILABILITY["for sale"]
        )
      })

      it("Renders OutOfStock when not 'for sale'", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          availability: "sold",
          listPrice: {
            __typename: "Money",
            currencyCode: "USD",
            major: 1000,
          },
        })

        expect(getProductData(wrapper).offers.availability).toEqual(
          AVAILABILITY.sold
        )
      })
    })

    describe("Artwork price", () => {
      it("Doesn't render offer when price is hidden", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_hidden: true,
          is_price_range: true,
        })

        expect(getProductData(wrapper).offers).toBeFalsy()
      })

      it("Renders AggregateOffer when price range", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_hidden: false,
          is_price_range: false,
          listPrice: {
            __typename: "PriceRange",
            maxPrice: {
              major: 1000,
            },
            minPrice: {
              currencyCode: "USD",
              major: 100,
            },
          },
        })

        expect(getProductData(wrapper).offers).toEqual({
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          highPrice: 1000,
          lowPrice: 100,
          priceCurrency: "USD",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        })
      })

      it("Renders AggregateOffer when price range with low and high bounds", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_hidden: false,
          is_price_range: false,
          listPrice: {
            __typename: "PriceRange",
            maxPrice: {
              major: 1000,
            },
            minPrice: {
              currencyCode: "USD",
              major: 100,
            },
          },
        })

        expect(getProductData(wrapper).offers).toEqual({
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          highPrice: 1000,
          lowPrice: 100,
          priceCurrency: "USD",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        })
      })

      it("Renders AggregateOffer when price range only with low bound", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_hidden: false,
          is_price_range: false,
          listPrice: {
            __typename: "PriceRange",
            maxPrice: null,
            minPrice: {
              currencyCode: "USD",
              major: 100,
            },
          },
        })

        expect(getProductData(wrapper).offers).toEqual({
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          lowPrice: 100,
          priceCurrency: "USD",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        })
      })

      it("Doesn't render offer when price range and no low bound", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_hidden: false,
          is_price_range: false,
          listPrice: {
            __typename: "PriceRange",
            maxPrice: {
              major: 1000,
            },
            minPrice: null,
          },
        })

        expect(getProductData(wrapper).offers).toBeFalsy()
      })

      it("Does not render seller within offer when profile image (required) is not present", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          listPrice: {
            __typename: "PriceRange",
            maxPrice: {
              major: 1000,
            },
            minPrice: {
              currencyCode: "USD",
              major: 100,
            },
          },
          partner: {
            id: "opaque-partner-id",
            name: "Wright",
            profile: {
              id: "opaque-profile-id",
              image: null,
            },
            type: "Auction House",
          },
        })

        expect(getProductData(wrapper).offers.seller).toBeFalsy()
      })
    })
    describe("Artwork dimensions", () => {
      it("renders no dimensions when dimensions aren't parseable", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "one point twenty one gigawatts",
          },
        })

        expect(getProductData(wrapper).width).toBeUndefined()
        expect(getProductData(wrapper).height).toBeUndefined()
        expect(getProductData(wrapper).depth).toBeUndefined()
      })

      it("renders width and height when given two dimensions", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "2 × 4 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toBeUndefined()
      })

      it("renders width, height, and depth when given three dimensions", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "2 × 4 × 6 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toEqual("6 in")
      })

      it("parses dimensions missing spaces", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "2×4×6 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toEqual("6 in")
      })

      it("assumes inches when no unit is included", async () => {
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          dimensions: {
            in: "2 × 4",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toBeUndefined()
      })

      it("successfully handles case when no dimensions a present", async () => {
        expect(() =>
          getWrapper({ ...SeoDataForArtworkFixture, dimensions: undefined })
        ).not.toThrow()
      })
    })
  })
})
