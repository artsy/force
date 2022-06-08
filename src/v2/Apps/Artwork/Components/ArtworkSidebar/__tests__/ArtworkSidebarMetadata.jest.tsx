import { ArtworkSidebarMetadata_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebarMetadata_Test_Query.graphql"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"
import { ReactWrapper } from "enzyme"
import {
  EmptyMetadataNoEditions,
  FilledOutMetadataMultipleEditionSets,
  FilledOutMetadataNoEditions,
  FilledOutMetadataOneEditionSet,
  FilledOutMetadataNoSizeInfo,
  MetadataForAuctionWork,
} from "../../../../__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarMetadata"
import { ArtworkSidebarClassification } from "../../ArtworkSidebar/ArtworkSidebarClassification"
import { ArtworkSidebarMetadataFragmentContainer } from "../../ArtworkSidebar/ArtworkSidebarMetadata"
import { ArtworkSidebarSizeInfo } from "../../ArtworkSidebar/ArtworkSidebarSizeInfo"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ArtworkSidebarMetadata", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  let wrapper: ReactWrapper

  const getWrapper = async (
    response: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = FilledOutMetadataNoEditions
  ) => {
    return await renderRelayTree({
      Component: ArtworkSidebarMetadataFragmentContainer,
      query: graphql`
        query ArtworkSidebarMetadata_Test_Query
          @raw_response_type
          @relay_test_operation {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarMetadata_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as ArtworkSidebarMetadata_Test_QueryRawResponse,
    })
  }

  describe("for non editioned artwork", () => {
    beforeEach(async () => {
      wrapper = await getWrapper()
    })

    it("displays title and year", () => {
      expect(wrapper?.html()).toContain("<i>Easel (Vydock)</i>, 1995")
    })

    it("displays medium", () => {
      expect(wrapper?.html()).toContain(
        "Acrylic and graphite on bonded aluminium"
      )
    })

    it("displays dimensions", () => {
      const html = wrapper?.html()

      expect(html).toContain("97 × 15 in")
      expect(html).toContain("246.4 × 38.1 cm")
    })

    it("displays classification", () => {
      expect(wrapper?.text()).toContain("This is a unique work")
    })
  })

  describe("for artwork with one edition", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(FilledOutMetadataOneEditionSet)
    })

    it("displays title and year", () => {
      expect(wrapper?.html()).toContain("<i>Sun Keyed</i>, 1972")
    })

    it("displays medium", () => {
      expect(wrapper?.html()).toContain("Serigraph")
    })

    it("displays edition dimensions", () => {
      const html = wrapper?.html()
      expect(html).toContain("14 × 18 in")
      expect(html).toContain("35.6 × 45.7 cm")
    })

    it("displays edition details", () => {
      expect(wrapper?.html()).toContain("Edition of 3000")
    })

    it("displays classification", () => {
      expect(wrapper?.text()).toContain("This is part of a limited edition set")
    })
  })

  describe("for artwork with multiple editions", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(FilledOutMetadataMultipleEditionSets)
    })

    it("displays title and year", () => {
      expect(wrapper?.html()).toContain("<i>Abstract 36742</i>, 2018")
    })

    it("displays medium", () => {
      expect(wrapper?.html()).toContain("Premium high gloss archival print")
    })

    it("does not render edition dimensions or details", () => {
      expect(wrapper?.find(ArtworkSidebarSizeInfo).length).toBe(0)

      const html = wrapper?.html()
      expect(html).not.toContain("40 × 42 in")
      expect(html).not.toContain("101.6 × 106.7 cm")
      expect(html).not.toContain("Edition of 3000")
    })

    it("displays classification", () => {
      expect(wrapper?.text()).toContain("This is part of a limited edition set")
    })
  })

  describe("for artwork with minimal metadata", () => {
    it("only displays title info", async () => {
      wrapper = await getWrapper(EmptyMetadataNoEditions)

      const html = wrapper?.html()
      expect(html).toContain("<i>Empty metadata / No editions</i>")
      expect(html).not.toContain("<i>Empty metadata / No editions<i>,")

      expect(wrapper?.find(ArtworkSidebarSizeInfo).html()).toBe(null)

      expect(wrapper?.find(ArtworkSidebarClassification).html()).toBe(null)
    })
  })

  describe("for artwork with no size info", () => {
    it("does not render any size info", async () => {
      wrapper = await getWrapper(FilledOutMetadataNoSizeInfo)
      expect(wrapper?.find(ArtworkSidebarSizeInfo).html()).toBe(null)
    })
  })

  describe("for artwork in an auction", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(MetadataForAuctionWork)
    })

    it("displays lot number when present for biddable works", () => {
      expect(wrapper?.html()).toContain("Lot 210")
    })

    it("does not display lot number when present if work is not biddable(auction closed)", async () => {
      const closedAuctionArtwork = {
        ...MetadataForAuctionWork,
        is_biddable: false,
      }

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper = await getWrapper(closedAuctionArtwork)
      expect(wrapper?.html()).not.toContain("Lot 210")
    })

    it("displays title and year", () => {
      expect(wrapper?.html()).toContain(
        '<i>Then the boy displayed to the Dervish his bosom, saying: "Look at my breasts which be goodlier than the breasts of maidens and my lipdews are sweeter than sugar candy...", from Four Tales from the Arabian Nights</i>, 1948'
      )
    })

    it("displays medium", () => {
      expect(wrapper?.html()).toContain("Lithograph in colors, on laid paper")
    })

    it("displays edition dimensions", () => {
      const html = wrapper?.html()

      expect(html).toContain("17 × 13 in")
      expect(html).toContain("43.2 × 33 cm")
    })

    it("displays classification", () => {
      expect(wrapper?.text()).toContain("This is part of a limited edition set")
    })
  })
})
