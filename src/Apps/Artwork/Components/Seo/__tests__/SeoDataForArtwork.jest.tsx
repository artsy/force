import { renderRelayTree } from "DevTools/renderRelayTree"
import { MockBoot } from "DevTools/MockBoot"
import { graphql } from "react-relay"

import { SeoDataForArtwork_Test_Query$rawResponse } from "__generated__/SeoDataForArtwork_Test_Query.graphql"
import { CreativeWork } from "Components/Seo/CreativeWork"
import { Product } from "Components/Seo/Product"
import {
  AVAILABILITY,
  SeoDataForArtworkFragmentContainer,
} from "Apps/Artwork/Components/Seo/SeoDataForArtwork"
import { SeoDataForArtworkFixture } from "./SeoDataForArtwork.fixture"

jest.unmock("react-relay")
jest.mock("sharify", () => ({
  data: {
    APP_URL: "test-url",
  },
}))

describe("SeoDataForArtwork", () => {
  const getWrapper = async (
    artwork: SeoDataForArtwork_Test_Query$rawResponse["artwork"]
  ) => {
    return await renderRelayTree({
      Component: SeoDataForArtworkFragmentContainer,
      wrapper: renderer => <MockBoot>{renderer}</MockBoot>,
      query: graphql`
        query SeoDataForArtwork_Test_Query
          @raw_response_type
          @relay_test_operation {
          artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
            ...SeoDataForArtwork_artwork
          }
        }
      `,
      mockData: { artwork } as SeoDataForArtwork_Test_Query$rawResponse,
    })
  }

  const getProductData = wrapper => wrapper.find(Product).first().props().data

  describe("SeoDataForArtworkFragmentContainer", () => {
    it("Renders without a partner", async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const wrapper = await getWrapper({
        ...SeoDataForArtworkFixture,
        partner: null,
      })

      expect(wrapper).toBeTruthy()
    })
    it("Renders a CreativeWork for an institution", async () => {
      const wrapper = await getWrapper({
        ...SeoDataForArtworkFixture,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        partner: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ...SeoDataForArtworkFixture.partner,
          type: "Institution",
        },
      })

      expect(wrapper.find(CreativeWork).length).toEqual(1)

      const data = wrapper.find(CreativeWork).first().props().data
      expect(data).toEqual({
        brand: {
          "@type": "Person",
          name: "Artist McArtist",
        },
        description: "artwork description",
        image: "artwork-image",
        name: "artwork title",
        url: "test-url/artwork/an-artwork",
        width: "1 in",
        height: "2 in",
      })
    })

    it("Renders a Product for a non-institution", async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const wrapper = await getWrapper({
        ...SeoDataForArtworkFixture,
        listPrice: {
          __typename: "Money",
          major: 1000,
          currencyCode: "USD",
        },
      })

      expect(wrapper.find(Product).length).toEqual(1)

      const data = wrapper.find(Product).first().props().data
      expect(data).toEqual({
        brand: { "@type": "Person", name: "Artist McArtist" },
        category: "Design/Decorative Art",
        description: "artwork description",
        image: "artwork-image",
        name: "artwork title",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: 1000,
          priceCurrency: "USD",
          seller: {
            "@type": "ArtGallery",
            name: "Wright",
            image: "partner-image",
          },
        },
        productionDate: "1950",
        url: "test-url/artwork/an-artwork",
        width: "1 in",
        height: "2 in",
      })
    })

    describe("Artwork availability", () => {
      it("Renders InStock when 'for sale'", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          listPrice: {
            __typename: "Money",
            major: 1000,
            currencyCode: "USD",
          },
          availability: "for sale",
        })

        expect(getProductData(wrapper).offers.availability).toEqual(
          AVAILABILITY["for sale"]
        )
      })

      it("Renders OutOfStock when not 'for sale'", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          listPrice: {
            __typename: "Money",
            major: 1000,
            currencyCode: "USD",
          },
          availability: "sold",
        })

        expect(getProductData(wrapper).offers.availability).toEqual(
          AVAILABILITY.sold
        )
      })
    })

    describe("Artwork price", () => {
      it("renders CreativeWork when price is hidden", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: true,
          is_price_hidden: true,
        })

        expect(wrapper.find(CreativeWork).length).toEqual(1)
        expect(wrapper.find(Product).length).toEqual(0)
      })

      it("Renders AggregateOffer when price range", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: false,
          is_price_hidden: false,
          listPrice: {
            __typename: "PriceRange",
            maxPrice: {
              major: 1000,
            },
            minPrice: {
              major: 100,
              currencyCode: "USD",
            },
          },
        })

        expect(getProductData(wrapper).offers).toEqual({
          "@type": "AggregateOffer",
          lowPrice: 100,
          highPrice: 1000,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        })
      })

      it("Renders AggregateOffer when price range with low and high bounds", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: false,
          is_price_hidden: false,
          listPrice: {
            __typename: "PriceRange",
            maxPrice: {
              major: 1000,
            },
            minPrice: {
              major: 100,
              currencyCode: "USD",
            },
          },
        })

        expect(getProductData(wrapper).offers).toEqual({
          "@type": "AggregateOffer",
          lowPrice: 100,
          highPrice: 1000,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        })
      })

      it("Renders AggregateOffer when price range only with low bound", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: false,
          is_price_hidden: false,
          listPrice: {
            __typename: "PriceRange",
            minPrice: {
              major: 100,
              currencyCode: "USD",
            },
            maxPrice: null,
          },
        })

        expect(getProductData(wrapper).offers).toEqual({
          "@type": "AggregateOffer",
          lowPrice: 100,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        })
      })

      it("renders CreativeWork when price range and no low bound", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          is_price_range: false,
          is_price_hidden: false,
          listPrice: {
            __typename: "PriceRange",
            minPrice: null,
            maxPrice: {
              major: 1000,
            },
          },
        })

        expect(wrapper.find(CreativeWork).length).toEqual(1)
        expect(wrapper.find(Product).length).toEqual(0)
      })

      it("Does not render seller within offer when profile image (required) is not present", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          partner: {
            id: "opaque-partner-id",
            name: "Wright",
            type: "Auction House",
            profile: {
              id: "opaque-profile-id",
              image: null,
            },
          },
          listPrice: {
            __typename: "PriceRange",
            maxPrice: {
              major: 1000,
            },
            minPrice: {
              major: 100,
              currencyCode: "USD",
            },
          },
        })

        expect(getProductData(wrapper).offers.seller).toBeFalsy()
      })
    })
    describe("Artwork dimensions", () => {
      const listPrice = {
        __typename: "PriceRange",
        maxPrice: {
          major: 1000,
        },
        minPrice: {
          major: 100,
          currencyCode: "USD",
        },
      }

      it("renders no dimensions when dimensions aren't parseable", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          listPrice,
          dimensions: {
            in: "one point twenty one gigawatts",
          },
        })

        expect(getProductData(wrapper).width).toBeUndefined()
        expect(getProductData(wrapper).height).toBeUndefined()
        expect(getProductData(wrapper).depth).toBeUndefined()
      })

      it("renders width and height when given two dimensions", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          listPrice,
          dimensions: {
            in: "2 × 4 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toBeUndefined()
      })

      it("renders width, height, and depth when given three dimensions", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          listPrice,
          dimensions: {
            in: "2 × 4 × 6 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toEqual("6 in")
      })

      it("parses dimensions missing spaces", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          listPrice,
          dimensions: {
            in: "2×4×6 in",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toEqual("6 in")
      })

      it("assumes inches when no unit is included", async () => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const wrapper = await getWrapper({
          ...SeoDataForArtworkFixture,
          listPrice,
          dimensions: {
            in: "2 × 4",
          },
        })

        expect(getProductData(wrapper).width).toEqual("2 in")
        expect(getProductData(wrapper).height).toEqual("4 in")
        expect(getProductData(wrapper).depth).toBeUndefined()
      })

      it("successfully handles case when no dimensions are present", async () => {
        expect(() =>
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          getWrapper({ ...SeoDataForArtworkFixture, dimensions: undefined })
        ).not.toThrow()
      })
    })
  })
})
