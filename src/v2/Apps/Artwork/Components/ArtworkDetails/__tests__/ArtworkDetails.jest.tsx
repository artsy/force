import { ArtworkDetails_Test_QueryRawResponse } from "v2/__generated__/ArtworkDetails_Test_Query.graphql"
import { ArtworkDetailsFixture } from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkDetails"
import { ArtworkDetailsFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkDetails"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { MockBoot, renderRelayTree } from "v2/DevTools"

import { SystemContextProvider } from "v2/Artsy"
import React from "react"
import { graphql } from "react-relay"

jest.mock("v2/Artsy/Analytics/useTracking")
jest.unmock("react-relay")
;(useTracking as jest.Mock).mockImplementation(() => {
  return {}
})

describe("ArtworkDetails", () => {
  const getWrapper = async (
    response: ArtworkDetails_Test_QueryRawResponse["artwork"] = ArtworkDetailsFixture,
    user: User = null
  ) => {
    return await renderRelayTree({
      Component: ({ artwork }: any) => {
        return (
          <SystemContextProvider user={user}>
            <ArtworkDetailsFragmentContainer artwork={artwork} />
          </SystemContextProvider>
        )
      },
      query: graphql`
        query ArtworkDetails_Test_Query @raw_response_type {
          artwork(id: "richard-prince-untitled-fashion") {
            ...ArtworkDetails_artwork
          }
        }
      `,
      wrapper: n => <MockBoot breakpoint="xs">{n}</MockBoot>,
      mockData: { artwork: response } as ArtworkDetails_Test_QueryRawResponse,
    })
  }
  let wrapper

  describe("ArtworkDetailsAdditionalInfo for a live sale artwork", () => {
    it("displays a request lot condition report button when canRequestLotConditionsReport is true", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        canRequestLotConditionsReport: true,
      })

      expect(wrapper.html()).toContain("Condition")
      expect(wrapper.html()).not.toContain(
        "Slight discoloration from sun exposure"
      )
    })

    it("display condition description when canRequestLotConditionsReport is false but has condition description", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        canRequestLotConditionsReport: false,
        conditionDescription: {
          label: "Condition details",
          details: "Slight discoloration from sun exposure",
        },
      })

      expect(wrapper.html()).toContain("Condition")
      expect(wrapper.html()).toContain("Slight discoloration from sun exposure")
    })

    it("does not display the condition section at all when canRequestLotConditionsReport is false and condition Description is missing", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        canRequestLotConditionsReport: false,
        conditionDescription: null,
      })

      expect(wrapper.html()).not.toContain("Condition")
    })
  })

  describe("ArtworkDetails for a gallery artwork that is missing some fields", () => {
    it("renders additional info with just what is present", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        series: null,
        publisher: null,
        manufacturer: null,
        image_rights: null,
        framed: null,
      })
      expect(wrapper.html()).toContain("Medium")
      expect(wrapper.html()).toContain("Signature")
      expect(wrapper.html()).toContain("Condition")
      expect(wrapper.html()).toContain("Certificate of authenticity")
      expect(
        wrapper.find("ArtworkDetailsAdditionalInfo").find("Row").length
      ).toBe(4)
    })
  })

  it("Does not render the additional details section for an artwork who has no metadata", async () => {
    const emptyData = {
      ...ArtworkDetailsFixture,
      category: null,
      series: null,
      publisher: null,
      manufacturer: null,
      image_rights: null,
      framed: null,
      signatureInfo: null,
      conditionDescription: null,
      certificateOfAuthenticity: null,
    }

    const emptyDataWrapper = await getWrapper(emptyData)
    expect(
      emptyDataWrapper.find("ArtworkDetailsAdditionalInfo").find("Row").length
    ).toBe(0)
  })

  describe("ArtworkDetails for gallery artwork with complete details", () => {
    it("renders a correct component tree", async () => {
      wrapper = await getWrapper()
      const html = wrapper.html()
      expect(html).toContain("About the work")
      expect(html).toContain("Follow")
      expect(html).toContain("Articles")
      expect(html).toContain("Exhibition history")
      expect(html).toContain("Bibliography")
      expect(html).toContain("Provenance")
    })
  })

  describe("ArtworkDetailsAboutTheWorkFromPartner", () => {
    it("displays partner name", async () => {
      wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Salon 94")
    })

    it("displays partner icon when info is available", async () => {
      wrapper = await getWrapper()
      expect(wrapper.find("img").prop("src")).toContain("https://profile_url")
    })

    it("displays partner Initials when profile is present but icon is not", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        partner: {
          ...ArtworkDetailsFixture.partner,
          profile: {
            ...ArtworkDetailsFixture.partner.profile,
            icon: null,
          },
        },
      })
      expect(wrapper.find("img").length).toBe(0)
      expect(wrapper.html()).toContain("S9")
    })

    it("does not display partner Icon if artwork is from benefit auction", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        sale: {
          id: "opaque-sale-id",
          isBenefit: true,
          isGalleryAuction: false,
        },
      })
      expect(wrapper.find("img").length).toBe(0)
      expect(wrapper.html()).not.toContain("S9")
    })

    it("does not display partner Icon if artwork is from gallery auction", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        sale: {
          id: "opaque-sale-id",
          isBenefit: false,
          isGalleryAuction: true,
        },
      })
      expect(wrapper.find("img").length).toBe(0)
      expect(wrapper.html()).not.toContain("S9")
    })

    it("displays partner additional_information for artwork", async () => {
      wrapper = await getWrapper()
      expect(wrapper.html()).toContain(
        "<p>Here is some addition info for this work</p>\n"
      )
    })

    it("does not display avatar when profile is not available and no initials for partner", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        partner: {
          ...ArtworkDetailsFixture.partner,
          profile: null,
          initials: null,
        },
      })
      expect(wrapper.find("img").length).toBe(0)
      // This checks that Avatar div is not rendered.
      expect(wrapper.find("EntityHeader").children.length).toBe(1)
    })

    it("renders truncated list of partner locations", async () => {
      wrapper = await getWrapper()
      expect(wrapper.html()).toContain("New York, Kharkov, +2 more")
    })

    it("renders partner follow button for regular partner with profile", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        partner: {
          ...ArtworkDetailsFixture.partner,
          type: "NOT Auction House",
        },
      })
      expect(wrapper.html()).toContain("Follow")
    })

    it("does not render partner follow button if artwork is from an auction partner", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        partner: {
          ...ArtworkDetailsFixture.partner,
          type: "Auction House",
        },
      })
      expect(wrapper.html()).not.toContain("Following")
    })

    it("works without a partner", async () => {
      wrapper = await getWrapper({
        ...ArtworkDetailsFixture,
        partner: null,
      })
      expect(wrapper).toBeTruthy()
    })
  })
})
