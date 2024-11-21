import { ArtworkDetails_Test_Query } from "__generated__/ArtworkDetails_Test_Query.graphql"
import { ArtworkDetailsFragmentContainer } from "Apps/Artwork/Components/ArtworkDetails"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"
import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.mock("react-tracking")
jest.unmock("react-relay")
;(useTracking as jest.Mock).mockImplementation(() => {
  return {}
})

jest.mock("Components/EntityHeaders/EntityHeaderPartner", () => ({
  EntityHeaderPartnerFragmentContainer: () =>
    "EntityHeaderPartnerFragmentContainer",
}))

const { getWrapper } = setupTestWrapper<ArtworkDetails_Test_Query>({
  Component: ({ artwork }) => {
    return (
      <MockBoot breakpoint="xs">
        <ArtworkDetailsFragmentContainer artwork={artwork!} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtworkDetails_Test_Query @relay_test_operation {
      artwork(id: "example") {
        ...ArtworkDetails_artwork
      }
    }
  `,
})

describe("ArtworkDetails", () => {
  describe("ArtworkDetailsAdditionalInfo for a live sale artwork", () => {
    it("displays a request lot condition report button when canRequestLotConditionsReport is true", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          canRequestLotConditionsReport: true,
          conditionDescription: {
            label: "Condition details",
            details: "Slight discoloration from sun exposure",
          },
        }),
      })

      expect(wrapper.html()).toContain("Condition")
      expect(wrapper.html()).not.toContain(
        "Slight discoloration from sun exposure"
      )
    })

    it("display condition description when canRequestLotConditionsReport is false but has condition description", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          canRequestLotConditionsReport: false,
          conditionDescription: {
            label: "Condition details",
            details: "Slight discoloration from sun exposure",
          },
        }),
      })

      expect(wrapper.html()).toContain("Condition")
      expect(wrapper.html()).toContain("Slight discoloration from sun exposure")
    })

    it("does not display the condition section at all when canRequestLotConditionsReport is false and condition Description is missing", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          canRequestLotConditionsReport: false,
          conditionDescription: null,
        }),
      })

      expect(wrapper.html()).not.toContain("Condition")
    })
  })

  describe("ArtworkDetails for a gallery artwork that is missing some fields", () => {
    it("renders additional info with just what is present", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          series: null,
          publisher: null,
          manufacturer: null,
          image_rights: null,
          framed: null,
        }),
      })

      expect(wrapper.html()).toContain("Medium")
      expect(wrapper.html()).toContain("Signature")
      expect(wrapper.html()).toContain("Condition")
      expect(wrapper.html()).toContain("Certificate of authenticity")
      expect(wrapper.html()).toContain("Rarity")
      expect(wrapper.html()).toContain("Size")
      expect(wrapper.html()).toContain("Material")
      expect(
        wrapper.find("ArtworkDetailsAdditionalInfo").find("dl").length
      ).toBe(7)
    })
  })

  it("Does not render the additional details section for an artwork who has no metadata", () => {
    const emptyData = {
      Artwork: () => ({
        category: null,
        attributionClass: null,
        dimensions: null,
        medium: null,
        series: null,
        publisher: null,
        manufacturer: null,
        image_rights: null,
        framed: null,
        signatureInfo: null,
        conditionDescription: null,
        certificateOfAuthenticity: null,
        canRequestLotConditionsReport: false,
      }),
    }

    const { wrapper } = getWrapper(emptyData)

    expect(wrapper.find("ArtworkDetailsAdditionalInfo").find("dl").length).toBe(
      0
    )
  })

  describe("ArtworkDetails for gallery artwork with complete details", () => {
    it("renders a correct component tree", () => {
      const { wrapper } = getWrapper()
      const html = wrapper.html()

      expect(html).toContain("About the work")
      expect(html).toContain("Articles")
      expect(html).toContain("Exhibition history")
      expect(html).toContain("Bibliography")
      expect(html).toContain("Provenance")
    })
  })

  describe("ArtworkDetailsAboutTheWorkFromPartner", () => {
    it("displays partner additionalInformation for artwork", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          additionalInformation: "Here is some additional info for this work",
        }),
      })

      expect(wrapper.html()).toContain(
        "Here is some additional info for this work"
      )
    })

    it("does not display avatar when profile is not available and no initials for partner", () => {
      const { wrapper } = getWrapper({
        Partner: () => ({ profile: null, initials: null }),
      })

      expect(wrapper.find("img").length).toBe(0)
      // This checks that Avatar div is not rendered.
      expect(wrapper.find("EntityHeader").children.length).toBe(1)
    })

    it("does not render partner follow button if artwork is from an auction partner", () => {
      const { wrapper } = getWrapper({
        Partner: () => ({
          type: "Auction House",
        }),
      })

      expect(wrapper.html()).not.toContain("Following")
    })

    it("works without a partner", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          partner: null,
        }),
      })

      expect(wrapper).toBeTruthy()
    })
  })
})
