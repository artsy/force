import { screen } from "@testing-library/react"
import { ArtworkDetailsFragmentContainer } from "Apps/Artwork/Components/ArtworkDetails"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtworkDetailsTestQuery } from "__generated__/ArtworkDetailsTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")
;(useTracking as jest.Mock).mockImplementation(() => {
  return {}
})

jest.mock("Components/EntityHeaders/EntityHeaderPartner", () => ({
  EntityHeaderPartnerFragmentContainer: () =>
    "EntityHeaderPartnerFragmentContainer",
}))

jest.mock("Utils/Hooks/useClientQuery", () => ({
  useClientQuery: () => ({
    data: null,
    loading: true,
    error: null,
    refetch: jest.fn(),
  }),
}))

const { renderWithRelay } = setupTestWrapperTL<ArtworkDetailsTestQuery>({
  Component: ({ artwork }) => {
    return <ArtworkDetailsFragmentContainer artwork={artwork!} />
  },
  query: graphql`
    query ArtworkDetailsTestQuery @relay_test_operation {
      artwork(id: "example") {
        ...ArtworkDetails_artwork
      }
    }
  `,
})

describe("ArtworkDetails", () => {
  describe("ArtworkDetailsAdditionalInfo for a live sale artwork", () => {
    it("displays a request lot condition report button when canRequestLotConditionsReport is true", () => {
      renderWithRelay({
        Artwork: () => ({
          canRequestLotConditionsReport: true,
          conditionDescription: {
            label: "Condition details",
            details: "Slight discoloration from sun exposure",
          },
        }),
      })

      expect(screen.getByText("Condition")).toBeInTheDocument()
      expect(
        screen.queryByText("Slight discoloration from sun exposure"),
      ).not.toBeInTheDocument()
    })

    it("display condition description when canRequestLotConditionsReport is false but has condition description", () => {
      renderWithRelay({
        Artwork: () => ({
          canRequestLotConditionsReport: false,
          conditionDescription: {
            label: "Condition details",
            details: "Slight discoloration from sun exposure",
          },
        }),
      })

      expect(screen.getByText("Condition")).toBeInTheDocument()
      expect(
        screen.getByText("Slight discoloration from sun exposure"),
      ).toBeInTheDocument()
    })

    it("does not display the condition section at all when canRequestLotConditionsReport is false and condition Description is missing", () => {
      renderWithRelay({
        Artwork: () => ({
          canRequestLotConditionsReport: false,
          conditionDescription: null,
        }),
      })

      expect(screen.queryByText("Condition")).not.toBeInTheDocument()
    })
  })

  describe("ArtworkDetails for a gallery artwork that is missing some fields", () => {
    it("renders additional info with just what is present", () => {
      const { container } = renderWithRelay({
        Artwork: () => ({
          series: null,
          publisher: null,
          manufacturer: null,
          image_rights: null,
          framed: null,
        }),
      })

      expect(screen.getByText("Medium")).toBeInTheDocument()
      expect(screen.getByText("Signature")).toBeInTheDocument()
      expect(screen.getByText("Condition")).toBeInTheDocument()
      expect(
        screen.getByText("Certificate of authenticity"),
      ).toBeInTheDocument()
      expect(screen.getByText("Rarity")).toBeInTheDocument()
      expect(screen.getByText("Size")).toBeInTheDocument()
      expect(container.querySelectorAll("dl")).toHaveLength(7)
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

    const { container } = renderWithRelay(emptyData)

    expect(container.querySelectorAll("dl")).toHaveLength(0)
  })

  describe("ArtworkDetails for gallery artwork with complete details", () => {
    it("renders a correct component tree", () => {
      renderWithRelay()

      expect(screen.getByText("About the work")).toBeInTheDocument()
      // Articles tab is loaded client-side and won't appear in this test
      // since useClientQuery is mocked to return no data
      expect(screen.getByText("Exhibition history")).toBeInTheDocument()
      expect(screen.getByText("Bibliography")).toBeInTheDocument()
      expect(screen.getByText("Provenance")).toBeInTheDocument()
    })
  })

  describe("ArtworkDetailsAboutTheWorkFromPartner", () => {
    it("displays partner additionalInformation for artwork", () => {
      renderWithRelay({
        Artwork: () => ({
          additionalInformationHTML:
            "Here is some additional info for this work",
        }),
      })

      expect(
        screen.getByText("Here is some additional info for this work"),
      ).toBeInTheDocument()
    })

    it("does not display avatar when profile is not available and no initials for partner", () => {
      const { container } = renderWithRelay({
        Partner: () => ({ profile: null, initials: null }),
      })

      expect(container.querySelectorAll("img")).toHaveLength(0)
    })

    it("does not render partner follow button if artwork is from an auction partner", () => {
      renderWithRelay({
        Partner: () => ({
          type: "Auction House",
        }),
      })

      expect(screen.queryByText("Following")).not.toBeInTheDocument()
    })

    it("works without a partner", () => {
      const result = renderWithRelay({
        Artwork: () => ({
          partner: null,
        }),
      })

      expect(result).toBeTruthy()
    })
  })
})
