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
        query ArtworkSidebarExtraLinks_Test_Query @raw_response_type {
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
      wrapper = await getWrapper(BenefitAuctionArtwork)
    })
    it("displays proper conditions of sale text", () => {
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's Conditions of Sale."
      )
      expect(wrapper.text()).toContain(
        "Have a question? Read our auction FAQs or ask a specialist."
      )
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Consign with Artsy."
      )
    })
  })

  describe("for work in an auction by Van Ham", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(VanHamLiveAuctionArtwork)
    })
    it("displays proper conditions of sale text", () => {
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's and Van Ham's Conditions of Sale."
      )
    })
  })

  describe("for work in an auction without a partner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(LiveAuctionArtworkWithoutPartner)
    })
    it("displays proper conditions of sale text", () => {
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's Conditions of Sale."
      )
    })
  })

  describe("for work in an auction", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(LiveAuctionArtwork)
    })
    it("displays proper conditions of sale text", () => {
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's and Christie's Conditions of Sale."
      )
      expect(wrapper.text()).toContain(
        "Have a question? Read our auction FAQs or ask a specialist."
      )
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Consign with Artsy."
      )
    })
    it("displays conditions of sale link that opens conditions of sale page", () => {
      expect(wrapper.find('a[children="Conditions of Sale"]').length).toBe(1)
      wrapper.find('a[children="Conditions of Sale"]').at(0).simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/conditions-of-sale/),
        "_blank"
      )
    })
    it("displays FAQ link that brings auction FAQ modal", () => {
      expect(wrapper.find('a[children="auction FAQs"]').length).toBe(1)
      wrapper.find('a[children="auction FAQs"]').at(0).simulate("click")
      // TODO: verify mediator call with openAuctionFAQModal
    })
    it("displays ask a specialist link that brings ask an auction specialist modal", () => {
      expect(wrapper.find('a[children="ask a specialist"]').length).toBe(1)
      wrapper.find('a[children="ask a specialist"]').at(0).simulate("click")
      // TODO: verify mediator call with openAuctionAskSpecialistModal
    })
    it("displays consign link that opens consign page", () => {
      expect(wrapper.find('a[children="Consign with Artsy"]').length).toBe(1)
      wrapper.find('a[children="Consign with Artsy"]').at(0).simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/consign/),
        "_blank"
      )
    })
  })

  describe("for Buy now work", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(AcquireableArtworkWithOneConsignableArtist)
    })
    it("displays proper text", () => {
      expect(wrapper.text()).toContain(
        "Have a question? Visit our help center or ask a specialist."
      )
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Consign with Artsy."
      )
    })
    it("displays help center link that opens help center page", () => {
      expect(wrapper.find('a[children="Visit our help center"]').length).toBe(1)
      wrapper
        .find('a[children="Visit our help center"]')
        .at(0)
        .simulate("click")
      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(
          "https://support.artsy.net/hc/en-us/sections/360008203114-Buy-Now-and-Make-Offer"
        ),
        "_blank"
      )
    })
    it("displays ask a specialist link that brings ask sale specialist modal", () => {
      expect(wrapper.find('a[children="ask a specialist"]').length).toBe(1)
      wrapper.find('a[children="ask a specialist"]').at(0).simulate("click")
      // TODO: verify mediator call with openBuyNowAskSpecialistModal
    })
    it("displays consign link that opens consign page", () => {
      expect(wrapper.find('a[children="Consign with Artsy"]').length).toBe(1)
      wrapper.find('a[children="Consign with Artsy"]').at(0).simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/consign/),
        "_blank"
      )
    })
  })

  describe("for inquireable work", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(
        InquireableArtworkWithMultipleConsignableArtists
      )
    })

    it("displays proper text", () => {
      expect(wrapper.text()).toContain(
        "Have a question? Visit our help center."
      )
      expect(wrapper.text()).toContain(
        "Want to sell a work by these artists? Consign with Artsy."
      )
    })
    it("displays help center link that opens help center page", () => {
      expect(wrapper.find('a[children="Visit our help center"]').length).toBe(1)
      wrapper
        .find('a[children="Visit our help center"]')
        .at(0)
        .simulate("click")
      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(
          "https://support.artsy.net/hc/en-us/sections/360008203054-Contact-a-gallery"
        ),
        "_blank"
      )
    })
    it("displays consign link that opens consign page", () => {
      expect(wrapper.find('a[children="Consign with Artsy"]').length).toBe(1)
      wrapper.find('a[children="Consign with Artsy"]').at(0).simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/consign/),
        "_blank"
      )
    })
  })

  describe("for not for sale work", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(NotForSaleArtworkWithOneConsignableArtist)
    })
    it("displays proper text", () => {
      expect(wrapper.text()).not.toContain("Have a question? Read our FAQ")
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Consign with Artsy."
      )
    })
    it("displays consign link that opens consign page", () => {
      expect(wrapper.find('a[children="Consign with Artsy"]').length).toBe(1)
      wrapper.find('a[children="Consign with Artsy"]').at(0).simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/consign/),
        "_blank"
      )
    })
  })
})
