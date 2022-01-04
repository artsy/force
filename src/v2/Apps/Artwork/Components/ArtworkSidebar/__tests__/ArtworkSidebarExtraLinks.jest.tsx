import { ArtworkSidebarExtraLinks_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebarExtraLinks_Test_Query.graphql"
import {
  AcquireableArtworkWithOneConsignableArtist,
  BenefitAuctionArtwork,
  InquireableArtworkWithMultipleConsignableArtists,
  LiveAuctionArtwork,
  LiveAuctionArtworkWithoutPartner,
  NotForSaleArtworkWithOneConsignableArtist,
  VanHamLiveAuctionArtwork,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarExtraLinks"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"
import { ArtworkSidebarExtraLinksFragmentContainer } from "../../ArtworkSidebar/ArtworkSidebarExtraLinks"

jest.unmock("react-relay")

describe("ArtworkSidebarExtraLinks", () => {
  let wrapper = null

  const getWrapper = async (
    response: ArtworkSidebarExtraLinks_Test_QueryRawResponse["artwork"]
  ) => {
    return await renderRelayTree({
      Component: ArtworkSidebarExtraLinksFragmentContainer,
      query: graphql`
        query ArtworkSidebarExtraLinks_Test_Query
          @raw_response_type
          @relay_test_operation {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarExtraLinks_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as ArtworkSidebarExtraLinks_Test_QueryRawResponse,
    })
  }

  describe("for work in a benefit auction", () => {
    beforeAll(async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper = await getWrapper(BenefitAuctionArtwork)
    })
    it("displays proper conditions of sale text", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's Conditions of Sale."
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Have a question? Read our auction FAQs or ask a specialist."
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Consign with Artsy."
      )
    })
  })

  describe("for work in an auction by Van Ham", () => {
    beforeAll(async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper = await getWrapper(VanHamLiveAuctionArtwork)
    })
    it("displays proper conditions of sale text", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's and Van Ham's Conditions of Sale."
      )
    })
  })

  describe("for work in an auction without a partner", () => {
    beforeAll(async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper = await getWrapper(LiveAuctionArtworkWithoutPartner)
    })
    it("displays proper conditions of sale text", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's Conditions of Sale."
      )
    })
  })

  describe("for work in an auction", () => {
    beforeAll(async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper = await getWrapper(LiveAuctionArtwork)
    })
    it("displays proper conditions of sale text", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's and Christie's Conditions of Sale."
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Have a question? Read our auction FAQs or ask a specialist."
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Consign with Artsy."
      )
    })
    it("displays conditions of sale link that opens conditions of sale page", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('a[children="Conditions of Sale"]').length).toBe(1)
    })
    it("displays FAQ link that brings auction FAQ modal", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('button[children="auction FAQs"]').length).toBe(1)
    })
    it("displays ask a specialist link that brings ask an auction specialist modal", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('button[children="ask a specialist"]').length).toBe(1)
    })
    it("displays consign link that opens consign page", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('a[children="Consign with Artsy"]').length).toBe(1)
    })
  })

  describe("for Buy now work", () => {
    beforeAll(async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper = await getWrapper(AcquireableArtworkWithOneConsignableArtist)
    })
    it("displays proper text", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Have a question? Visit our help center or ask a specialist."
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Consign with Artsy."
      )
    })

    it("displays help center link that opens help center page", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('a[children="Visit our help center"]').length).toBe(1)
    })
    it("displays ask a specialist link that brings ask sale specialist modal", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('button[children="ask a specialist"]').length).toBe(1)
    })
    it("displays consign link that opens consign page", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('a[children="Consign with Artsy"]').length).toBe(1)
    })
  })

  describe("for inquireable work", () => {
    beforeAll(async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper = await getWrapper(
        InquireableArtworkWithMultipleConsignableArtists
      )
    })

    it("displays proper text", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Have a question? Visit our help center."
      )
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Want to sell a work by these artists? Consign with Artsy."
      )
    })
    it("displays help center link that opens help center page", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('a[children="Visit our help center"]').length).toBe(1)
    })
    it("displays consign link that opens consign page", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('a[children="Consign with Artsy"]').length).toBe(1)
    })
  })

  describe("for not for sale work", () => {
    beforeAll(async () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper = await getWrapper(NotForSaleArtworkWithOneConsignableArtist)
    })
    it("displays proper text", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).not.toContain("Have a question? Read our FAQ")
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Consign with Artsy."
      )
    })
    it("displays consign link that opens consign page", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(wrapper.find('a[children="Consign with Artsy"]').length).toBe(1)
    })
  })
})
